import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// 제목 앞의 이모지는 목차에서 빼고 보여줌
const LEADING_EMOJI = /^(\p{Extended_Pictographic}|️|‍)+\s*/u;

// 인라인 마크다운을 걷어내 렌더링된 제목의 텍스트와 맞춤
function toPlainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

// MDX 원문에서 h2/h3를 뽑음. id는 rehype-slug와 같은 github-slugger로 만들어 본문 제목 id와 일치시킴
export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of source.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;

    // h1, h4~h6도 slugger에 넣어야 중복 제목의 id 번호가 rehype-slug와 어긋나지 않음
    const text = toPlainText(match[2]);
    const id = slugger.slug(text);
    const depth = match[1].length;
    if (depth === 2 || depth === 3) {
      items.push({ id, text: text.replace(LEADING_EMOJI, ""), level: depth });
    }
  }

  return items;
}
