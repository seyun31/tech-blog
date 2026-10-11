const line = { stroke: "var(--muted)", strokeWidth: 1.5, fill: "none" };
const box = { fill: "var(--card)", stroke: "var(--border)", strokeWidth: 1.5 };
const decision = { fill: "var(--background)", stroke: "var(--accent)", strokeWidth: 1.5 };
const result = { fill: "var(--accent)", fillOpacity: 0.12, stroke: "var(--accent)", strokeWidth: 1.5 };
const text = { fill: "var(--foreground)", fontSize: 14, textAnchor: "middle" as const, dominantBaseline: "central" as const };
const label = { fill: "var(--muted)", fontSize: 12, textAnchor: "middle" as const, dominantBaseline: "central" as const };
const mono = { fontFamily: "var(--font-mono), monospace" };

export default function CommitHelperFlow() {
  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <svg
        viewBox="0 0 820 440"
        width="100%"
        role="img"
        aria-label="git diff --cached를 읽은 뒤 GROQ_API_KEY가 있으면 Groq를 직접 호출하고, 없으면 공용 서버를 거쳐 Groq를 호출한다. 공용 서버를 끄면 바로 규칙 기반 추천으로 간다. AI 응답이 성공하면 추천 목록을 보여 주고, 요청 오류·한도 초과·빈 응답·JSON 파싱 실패면 규칙 기반 추천으로 넘어간다."
        style={{ fontFamily: "inherit" }}
      >
        <defs>
          <marker id="chf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--muted)" }} />
          </marker>
        </defs>

        {/* 왼쪽 열: 판단 */}
        <rect x="40" y="20" width="220" height="44" rx="8" style={box} />
        <text x="150" y="42" style={{ ...text, ...mono }}>git diff --cached</text>

        <rect x="40" y="100" width="220" height="44" rx="8" style={decision} />
        <text x="150" y="122" style={text}><tspan style={mono}>GROQ_API_KEY</tspan> 있음?</text>

        <rect x="40" y="190" width="220" height="44" rx="8" style={decision} />
        <text x="150" y="212" style={text}>공용 서버 사용?</text>

        <rect x="40" y="320" width="220" height="44" rx="8" style={box} />
        <text x="150" y="342" style={text}>규칙 기반 추천</text>

        <path d="M150 64 V98" style={line} markerEnd="url(#chf-arrow)" />
        <path d="M150 144 V188" style={line} markerEnd="url(#chf-arrow)" />
        <text x="178" y="166" style={label}>아니오</text>
        <path d="M150 234 V318" style={line} markerEnd="url(#chf-arrow)" />
        <text x="196" y="276" style={label}>아니오 (off)</text>

        {/* 가운데 열: AI 호출 */}
        <rect x="330" y="100" width="180" height="44" rx="8" style={box} />
        <text x="420" y="122" style={text}>Groq 직접 호출</text>

        <rect x="330" y="190" width="180" height="44" rx="8" style={box} />
        <text x="420" y="212" style={text}>공용 서버 → Groq</text>

        <path d="M260 122 H328" style={line} markerEnd="url(#chf-arrow)" />
        <text x="294" y="110" style={label}>예</text>
        <path d="M260 212 H328" style={line} markerEnd="url(#chf-arrow)" />
        <text x="294" y="200" style={label}>예</text>

        <path d="M510 122 H560 V268" style={line} markerEnd="url(#chf-arrow)" />
        <path d="M510 212 H560" style={line} />

        {/* 응답 판단 */}
        <rect x="480" y="270" width="160" height="44" rx="8" style={decision} />
        <text x="560" y="292" style={text}>AI 응답 성공?</text>

        <path d="M640 292 H668" style={line} markerEnd="url(#chf-arrow)" />
        <text x="654" y="280" style={label}>예</text>

        <path d="M560 314 V342 H262" style={line} markerEnd="url(#chf-arrow)" />
        <text x="410" y="330" style={{ ...label, fill: "var(--foreground)" }}>실패</text>
        <text x="410" y="358" style={label}>요청 오류 · 한도 초과 · 빈 응답 · JSON 파싱 실패</text>

        {/* 결과 */}
        <rect x="670" y="270" width="120" height="44" rx="8" style={result} />
        <text x="730" y="292" style={{ ...text, fontWeight: 600 }}>추천 목록</text>

        <path d="M150 364 V410 H730 V316" style={line} markerEnd="url(#chf-arrow)" />
      </svg>
    </figure>
  );
}
