import { createPageMetadata } from '@/app/lib/og-metadata';
import { getProjectOgData } from '@/app/lib/project-og';

type PostProps = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: PostProps) {
  const { lang, id } = await params;
  const project = await getProjectOgData(id, lang);
  return createPageMetadata({
    lang,
    page: 'project',
    path: `/projects/${id}`,
    title: project?.title,
    description: project?.description,
    imageParams: { projectId: id },
  });
}

export default function ProjectDetailPage() {
  return (
    <div className="content container">
      <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4 lg:grid-rows-1">
        <div className="col-span-3 border lg:col-span-2"></div>
        <div className="col-span-3 border lg:col-span-1">dd</div>
      </div>
    </div>
  );
}
