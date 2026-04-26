import type { ReactNode } from "react";

const STROKE = "currentColor";

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
      {/* harness around model output */}
      <rect x="42" y="40" width="58" height="70" rx="6" />
      <rect x="140" y="40" width="58" height="70" rx="6" />
      <path d="M 56 62 L 86 62" />
      <path d="M 56 78 L 78 78" />
      <path d="M 154 60 L 183 88" />
      <path d="M 183 60 L 154 88" />
      <path d="M 103 75 C 114 68 126 68 137 75" />
      <path d="M 130 66 L 139 75 L 130 84" />
      <path d="M 58 122 C 88 104 120 126 148 106 C 164 95 178 94 196 102" />
      <circle cx="58" cy="122" r="3" fill={STROKE} />
      <circle cx="148" cy="106" r="3" fill={STROKE} />
      <circle cx="196" cy="102" r="3" fill={STROKE} />
    </Sketch>
  );
}

function AgentsIllustration() {
  return (
    <Sketch id="sk-ag" seed={7}>
      {/* delegated work lanes */}
      <rect x="36" y="45" width="44" height="36" rx="6" />
      <rect x="98" y="30" width="44" height="36" rx="6" />
      <rect x="98" y="84" width="44" height="36" rx="6" />
      <rect x="160" y="56" width="44" height="44" rx="6" />
      <path d="M 50 59 L 66 59" />
      <path d="M 50 70 L 62 70" />
      <path d="M 82 60 C 90 54 92 49 96 48" />
      <path d="M 91 43 L 98 48 L 92 55" />
      <path d="M 82 70 C 90 78 92 96 96 102" />
      <path d="M 89 104 L 98 103 L 94 94" />
      <path d="M 144 49 C 151 52 154 57 158 64" />
      <path d="M 151 64 L 160 65 L 155 57" />
      <path d="M 144 102 C 151 98 155 93 158 88" />
      <path d="M 153 96 L 160 87 L 149 88" />
      <path d="M 173 75 L 181 83 L 193 69" />
    </Sketch>
  );
}

function CareerIllustration() {
  return (
    <Sketch id="sk-ca" seed={11}>
      {/* career path with decision fork */}
      <path d="M 42 118 C 66 106 76 90 92 77 C 108 64 122 60 142 58" />
      <path d="M 142 58 C 164 56 182 46 200 30" />
      <path d="M 188 28 L 202 29 L 198 43" />
      <path d="M 142 58 C 166 70 178 86 194 112" strokeDasharray="7 7" />
      <path d="M 78 95 L 94 95" />
      <path d="M 86 87 L 86 103" />
      <circle cx="42" cy="118" r="3" fill={STROKE} />
      <circle cx="142" cy="58" r="4" fill={STROKE} />
      <circle cx="200" cy="30" r="3" fill={STROKE} />
    </Sketch>
  );
}

function DesignSystemsIllustration() {
  return (
    <Sketch id="sk-ds" seed={17}>
      {/* component inventory */}
      <rect x="43" y="36" width="154" height="82" rx="6" />
      <path d="M 43 58 L 197 58" />
      <path d="M 76 36 L 76 118" />
      <rect x="92" y="72" width="38" height="24" rx="4" />
      <rect x="145" y="72" width="28" height="24" rx="4" />
      <circle cx="59" cy="47" r="3" fill={STROKE} />
      <path d="M 55 75 L 65 75" />
      <path d="M 55 88 L 65 88" />
      <path d="M 55 101 L 65 101" />
      <path d="M 92 107 L 174 107" />
    </Sketch>
  );
}

function CognitionIllustration() {
  return (
    <Sketch id="sk-co" seed={19}>
      {/* observation versus intervention */}
      <circle cx="66" cy="58" r="14" />
      <circle cx="66" cy="98" r="14" />
      <path d="M 82 58 C 100 56 114 57 132 64" strokeDasharray="7 6" />
      <path d="M 82 98 C 101 102 115 101 132 92" strokeDasharray="7 6" />
      <path d="M 131 64 L 154 50 L 176 62" />
      <path d="M 131 92 L 154 106 L 176 94" />
      <path d="M 154 50 L 154 106" />
      <path d="M 151 51 L 158 51" />
      <path d="M 150 106 L 159 106" />
      <path d="M 176 62 C 186 68 192 72 200 78" />
      <path d="M 192 69 L 201 79 L 188 82" />
      <circle cx="66" cy="58" r="3" fill={STROKE} />
      <circle cx="66" cy="98" r="3" fill={STROKE} />
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
    case "causality":
    case "cognition":
      return <CognitionIllustration />;
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
