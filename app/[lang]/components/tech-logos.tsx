import {
  siDotnet,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siReacthookform,
  siRedux,
  siShadcnui,
  siStorybook,
  siTailwindcss,
  siTanstack,
  siTestinglibrary,
  siTypescript,
  siZod,
} from "simple-icons";

type BrandIcon = {
  title: string;
  path: string;
};

function Mark({ icon }: { icon: BrandIcon }) {
  return (
    <li>
      <span
        title={icon.title}
        aria-label={icon.title}
        className="inline-flex h-6 w-6 items-center justify-center text-slate-400/70"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d={icon.path} fill="currentColor" />
        </svg>
      </span>
    </li>
  );
}

function TextBadge({ label }: { label: string }) {
  return (
    <li>
      <span
        title={label}
        aria-label={label}
        className="inline-flex h-6 items-center px-1 font-mono text-[10px] leading-none tracking-wide text-slate-400/70"
      >
        {label}
      </span>
    </li>
  );
}

const frontend: BrandIcon[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siShadcnui,
  siRedux,
  siTanstack,
  siReacthookform,
  siZod,
  siStorybook,
  siTestinglibrary,
];

const backend: BrandIcon[] = [siNodedotjs, siDotnet, siPostgresql, siMongodb];

export default function TechLogos({
  frontendLabel,
  backendLabel,
}: {
  frontendLabel: string;
  backendLabel: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {frontendLabel}
        </p>
        <ul className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-2">
          {frontend.map((icon) => (
            <Mark key={icon.title} icon={icon} />
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {backendLabel}
        </p>
        <ul className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-2">
          {backend.map((icon) => (
            <Mark key={icon.title} icon={icon} />
          ))}
          <TextBadge label="C#" />
          <TextBadge label="SQL Server" />
        </ul>
      </div>
    </div>
  );
}
