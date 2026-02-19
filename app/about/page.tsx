import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "세윤에 대해 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* 좌측 프로필 카드(사진) */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-card">
          <div className="flex h-full w-full items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110">
            🧑‍💻
          </div>
        </div>
        {/* 우측 프로필 카드(이름/파트/링크) */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h1 className="text-2xl font-bold">임세윤</h1>
          <p className="text-muted">Frontend Developer</p>
          <div className="flex gap-3">
            <Link
              href="https://github.com/seyun31"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              href="mailto:jennalim2003@gmail.com"
              className="text-muted transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Link>
            <Link
              href="https://seyunlim.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
              aria-label="Portfolio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                <path d="M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* 인사말 섹션 */}
      <div className="prose">
        <h2>안녕하세요!</h2>
        <p>
          저는 클린 코드를 지향하며, 새로운 기술을 누구보다 빠르게 접하고 사용해보는 것을 좋아합니다.
          <br /> 복잡한 문제를 단순화하고, 기술 부채를 최소화하는 설계 과정에서 큰 보람을 느낍니다.
          <br /> 최근에는 AI 기반의 개발 워크플로우를 실험하며, 단순 반복적인 작업을 자동화하고 더 창의적인 문제 해결에 집중할 수 있는 환경을 만드는 데 몰입하고 있습니다.
        </p>
        <p>
          방문해 주셔서 감사합니다. 오늘도 즐겁고 행복한 하루 보내세요! 🍀
        </p>
      </div>
    </div >
  );
}
