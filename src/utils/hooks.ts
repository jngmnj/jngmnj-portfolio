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
      return { success: false, error };
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
      return { success: false, error };
    }
  };

  // 로그아웃 함수
  const logOut = async () => {
    try {
      await auth.signOut();
      storage.set('userData', null);
      router.push('/');
    } catch (error) {
      console.error(error);
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
