// import { deletePost, updatePost } from '@/pages/api/posts';
import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

// Firebase 에러 코드를 한국어 메시지로 변환
const getErrorMessage = (error: any): string => {
  const errorCode = error?.code || '';

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
    error?.message ||
    '알 수 없는 오류가 발생했습니다'
  );
};

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  //  구글 간편 로그인 함수
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      storage.set('userData', result.user);
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
