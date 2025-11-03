import HeroSection from '@/components/home/HeroSection';
import RecentProjectsSection from '@/components/home/RecentProjectsSection';
import SkillsSection from '@/components/home/SkillsSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="container py-24">
        <SkillsSection />
        <RecentProjectsSection />
        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Let&apos;s Work Together</h2>
          <p className="mb-6 text-gray-600">
            I&apos;m open to new opportunities!
            <br /> 귀사의 연락을 기다립니다.
          </p>
          <Link
            href="/contact"
            className="btn-primary btn-medium inline-flex items-center"
          >
            Contact Me
          </Link>
        </section>
      </div>
    </>
  );
}
