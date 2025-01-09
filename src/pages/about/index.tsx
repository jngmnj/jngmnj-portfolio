import TabContent1 from '@/components/about/TabContent1';
import TabContent2 from '@/components/about/TabContent2';
import TabContent3 from '@/components/about/TabContent3';
import TabContent4 from '@/components/about/TabContent4';
import TabMenu from '@/components/about/TabMenu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

const Index = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="container">
      {/* introduction */}
      {/* 추후 페이지단위 스크롤로 수정 */}
      <section className="mb-16 h-full">
        <div className="mb-16 flex gap-6">
          <div className="w-3/5">
            <div className="mb-6">
              <p className="mb-3 text-2xl">Frontend Developer</p>
              <h1 className="mb-3 text-7xl font-semibold">안녕하세요,</h1>
              <h1 className="mb-16 text-7xl font-semibold">지정민입니다. </h1>
              <p className="leading-7">
                저는 UI/UX 디자인 전문 지식을 활용하여 사용자 경험을 최적화하는
                웹사이트를 제작합니다. <br />
                디자인에 대한 저의 열정은 마크업과 프론트엔드 개발까지 이어져,
                <br />
                끊임없이 배우고 성장하려 노력합니다. <br />
                여러 분야에서 다양한 능력을 바탕으로 저는 다른 개발자들과
                효율적으로 협력하며,
                <br />
                최상의 결과를 달성하기 위해 팀워크를 중요시합니다.
              </p>
            </div>
            <div className="flex items-center justify-start gap-8">
              <button
                type="button"
                className="btn group flex items-center gap-2 rounded-xl border border-gray-600 px-6 py-3"
              >
                <MdFileDownload className="transition-transform group-hover:translate-y-1" />
                이력서 다운로드
              </button>
              <div className="flex items-center gap-4">
                <Link href="https://github.com/jngmnj" target="_blank">
                  <div className="p-4">
                    <IoLogoGithub className="size-[24px]" />
                  </div>
                </Link>
                <Link href="https://instagram.com/jngmnj" target="_blank">
                  <div className="p-4">
                    <IoLogoInstagram className="size-[24px]" />
                  </div>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EC%A7%80-705288245/"
                  target="_blank"
                >
                  <div className="p-4">
                    <FaLinkedinIn className="size-[24px]" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-2/5 overflow-hidden rounded-full border">
            <Image
              src="/images/about/img_temp.png"
              alt="Profile Photo"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl font-bold">6</div>
            <div className="text-lg">
              Years of <br />
              Experience
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl font-bold">26</div>
            <div className="text-lg">
              Projects
              <br />
              completed
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl font-bold">8</div>
            <div className="text-lg">
              Technologies
              <br />
              Mastered
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl font-bold">500</div>
            <div className="text-lg">
              Code <br />
              commits
            </div>
          </div>
        </div>
      </section>
      {/* portfolio link */}
      <section className="mb-16 h-full">
        <div className="-mx-2 flex flex-wrap">
          <Link href={`/projects`} className="group w-1/2 px-2 py-3">
            <div className="h-full rounded-lg border px-6 py-8">
              <div className="mb-3 text-4xl font-bold transition group-hover:text-seagull-600">
                01
              </div>
              <div className="mb-6 flex items-end gap-4 text-6xl font-bold transition group-hover:text-seagull-600 md:text-4xl">
                Web Development
                <div className="rounded-full border border-seagull-600 p-4 opacity-0 transition group-hover:opacity-100">
                  <GoArrowUpRight className="text-3xl text-seagull-600" />
                </div>
              </div>
              <div className="leading-6">
                프론트엔드에서 효율적인 코드 작성과 최적화를 통해 사용자
                친화적인 인터페이스와 성능을 구현합니다.
                {/* HTML, CSS, Javascript, React, Next.js, Tailwind CSS, Sass, Styled-components, Redux, Context API, RESTful API, GraphQL, Firebase, AWS, Netlify, Vercel 등을 사용할 수 있습니다. */}
                HTML, CSS, Javascript는 기본으로, typescript를 통해 정적 타입
                검사를 진행하며, React, Next.js등 여러 프레임워크와 라이브러리를
                능숙하게 사용합니다.
              </div>
            </div>
          </Link>
          <Link href={`/projects`} className="group w-1/2 px-2 py-3">
            <div className="h-full rounded-lg border px-6 py-8">
              <div className="mb-3 text-4xl font-bold transition group-hover:text-seagull-600">
                02
              </div>
              <div className="mb-6 flex items-end gap-4 text-6xl font-bold transition group-hover:text-seagull-600 md:text-4xl">
                UI/UX Design
                <div className="rounded-full border border-seagull-600 p-4 opacity-0 transition group-hover:opacity-100">
                  <GoArrowUpRight className="text-3xl text-seagull-600" />
                </div>
              </div>
              <div className="leading-6">
                사용자의 요구와 기대를 반영한 최상의 사용자 경험(UX)을
                설계합니다. Figma, Adobe XD 등 다양한 디자인 툴을 사용하여
                프로젝트의 시각적 디자인 및 인터랙션을 구현합니다.
              </div>
            </div>
          </Link>
          <Link href={`/projects`} className="group w-1/2 px-2 py-3">
            <div className="h-full rounded-lg border px-6 py-8">
              <div className="mb-3 text-4xl font-bold transition group-hover:text-seagull-600">
                03
              </div>
              <div className="mb-6 flex items-end gap-4 text-6xl font-bold transition group-hover:text-seagull-600 md:text-4xl">
                Database Management(SQL)
                <div className="rounded-full border border-seagull-600 p-4 opacity-0 transition group-hover:opacity-100">
                  <GoArrowUpRight className="text-3xl text-seagull-600" />
                </div>
              </div>
              <div className="leading-6">
                SQL을 활용하여 데이터 쿼리, 삽입, 업데이트, 삭제를 할 수
                있습니다. Firebase와 Firestore, MySQL, PostgreSQL 등의
                데이터베이스를 다룰 수 있습니다.
                {/* 또한 데이터베이스 보안과 백업 관리,
                다중 사용자 환경에서의 데이터 무결성 유지에 능숙합니다. */}
              </div>
            </div>
          </Link>
          <Link href={`/projects`} className="group w-1/2 px-2 py-3">
            <div className="h-full rounded-lg border px-6 py-8">
              <div className="mb-3 text-4xl font-bold transition group-hover:text-seagull-600">
                04
              </div>
              <div className="mb-6 flex items-end gap-4 text-6xl font-bold transition group-hover:text-seagull-600 md:text-4xl">
                Search Engine Optimization(SEO)
                <div className="rounded-full border border-seagull-600 p-4 opacity-0 transition group-hover:opacity-100">
                  <GoArrowUpRight className="text-3xl text-seagull-600" />
                </div>
              </div>
              <div className="leading-6">
                키워드 리서치, 메타 태그 최적화, 내부 링크 구조 개선 등을 통해
                사이트의 SEO 성능을 향상시킵니다. Google Analytics와 같은 도구를
                활용해 트래픽 분석 및 SEO 성과 측정을 수행할 수 있습니다.
                {/* 최신 SEO 동향과 알고리즘 업데이트를 지속적으로 학습하고 반영하여
                웹사이트의 검색 노출을 극대화합니다. */}
              </div>
            </div>
          </Link>
        </div>
      </section>
      {/* experience */}
      <section>
        <div className="flex max-h-[80vh] gap-8">
          <div className="w-1/3 shrink-0">
            <div className="mb-6 text-6xl font-bold leading-snug">
              저를
              <br />
              뽑아야 하는 이유
            </div>
            <div className="mb-16">👇🏻 다음을 클릭하여 확인하세요.👇🏻</div>
            <TabMenu setTabIndex={setTabIndex} />
          </div>
          {tabIndex === 0 && <TabContent1 />}
          {tabIndex === 1 && <TabContent2 />}
          {tabIndex === 2 && <TabContent3 />}
          {tabIndex === 3 && <TabContent4 />}
        </div>
      </section>
    </div>
  );
};

export default Index;
