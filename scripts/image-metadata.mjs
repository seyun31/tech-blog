import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..", "public");
const FIX = process.argv.includes("--fix");
const FORBIDDEN_EXT = new Set([".heic", ".heif", ".dng", ".tif", ".tiff"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])),
  );
  return files.flat();
}
function scanJpeg(buf) {
  const found = [];
  const keep = [buf.subarray(0, 2)];
  let i = 2;
  while (i + 4 <= buf.length && buf[i] === 0xff) {
    const marker = buf[i + 1];
    if (marker === 0xda) break;
    const len = buf.readUInt16BE(i + 2);
    const seg = buf.subarray(i, i + 2 + len);
    if (marker === 0xe1) {
      const head = seg.subarray(4, 40).toString("latin1");
      found.push(head.startsWith("Exif") ? "EXIF" : head.includes("xap") ? "XMP" : "APP1");
    } else if (marker === 0xed) found.push("IPTC");
    else if (marker === 0xfe) found.push("COMMENT");
    else keep.push(seg);
    i += 2 + len;
  }
  keep.push(buf.subarray(i));
  return { found, fixed: Buffer.concat(keep) };
}

function scanPng(buf) {
  const DROP = new Set(["eXIf", "tEXt", "iTXt", "zTXt", "tIME"]);
  const found = [];
  const keep = [buf.subarray(0, 8)];
  let i = 8;
  while (i + 8 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.subarray(i + 4, i + 8).toString("latin1");
    const chunk = buf.subarray(i, i + 12 + len);
    if (DROP.has(type)) found.push(type);
    else keep.push(chunk);
    i += 12 + len;
    if (type === "IEND") break;
  }
  return { found, fixed: Buffer.concat(keep) };
}

function scanWebp(buf) {
  const found = [];
  let i = 12;
  while (i + 8 <= buf.length) {
    const type = buf.subarray(i, i + 4).toString("latin1");
    const len = buf.readUInt32LE(i + 4);
    if (type === "EXIF" || type === "XMP ") found.push(type.trim());
    i += 8 + len + (len % 2);
  }
  return { found, fixed: null };
}

const SCANNERS = { ".jpg": scanJpeg, ".jpeg": scanJpeg, ".png": scanPng, ".webp": scanWebp };

const problems = [];
for (const file of await walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  const name = relative(process.cwd(), file);
  if (FORBIDDEN_EXT.has(ext)) {
    problems.push(`${name}: ${ext} 원본 파일은 public/에 둘 수 없다. JPEG/WebP로 변환해서 넣는다`);
    continue;
  }
  const scan = SCANNERS[ext];
  if (!scan) continue;
  const { found, fixed } = scan(await readFile(file));
  if (found.length === 0) continue;
  if (FIX && fixed) {
    await writeFile(file, fixed);
    console.log(`제거함 ${name}: ${found.join(", ")}`);
  } else {
    problems.push(`${name}: ${found.join(", ")}`);
  }
}

if (problems.length > 0) {
  console.error("이미지 메타데이터가 남아 있다 (`pnpm images:strip`으로 제거):");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("이미지 메타데이터 검사 통과");
