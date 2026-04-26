import type { ReactNode } from "react";

const STROKE = "#F5F4F0";

function Sketch({
  id,
  seed,
  children,
}: {
  id: string;
  seed: number;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 240 150"
      xmlns="http://www.w3.org/2000/svg"
      className="mz-card-illustration"
      aria-hidden="true"
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022"
            numOctaves="2"
            seed={seed}
          />
          <feDisplacementMap in="SourceGraphic" scale="2.8" />
        </filter>
      </defs>
      <g
        filter={`url(#${id})`}
        fill="none"
        stroke={STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

function AiEngineeringIllustration() {
  return (
    <Sketch id="sk-ai" seed={3}>
      {/* axes */}
      <path d="M 38 40 L 38 118 L 208 118" />
      {/* line chart trending up */}
      <path d="M 50 105 L 90 82 L 130 94 L 170 55 L 200 70" />
      {/* data dots */}
      <circle cx="50" cy="105" r="3.5" fill={STROKE} />
      <circle cx="90" cy="82" r="3.5" fill={STROKE} />
      <circle cx="130" cy="94" r="3.5" fill={STROKE} />
      <circle cx="170" cy="55" r="3.5" fill={STROKE} />
      <circle cx="200" cy="70" r="3.5" fill={STROKE} />
    </Sketch>
  );
}

function AgentsIllustration() {
  return (
    <Sketch id="sk-ag" seed={7}>
      {/* agent pipeline */}
      <rect x="40" y="52" width="42" height="42" rx="6" />
      <rect x="99" y="52" width="42" height="42" rx="6" />
      <rect x="158" y="52" width="42" height="42" rx="6" />
      <path d="M 55 66 L 67 66" />
      <path d="M 55 80 L 72 80" />
      <path d="M 112 66 L 128 80 L 112 80" />
      <path d="M 170 66 L 188 66" />
      <path d="M 170 80 L 188 80" />
      <path d="M 84 73 L 96 73" />
      <path d="M 91 66 L 98 73 L 91 80" />
      <path d="M 143 73 L 155 73" />
      <path d="M 150 66 L 157 73 L 150 80" />
    </Sketch>
  );
}

function CareerIllustration() {
  return (
    <Sketch id="sk-ca" seed={11}>
      {/* stair path */}
      <path d="M 40 118 L 75 118 L 75 92 L 115 92 L 115 66 L 155 66 L 155 42 L 198 42" />
      {/* arrowhead */}
      <path d="M 186 32 L 200 42 L 188 54" />
      {/* flag dot */}
      <circle cx="205" cy="42" r="3" fill={STROKE} />
    </Sketch>
  );
}

function DesignSystemsIllustration() {
  return (
    <Sketch id="sk-ds" seed={17}>
      {/* three overlapping cards */}
      <rect x="55" y="32" width="80" height="58" rx="5" />
      <rect x="85" y="52" width="80" height="58" rx="5" />
      <rect x="115" y="72" width="80" height="58" rx="5" />
    </Sketch>
  );
}

function DefaultIllustration() {
  return (
    <Sketch id="sk-def" seed={21}>
      {/* simple paper with lines */}
      <rect x="85" y="28" width="70" height="94" rx="4" />
      <path d="M 98 52 L 142 52" />
      <path d="M 98 70 L 142 70" />
      <path d="M 98 88 L 132 88" />
    </Sketch>
  );
}

export default function HeroIllustration({ tag }: { tag?: string }) {
  switch (tag) {
    case "AI":
    case "ai-engineering":
    case "software-engineering":
      return <AiEngineeringIllustration />;
    case "agents":
      return <AgentsIllustration />;
    case "career":
      return <CareerIllustration />;
    case "design-systems":
      return <DesignSystemsIllustration />;
    default:
      return <DefaultIllustration />;
  }
}
