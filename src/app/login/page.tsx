'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import Toast from '@/components/common/Toast';
import { useAuth } from '@/utils/hooks';
import storage from '@/utils/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const router = useRouter();
  const { signInWithGoogle, signIn } = useAuth();

  // 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = storage.get<string>('savedEmail');
    if (savedEmail && emailRef.current) {
      emailRef.current.value = savedEmail;
      setRememberEmail(true);
    }
  }, []);

  // 이메일 형식 검증
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 길이 검증
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

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
  };

  // 로그인
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    // 입력값 검증
    if (!email || !password) {
      setToast({ message: '이메일과 비밀번호를 입력해주세요.', type: 'error' });
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

    setIsLoading(true);
    const { success, error } = await signIn(email, password);
    setIsLoading(false);

    if (success) {
      // 이메일 저장
      if (rememberEmail) {
        storage.set('savedEmail', email);
      } else {
        storage.remove('savedEmail');
      }
      setToast({ message: '로그인에 성공했습니다.', type: 'success' });
      setTimeout(() => router.push('/'), 1000);
    } else {
      setToast({ message: `로그인 실패: ${error}`, type: 'error' });
    }
  };

  // Google 로그인
  const handleGoogleSignIn = async () => {
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
      setToast({
        message: `Google 로그인 실패: ${errorMessage}`,
        type: 'error',
      });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="bg-bg-login h-full min-h-full">
        <div className="container py-6 md:py-12">
          <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="hidden w-full md:block md:w-1/2">
            <Image
              src="/images/about/img_temp.png"
              width={500}
              height={600}
              alt="login"
              className="size-full object-cover"
            />
          </div>
          <div className="w-full rounded-xl border border-gray-300 bg-white px-4 py-8 md:w-1/2 md:px-6 md:py-10">
            <h1 className="text-xl font-semibold md:text-2xl">로그인</h1>
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
                <Checkbox
                  id="remember"
                  checked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                  disabled={isLoading}
                >
                  이메일 저장
                </Checkbox>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>
            {/* 간편로그인 */}
            <div>
              <Button
                type="button"
                color="linePrimary"
                className="mb-4 flex w-full items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <FcGoogle />
                Sign in with Google
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
              <span className="text-sm sm:text-base">
                아직 회원이 아니신가요?
              </span>
              <Link href="/register" className="link-text text-sm sm:text-base">
                회원가입
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
