'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import Toast from '@/components/common/Toast';
import { useAuth } from '@/utils/hooks';
import { useToast } from '@/utils/useToast';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '@/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordCheckRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const { toast, showToast, hideToast } = useToast();

  const { signInWithGoogle, signUp } = useAuth();
  const router = useRouter();

  // 실시간 이메일 검증
  const handleEmailChange = () => {
    const email = emailRef.current?.value || '';
    if (email && !validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  // 실시간 비밀번호 검증
  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || '';
    if (password && !validatePassword(password)) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
    // 비밀번호 확인과 일치하는지도 검증
    const passwordCheck = passwordCheckRef.current?.value || '';
    if (passwordCheck && !validatePasswordMatch(password, passwordCheck)) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  // 실시간 비밀번호 확인 검증
  const handlePasswordCheckChange = () => {
    const password = passwordRef.current?.value || '';
    const passwordCheck = passwordCheckRef.current?.value || '';
    if (passwordCheck && !validatePasswordMatch(password, passwordCheck)) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  // 회원가입
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const passwordCheck = passwordCheckRef.current?.value || '';

    // 입력값 검증
    if (!email || !password || !passwordCheck) {
      showToast('모든 필드를 입력해주세요.', 'error');
      return;
    }

    // 이메일 형식 검증
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      return;
    } else {
      setEmailError('');
    }

    // 비밀번호 길이 검증
    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    } else {
      setPasswordError('');
    }

    // 비밀번호 일치 검증
    if (!validatePasswordMatch(password, passwordCheck)) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPasswordCheckError('');
    }

    setIsLoading(true);
    const { success, error } = await signUp(email, password);
    setIsLoading(false);

    if (success) {
      showToast('회원가입이 완료되었습니다.', 'success');
      setTimeout(() => router.push('/'), 1000);
    } else {
      showToast(`회원가입 실패: ${error}`, 'error');
    }
  };

  // Google 회원가입
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다';
      showToast(`Google 회원가입 실패: ${errorMessage}`, 'error');
    }
  };

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
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
                <div>
                  <Input
                    type="email"
                    ref={emailRef}
                    placeholder="이메일"
                    disabled={isLoading}
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    ref={passwordRef}
                    placeholder="비밀번호"
                    disabled={isLoading}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    ref={passwordCheckRef}
                    placeholder="비밀번호확인"
                    disabled={isLoading}
                    onChange={handlePasswordCheckChange}
                  />
                  {passwordCheckError && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordCheckError}
                    </p>
                  )}
                </div>
                <div className="">
                  <Checkbox id="remember" disabled={isLoading}>
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '회원가입 중...' : '회원가입'}
                </Button>
              </form>
              {/* 간편 회원가입 */}
              <div>
                <Button
                  type="button"
                  color="linePrimary"
                  className="mb-4 flex w-full items-center justify-center gap-2"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
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
    </>
  );
}
