// 이메일 형식 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 길이 검증
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// 비밀번호 일치 검증
export const validatePasswordMatch = (
  password: string,
  passwordCheck: string
): boolean => {
  return password === passwordCheck;
};
