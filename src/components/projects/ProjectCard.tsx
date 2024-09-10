import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import ProjectSlider from './ProjectSlider';

const ProjectCard = () => {
  return (
    <div className="h-screen w-full border">
      <div className="flex flex-col-reverse justify-between gap-8 pt-40 lg:flex-row">
        <div className="p-4">
          <Link href="">
            <h2 className="mb-2 text-6xl font-bold">01</h2>
            <h1 className="mb-12 text-8xl font-bold">Project Title</h1>
            <p className="mb-8 text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              voluptatem animi assumenda consectetur necessitatibus aut iste
              unde itaque minima quibusdam nobis cumque quod, maiores soluta
              reprehenderit. Cum tenetur dolorum voluptas.
            </p>
          </Link>
          {/* stack */}
          <div className="flex gap-2">
            <div className="rounded-full border px-4 py-2 text-xl">React</div>
            <div className="rounded-full border px-4 py-2 text-xl">Next.js</div>
            <div className="rounded-full border px-4 py-2 text-xl">
              Tailwind CSS
            </div>
          </div>
          {/* links */}
          <div className="mt-6 flex gap-4 border-t border-t-gray-100 pt-6">
            <Link href="" className="rounded-full bg-gray-100 p-4">
              <GoArrowUpRight className="text-3xl" />
            </Link>
            <Link
              href=""
              className="rounded-full bg-gray-100 p-4"
              target="_blank"
            >
              <FaGithub className="text-3xl" />
            </Link>
          </div>
        </div>
        <div className="thumb h-full border">
          <ProjectSlider />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
