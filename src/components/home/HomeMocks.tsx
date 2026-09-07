import { LuCheck, LuFigma, LuMonitorSmartphone } from 'react-icons/lu';

/*
 * 홈의 "What I Do" 블록에서 쓰는 화면 목업 모음.
 *
 * 캡처 이미지 대신 마크업으로 그린다. 문구를 바꿔도 다시 캡처할 필요가 없고,
 * 확대·기울임을 줘도 텍스트가 흐려지지 않는다.
 */

// 목업 공통 창 프레임. 그림자는 레이아웃을 띄우는 정도로만 약하게 준다.
function WindowFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_40px_-28px_rgba(17,23,41,0.35)]">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] text-gray-400">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

/** 프론트엔드 블록 — 컴포넌트 코드와 그 결과 화면을 나란히 보여준다. */
export function CodeMock() {
  const lines = [
    {
      indent: 0,
      tokens: [
        ['export default function ', 'text-gray-400'],
        ['ProjectCard', 'text-seagull-600'],
      ],
    },
    { indent: 1, tokens: [['({ title, tags }: Props) {', 'text-gray-400']] },
    { indent: 1, tokens: [['return (', 'text-gray-400']] },
    {
      indent: 2,
      tokens: [
        ['<article ', 'text-gray-500'],
        ['className', 'text-seagull-700'],
        ['="card">', 'text-gray-500'],
      ],
    },
    { indent: 3, tokens: [['<h3>{title}</h3>', 'text-gray-500']] },
    { indent: 3, tokens: [['{tags.map(...)}', 'text-gray-400']] },
    { indent: 2, tokens: [['</article>', 'text-gray-500']] },
    { indent: 1, tokens: [[');', 'text-gray-400']] },
    { indent: 0, tokens: [['}', 'text-gray-400']] },
  ];

  return (
    <WindowFrame label="ProjectCard.tsx">
      <div className="grid sm:grid-cols-[1.05fr_0.95fr]">
        {/* 코드 */}
        <div className="border-b border-gray-100 p-5 sm:border-r sm:border-b-0">
          <div className="flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed">
            {lines.map((line, index) => (
              <p key={index} style={{ paddingLeft: `${line.indent * 12}px` }}>
                <span className="mr-3 inline-block w-3 text-right text-gray-300">
                  {index + 1}
                </span>
                {line.tokens.map(([text, className], tokenIndex) => (
                  <span key={tokenIndex} className={className}>
                    {text}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* 결과 화면 */}
        <div className="bg-gray-50 p-5">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
            <LuMonitorSmartphone aria-hidden="true" className="size-3.5" />
            Preview
          </p>
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="mb-3 h-16 rounded-lg bg-gray-100" />
            <p className="text-[13px] font-semibold text-gray-900">
              Portfolio Renewal
            </p>
            <p className="mt-1 text-[11px] text-gray-400">Web Development</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {['Next.js', 'TypeScript', 'Tailwind'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

/** UI/UX 블록 — 디자인 토큰과 컴포넌트 상태를 정리해 둔 패널. */
export function DesignMock() {
  const swatches = [
    { name: 'seagull-500', className: 'bg-seagull-500' },
    { name: 'seagull-700', className: 'bg-seagull-700' },
    { name: 'gray-950', className: 'bg-gray-950' },
    { name: 'gray-200', className: 'bg-gray-200' },
  ];

  return (
    <WindowFrame label="Design System">
      <div className="p-5">
        {/* 컬러 토큰 */}
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
          <LuFigma aria-hidden="true" className="size-3.5" />
          Color tokens
        </p>
        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {swatches.map((swatch) => (
            <div key={swatch.name}>
              <span
                className={`block h-9 rounded-lg ${swatch.className}`}
                aria-hidden="true"
              />
              <p className="mt-1.5 truncate text-[10px] text-gray-400">
                {swatch.name}
              </p>
            </div>
          ))}
        </div>

        {/* 버튼 상태 */}
        <p className="mt-5 text-[11px] font-semibold text-gray-400">
          Button states
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="bg-seagull-500 rounded-xl px-3.5 py-2 text-[11px] font-semibold text-white">
            Default
          </span>
          <span className="bg-seagull-600 rounded-xl px-3.5 py-2 text-[11px] font-semibold text-white">
            Hover
          </span>
          <span className="ring-seagull-200 bg-seagull-500 rounded-xl px-3.5 py-2 text-[11px] font-semibold text-white ring-2 ring-offset-2">
            Focus
          </span>
          <span className="rounded-xl bg-gray-100 px-3.5 py-2 text-[11px] font-semibold text-gray-400">
            Disabled
          </span>
        </div>

        {/* 간격 규칙 */}
        <p className="mt-5 text-[11px] font-semibold text-gray-400">Spacing</p>
        <div className="mt-2.5 flex items-end gap-2">
          {[8, 12, 16, 24, 32].map((size) => (
            <div key={size} className="flex flex-1 flex-col items-center gap-1">
              <span
                className="bg-seagull-100 w-full rounded"
                style={{ height: `${size}px` }}
                aria-hidden="true"
              />
              <span className="text-[10px] text-gray-400">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

/** 기획–배포 블록 — 한 사이클이 어디까지 진행됐는지 보여주는 파이프라인. */
export function PipelineMock({ steps }: { steps: string[] }) {
  return (
    <WindowFrame label="Delivery">
      <div className="p-5">
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => {
            const isDone = index < steps.length - 1;
            return (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                  isDone
                    ? 'border-gray-100 bg-gray-50'
                    : 'border-seagull-200 bg-seagull-50'
                }`}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-seagull-500 text-white'
                  }`}
                >
                  {isDone ? (
                    <LuCheck aria-hidden="true" className="size-3.5" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={`text-[13px] font-semibold ${
                    isDone ? 'text-gray-500' : 'text-seagull-800'
                  }`}
                >
                  {step}
                </span>
                <span className="ml-auto text-[10px] text-gray-400">
                  {isDone ? 'done' : 'in progress'}
                </span>
              </div>
            );
          })}
        </div>

        {/* 전체 진행 바 */}
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div className="bg-seagull-500 h-full w-3/4 rounded-full" />
        </div>
      </div>
    </WindowFrame>
  );
}
