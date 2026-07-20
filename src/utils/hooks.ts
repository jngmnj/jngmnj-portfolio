// import { deletePost, updatePost } from '@/pages/api/posts';
import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

// Firebase 에러 코드를 한국어 메시지로 변환
const getErrorMessage = (error: unknown): string => {
  const errorCode = (error as { code?: string })?.code || '';

  const errorMessages: Record<string, string> = {
    'auth/user-not-found': '사용자를 찾을 수 없습니다',
    'auth/wrong-password': '비밀번호가 올바르지 않습니다',
    'auth/invalid-email': '이메일 형식이 올바르지 않습니다',
    'auth/user-disabled': '계정이 비활성화되었습니다',
    'auth/too-many-requests': '너무 많은 요청입니다. 잠시 후 다시 시도해주세요',
    'auth/email-already-in-use': '이미 사용 중인 이메일입니다',
    'auth/weak-password': '비밀번호가 너무 약합니다',
    'auth/network-request-failed': '네트워크 오류가 발생했습니다',
    'auth/popup-closed-by-user': '로그인 창이 닫혔습니다',
    'auth/popup-blocked':
      '팝업이 차단되었습니다. 브라우저 설정에서 팝업을 허용해주세요',
  };

  return (
    errorMessages[errorCode] ||
    (error instanceof Error ? error.message : undefined) ||
    '알 수 없는 오류가 발생했습니다'
  );
};

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const createAdminSession = async (user: User | null) => {
    if (!user) {
      return { success: false, error: '로그인 정보를 확인할 수 없습니다.' };
    }

    const idToken = await user.getIdToken(true);
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (response.ok) {
      return { success: true, error: null };
    }

    const payload = await response.json().catch(() => null);
    return {
      success: false,
      error: payload?.message || '관리자 권한이 없습니다.',
    };
  };

  const clearAdminSession = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' }).catch(() => null);
  };

  //  구글 간편 로그인 함수
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      storage.set('userData', result.user);
      const sessionResult = await createAdminSession(result.user);
      if (!sessionResult.success) {
        await auth.signOut();
        storage.set('userData', null);
        throw new Error(sessionResult.error || '관리자 권한이 없습니다.');
      }
      if (result.user !== null) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      const errorMessage = getErrorMessage(error);
      alert(`로그인 실패: ${errorMessage}`);
    }
  };

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      storage.set('userData', userCredential?.user);
      const sessionResult = await createAdminSession(userCredential?.user);
      if (!sessionResult.success) {
        await auth.signOut();
        storage.set('userData', null);
        setLoading(false);
        return { success: false, error: sessionResult.error };
      }
      setLoading(false);
      return { success: true, error: null };
    } catch (error) {
      setLoading(false);
      const errorMessage = getErrorMessage(error);
      return { success: false, error: errorMessage };
    }
  };

  // 회원가입 함수
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      storage.set('userData', userCredential.user);
      const sessionResult = await createAdminSession(userCredential?.user);
      if (!sessionResult.success) {
        await auth.signOut();
        storage.set('userData', null);
        setLoading(false);
        return { success: false, error: sessionResult.error };
      }
      setLoading(false);
      return { success: true, error: null };
    } catch (error) {
      setLoading(false);
      const errorMessage = getErrorMessage(error);
      return { success: false, error: errorMessage };
    }
  };

  // 로그아웃 함수
  const logOut = async () => {
    try {
      await auth.signOut();
      storage.set('userData', null);
      await clearAdminSession();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = getErrorMessage(error);
      alert(`로그아웃 실패: ${errorMessage}`);
    }
  };

  return {
    loading,
    error,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
  };
};

export const useCategories = () =>
  useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const categories = await getDocs(collection(db, 'categories'));
      return Array.from(categories.docs).map((doc) => doc.data());
    },
  });

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const tags = await getDocs(collection(db, 'tags'));
      return Array.from(tags.docs).map((doc) => doc.data());
    },
  });

// export const useUpdatePost = (postId: string) => {
//   const queryClient = useQueryClient();
//   return useMutation(updatePost, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['posts']);
//     },
//   });
// };

// export const useDeletePost = (postId: string) => {
//   const queryClient = useQueryClient();
//   return useMutation(deletePost, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['posts']);
//     },
//   });
// };

/**
 * 모달이 열릴 때 body의 스크롤을 막는 hook
 * @param isLocked - 모달이 열려있는지 여부
 */
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 스크롤 방지 스타일 적용
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // 스크롤 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};

/**
 * 모달 닫기 기능을 제공하는 hook (ESC 키, 배경 클릭)
 * @param isOpen - 모달이 열려있는지 여부
 * @param onClose - 모달을 닫는 함수
 * @param options - 옵션 설정
 * @param options.closeOnEsc - ESC 키로 닫기 여부 (기본값: true)
 * @param options.closeOnBackdrop - 배경 클릭으로 닫기 여부 (기본값: true)
 * @returns handleBackdropClick - 배경 클릭 핸들러 함수
 */
export const useModalClose = (
  isOpen: boolean,
  onClose: () => void,
  options?: { closeOnEsc?: boolean; closeOnBackdrop?: boolean }
) => {
  const { closeOnEsc = true, closeOnBackdrop = true } = options || {};

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation(); // 다른 모달의 ESC 핸들러 실행 방지
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose, closeOnEsc]);

  // 배경 클릭 핸들러
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return { handleBackdropClick };
};

/**
 * 모달 포커스 관리 hook (포커스 저장/복원 및 초기 포커스 설정)
 * @param closeButtonRef - 닫기 버튼의 ref
 * @param isOpen - 모달이 열려있는지 여부
 * @param options - 옵션 설정
 * @param options.focusDelay - 포커스 지연 시간 (ms, 기본값: 100)
 * @returns previousFocusRef - 이전 포커스 요소를 저장하는 ref
 */
export const useModalFocus = (
  closeButtonRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
  options?: { focusDelay?: number }
) => {
  const { focusDelay = 100 } = options || {};
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 현재 포커스 저장
    previousFocusRef.current = document.activeElement as HTMLElement;

    // 애니메이션 후 닫기 버튼에 포커스
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, focusDelay);

    return () => {
      clearTimeout(timer);
      // 모달이 닫힐 때 원래 포커스로 복원
      previousFocusRef.current?.focus();
    };
  }, [isOpen, closeButtonRef, focusDelay]);

  return { previousFocusRef };
};

/**
 * 모달 포커스 트랩 hook (Tab 키로 모달 내부만 순환)
 * @param modalRef - 모달 컨테이너의 ref
 * @param isOpen - 모달이 열려있는지 여부
 */
export const useFocusTrap = (
  modalRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      // 포커스 가능한 요소들 선택
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, modalRef]);
};
