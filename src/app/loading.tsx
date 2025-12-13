import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ffffff20]/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-medium ">Frontend Engineer</p>
        <Image src="/images/common/logo_black.svg" alt="logo" width={160} height={100} className="animate-bounce" />
      </div>
    </div>
  );
}