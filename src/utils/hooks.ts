import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';

type useAuthProps = {
  email: string;
  password: string;
};

// Firebase 초기화
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential?.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // 현재 사용자 인증 상태를 감시
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    logOut,
  };
};
