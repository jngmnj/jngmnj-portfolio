import Button from '@/components/common/Button';
import Checkbox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { useAuth } from '@/utils/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Resigster = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  // const idRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordCheckRef = React.useRef<HTMLInputElement>(null);

  const { signInWithGoogle, signUp } = useAuth();
  const router = useRouter();
  // 로그인
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('회원가입할께');
    const response = await signUp(email, password);
    console.log(response);
    if (response.user !== null) {
      console.log('회원가입 성공');
      router.push('/');
    } else {
      console.log('왜안되징');
    }
  };
  return (
    <div className="bg-bg-login">
      <div className="container">
        <div className="flex w-full items-center gap-12">
          <div className="w-1/2">
            <Image
              src="/images/about/img_temp.png"
              width={500}
              height={600}
              alt="Resigster"
              className="size-full object-cover"
            />
          </div>
          <div className="w-1/2 rounded-xl border border-gray-300 bg-white px-6 py-10">
            <h1 className="text-2xl font-semibold">회원가입</h1>
            <form
              className="mb-4 mt-6 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <Input type="text" ref={emailRef} placeholder="이메일" />
              {/* <Input type="text" ref={idRef} placeholder="아이디" /> */}
              <Input type="password" ref={passwordRef} placeholder="비밀번호" />
              <Input
                type="password"
                ref={passwordCheckRef}
                placeholder="비밀번호확인"
              />
              <div className="">
                <Checkbox id="remember">
                  <p>
                    <Link
                      href={'/policy'}
                      target="_blank"
                      className="link-text"
                    >
                      이용약관
                    </Link>
                    <span> 및 </span>
                    <Link
                      href={'/policy'}
                      target="_blank"
                      className="link-text"
                    >
                      개인정보처리방침
                    </Link>
                    <span>에 동의합니다.</span>
                  </p>
                </Checkbox>
              </div>
              <Button type="submit">회원가입</Button>
            </form>
            {/* 간편 회원가입 */}
            <div>
              <Button
                type="submit"
                color="linePrimary"
                className="mb-4 flex w-full items-center justify-center gap-2"
                onClick={signInWithGoogle}
              >
                <FcGoogle />
                Sign up with Google
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span>이미 회원이신가요?</span>
              <Link href="/login" className="link-text">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resigster;
