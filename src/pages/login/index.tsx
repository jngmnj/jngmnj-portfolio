import Button from '@/components/common/Button';
import Checkbox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { app } from '../../../firebase';

const Login = () => {
  const router = useRouter();
  // 구글 로그인
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      const result = await signInWithPopup(auth, provider);
      // 사용자의 정보는 result.user에 있습니다.
      console.log('User Info:', result.user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  // 로그인
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await router.push('/');
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
              <Input type="text" placeholder="아이디 또는 이메일" />
              <Input type="password" placeholder="비밀번호" />
              <div className="flex justify-between">
                <Checkbox id="remember">아이디 저장</Checkbox>
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
                className="border-seagull-500 text-seagull-500 hover:bg-seagull-50 mb-4 border bg-white"
                onClick={signInWithGoogle}
              >
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
};

export default Login;
