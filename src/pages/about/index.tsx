import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

const index = () => {
  return (
    <div className="container">
      {/* introduction */}
      <section className="mb-16 h-full">
        <div className="mb-8 flex gap-6">
          <div className="w-3/5">
            <div className="mb-6">
              <p className="mb-3 text-2xl">Frontend Developer</p>
              <h1 className="mb-3 text-7xl font-semibold">안녕하세요,</h1>
              <h1 className="mb-8 text-7xl font-semibold">지정민입니다. </h1>
              <p className="leading-7">
                저는 UI/UX 디자인 전문 지식을 활용하여 사용자 경험을 최적화하는
                웹사이트를 제작합니다. <br />
                디자인에 대한 저의 열정은 마크업과 프론트엔드 개발까지 이어지며,
                <br />
                여러 분야에서 끊임없이 배우고 성장하려 노력합니다. <br />
                이러한 다양한 능력을 바탕으로 저는 다른 개발자들과 효과적으로
                협력하며,
                <br />
                최상의 결과를 달성하기 위해 팀워크를 중요시합니다.
              </p>
            </div>
            <div className="flex items-center justify-start gap-8">
              <button
                type="button"
                className="btn group flex items-center gap-2 rounded-xl border border-gray-600 px-6 py-3"
              >
                <MdFileDownload className="transform transition-transform group-hover:translate-y-1" />
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
          <div className="w-1/2 px-2">
            <div className="rounded-lg border px-4 py-6">
              <div className="text-4xl">01</div>
              <div className="text-6xl">Web Development</div>
              <div className="text-md">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloremque ad debitis accusantium! Praesentium dicta quaerat
                tenetur, temporibus magni consequatur.
              </div>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <div className="border">
              <div className="text-4xl"></div>
              <div className="text-6xl">Web Development</div>
              <div className="text-md">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloremque ad debitis accusantium! Praesentium dicta quaerat
                tenetur, temporibus magni consequatur.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* experience */}
      <section>
        <div className="flex max-h-[80vh] gap-8">
          <div className="w-2/5 shrink-0">
            <div
              className="mb-6 text-6xl font-bold"
              style={{ lineHeight: 1.3 }}
            >
              저를
              <br />
              뽑아야 하는 이유
            </div>
            <div className="text-md mb-8">👇🏻 다음을 클릭하여 확인하세요.👇🏻</div>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                className="btn w-full gap-2 rounded-xl border border-gray-600 px-6 py-3 text-center"
              >
                💻 경력
              </button>
              <button
                type="button"
                className="btn w-full gap-2 rounded-xl border border-gray-600 px-6 py-3 text-center"
              >
                📚 교육
              </button>
              <button
                type="button"
                className="btn w-full gap-2 rounded-xl border border-gray-600 px-6 py-3 text-center"
              >
                🛠️ 기술
              </button>
              <button
                type="button"
                className="btn w-full gap-2 rounded-xl border border-gray-600 px-6 py-3 text-center"
              >
                🙋 자기소개
              </button>
            </div>
          </div>
          <div className="w-3/5 overflow-y-auto overflow-x-hidden">
            <div className="mb-6 text-4xl">My experience</div>
            <p className="mb-6 leading-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
              dolorum doloribus ipsa, optio exercitationem reiciendis voluptate
              distinctio unde minus reprehenderit odit, praesentium iusto
              voluptatibus esse amet id repudiandae a qui.
            </p>
            <div className="-mx-2 flex flex-wrap">
              <div className="w-1/2 p-2">
                <div className="rounded-2xl border px-4 py-6">
                  <div className="mb-2 text-2xl">2024 - 현재</div>
                  <div className="mb-4 text-3xl">UIUX Designer / Publisher</div>
                  <div className="text-md flex items-center gap-3">
                    <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
                    Core Soft Inc.
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="rounded-2xl border px-4 py-6">
                  <div className="mb-2 text-2xl">2024 - 현재</div>
                  <div className="mb-4 text-3xl">UIUX Designer / Publisher</div>
                  <div className="text-md flex items-center gap-3">
                    <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
                    Core Soft Inc.
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="rounded-2xl border px-4 py-6">
                  <div className="mb-2 text-2xl">2024 - 현재</div>
                  <div className="mb-4 text-3xl">UIUX Designer / Publisher</div>
                  <div className="text-md flex items-center gap-3">
                    <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
                    Core Soft Inc.
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="rounded-2xl border px-4 py-6">
                  <div className="mb-2 text-2xl">2024 - 현재</div>
                  <div className="mb-4 text-3xl">UIUX Designer / Publisher</div>
                  <div className="text-md flex items-center gap-3">
                    <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
                    Core Soft Inc.
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="rounded-2xl border px-4 py-6">
                  <div className="mb-2 text-2xl">2024 - 현재</div>
                  <div className="mb-4 text-3xl">UIUX Designer / Publisher</div>
                  <div className="text-md flex items-center gap-3">
                    <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
                    Core Soft Inc.
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="rounded-2xl border px-4 py-6">
                  <div className="mb-2 text-2xl">2024 - 현재</div>
                  <div className="mb-4 text-3xl">UIUX Designer / Publisher</div>
                  <div className="text-md flex items-center gap-3">
                    <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
                    Core Soft Inc.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
