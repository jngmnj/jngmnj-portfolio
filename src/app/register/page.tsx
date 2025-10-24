'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { useAuth } from '@/utils/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  // const idRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordCheckRef = React.useRef<HTMLInputElement>(null);

  const { signInWithGoogle, signUp } = useAuth();
  const router = useRouter();

  // 회원가입
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
    const { success, error } = await signUp(email, password);
    if (success) {
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    } else {
      alert(`회원가입 실패: ${error}`);
    }
  };

  return (
    <div className="bg-bg-login h-full min-h-full">
      <div className="container py-6 md:py-12">
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="hidden w-full md:block md:w-1/2">
            <Image
              src="/images/about/img_temp.png"
              width={500}
              height={600}
              alt="Register"
              className="size-full object-cover"
            />
          </div>
          <div className="w-full rounded-xl border border-gray-300 bg-white px-4 py-8 md:w-1/2 md:px-6 md:py-10">
            <h1 className="text-xl font-semibold md:text-2xl">회원가입</h1>
            <form
              className="mt-6 mb-4 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <Input type="email" ref={emailRef} placeholder="이메일" />
              {/* <Input type="text" ref={idRef} placeholder="아이디" /> */}
              <Input type="password" ref={passwordRef} placeholder="비밀번호" />
              <Input
                type="password"
                ref={passwordCheckRef}
                placeholder="비밀번호확인"
              />
              <div className="">
                <Checkbox id="remember">
                  <p className="text-sm sm:text-base">
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
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
              <span className="text-sm sm:text-base">이미 회원이신가요?</span>
              <Link href="/login" className="link-text text-sm sm:text-base">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
