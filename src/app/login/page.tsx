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

export default function LoginPage() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { signInWithGoogle, signIn } = useAuth();

  // 로그인
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    const { success, error } = await signIn(email, password);
    if (success) {
      router.push('/');
    } else {
      alert(`로그인 실패: ${error}`);
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
              alt="login"
              className="size-full object-cover"
            />
          </div>
          <div className="w-1/2 rounded-xl border border-gray-300 bg-white px-6 py-10">
            <h1 className="text-2xl font-semibold">로그인</h1>
            <form
              className="mb-4 mt-6 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <Input type="email" ref={emailRef} placeholder="이메일" />
              <Input type="password" ref={passwordRef} placeholder="비밀번호" />
              <div className="flex justify-between">
                <Checkbox id="remember">이메일 저장</Checkbox>
                <button type="button" className="link-text">
                  비밀번호 찾기
                </button>
              </div>
              <Button type="submit">로그인</Button>
            </form>
            {/* 간편로그인 */}
            <div>
              <Button
                type="submit"
                color="linePrimary"
                className="mb-4 flex w-full items-center justify-center gap-2"
                onClick={signInWithGoogle}
              >
                <FcGoogle />
                Sign in with Google
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span>아직 회원이 아니신가요?</span>
              <Link href="/register" className="link-text">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
