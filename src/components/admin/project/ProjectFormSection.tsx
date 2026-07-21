import { ReactNode } from 'react';

interface ProjectFormSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  eyebrow?: string;
}

export default function ProjectFormSection({
  title,
  description,
  children,
  eyebrow,
}: ProjectFormSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="mb-5 border-b border-gray-100 pb-4 sm:mb-6">
        {eyebrow && (
          <p className="text-seagull-700 mb-1 text-xs font-semibold tracking-wide uppercase">
            {eyebrow}
          </p>
        )}
        <h3 className="text-lg font-bold text-gray-950 sm:text-xl">{title}</h3>
        <p className="mt-1 text-sm leading-6 break-keep text-gray-500">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
