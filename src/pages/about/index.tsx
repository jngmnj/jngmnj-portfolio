import Image from 'next/image';
import Link from 'next/link';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';

const index = () => {
  return (
    <div className="container">
      <section>
        <div className="flex gap-6">
          <div className="w-3/5">
            <p>Frontend Developer</p>
            <h1 className="text-8xl font-medium">안녕하세요,</h1>
            <h1>지정민입니다. </h1>
            <p>
              저는 디자인과 마크업에서 3년 이상의 경험을 가진 프론트엔드
              개발자입니다. <br />
              저는 UI/UX 디자인에 대한 전문 지식을 활용해 사용자 경험을
              최적화하는 웹사이트를 만듭니다. 디자인에 대한 열정을 넘어 마크업과
              프론트엔드 개발에까지 관심을 가지고 있으며, 이 분야에서 끊임없이
              배우고 성장하려고 노력합니다. 이러한 다양한 기술을 통해 다른
              개발자들과 효과적으로 협업할 수 있으며, 최상의 결과를 얻기 위해
              팀워크를 중요하게 생각합니다.
            </p>
            <div className="flex items-center justify-start">
              <button type="button" className="btn">
                이력서 다운로드
              </button>
              <div className="flex items-center">
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
                <Link href="https://instagram.com/jngmnj" target="_blank">
                  <div className="p-4">
                    <IoLogoInstagram className="size-[24px] text-white" />
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
      </section>
    </div>
  );
};

export default index;
