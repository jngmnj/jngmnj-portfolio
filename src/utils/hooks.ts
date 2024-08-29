import storage from '@/utils/storage';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../../firebase';

// Firebase 초기화
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  //  구글 간편 로그인 함수
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    console.log('hey', auth);
    console.log('provider', provider);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User Info:', result.user);
      storage.set('userData', result.user);
      setUser(result.user);
      if (result.user !== null) {
        router.push('/');
      }
      // return result.user;
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  // 로그인 함수
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> => {
    setLoading(true);
    try {
      //   signInWithEmailAndPassword
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential?.user);
      setLoading(false);
      return { user: userCredential.user, error: null };
    } catch (error) {
      //   setError(error?.message);
      setLoading(false);
      console.error(error);
      return { user: null, error: error as Error };
    }
  };

  // 회원가입 함수
  const signUp = async (
    email: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setLoading(false);
      return { user: userCredential.user, error: null };
    } catch (error) {
      //   setError(error.message);
      setLoading(false);
      return { user: null, error: error as Error };
    }
  };

  // 로그아웃 함수
  const signOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      //   setError(error.message);
      console.error(error);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
};
