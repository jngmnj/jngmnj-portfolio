import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = () => {
  return (
    <div className="w-1/3 px-2 py-4">
      <Link href="" className="block border">
        <div className="thumb h-[160px]">
          <Image
            src="/images/about/img_temp.png"
            alt="project"
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">Project Title</h3>
          <p className="mt-2 text-sm">Project Description</p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
