type PostProps = {
  params: Promise<{ lang: string; id: string }>;
};

export default async function ProjectDetailPage({ params }: PostProps) {
  const { id } = await params;

  return (
    <div className="content container">
      <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4 lg:grid-rows-1">
        <div className="col-span-3 border lg:col-span-2"></div>
        <div className="col-span-3 border lg:col-span-1">dd</div>
      </div>
    </div>
  );
}
