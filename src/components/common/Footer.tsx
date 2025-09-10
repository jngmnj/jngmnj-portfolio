import Link from 'next/link';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black py-8">
      <div className="flex items-center justify-center">
        <Link href="https://github.com/jngmnj" target="_blank">
          <div className="p-4">
            <IoLogoGithub className="size-[24px] text-white" />
          </div>
        </Link>
        <Link href="https://instagram.com/jngmnj" target="_blank">
          <div className="p-4">
            <IoLogoInstagram className="size-[24px] text-white" />
          </div>
        </Link>
      </div>
      <div className="">
        <p className="text-center text-white">
          &copy; Copyright {currentYear} jngmnj
        </p>
      </div>
    </footer>
  );
};

export default Footer;
