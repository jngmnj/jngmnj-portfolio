import { useRouter } from 'next/navigation';
import { RefObject, useState } from 'react';
import { useToast } from './useToast';
import { validateEmail, validatePassword } from './validation';

interface UseAuthFormProps {
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  onSuccess: () => void;
}

export const useAuthForm = ({
  emailRef,
  passwordRef,
  onSuccess,
}: UseAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { toast, showToast, hideToast } = useToast();
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
  };

  // 폼 검증
  const validateForm = (email: string, password: string): boolean => {
    if (!email || !password) {
      showToast('이메일과 비밀번호를 입력해주세요.', 'error');
      return false;
    }

    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      return false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    } else {
      setPasswordError('');
    }

    return true;
  };

  return {
    isLoading,
    setIsLoading,
    emailError,
    passwordError,
    toast,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
    showToast,
    hideToast,
    router,
  };
};
