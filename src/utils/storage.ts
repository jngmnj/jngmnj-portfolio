const storage = {
  set: (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
    // 이벤트 발생
    if (key === 'userData') {
      window.dispatchEvent(new Event('storageUserDataChange'));
    }
  },
  get: <T>(key: string, defaultValue?: T): T => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      return (value ? JSON.parse(value) : defaultValue) as T;
    }
  },
  remove: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
};

export default storage;
