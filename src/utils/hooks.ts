import storage from '@/utils/storage';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../../firebase';

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
    } catch (error) {
      setLoading(false);
      console.error(error);
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
    } catch (error) {
      setLoading(false);
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
