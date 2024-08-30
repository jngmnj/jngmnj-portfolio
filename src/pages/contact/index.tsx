import Button from '@/components/common/Button';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const { isLoading, setIsLoading } = useState(false);

  const handleSubmitContact: SubmitHandler<FieldValues> = (
    data: FieldValues
  ) => {
    console.log(data);

    reset();
  };

  return (
    <div className="container">
      <div className="flex items-end gap-20">
        <form
          onSubmit={handleSubmit(handleSubmitContact)}
          method="post"
          className="w-1/2"
        >
          <label htmlFor="name">Name</label>
          <input
            id="name"
            disabled={isLoading}
            {...register('name', { required: '제목을 입력해주세요.' })}
            placeholder=""
            type="text"
            className={`w-full rounded-md border-b bg-white p-4 outline-none`}
          />
          <label htmlFor="company">Company</label>
          <input
            id="company"
            disabled={isLoading}
            {...register('company', { required: '제목을 입력해주세요.' })}
            placeholder=""
            type="text"
            className={`w-full rounded-md border-b bg-white p-4 outline-none`}
          />
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            disabled={isLoading}
            {...register('email', { required: '제목을 입력해주세요.' })}
            placeholder=""
            type="email"
            className={`w-full rounded-md border-b bg-white p-4 outline-none`}
          />
          <label htmlFor="tel">Tel</label>
          <input
            id="tel"
            disabled={isLoading}
            {...register('tel', { required: '제목을 입력해주세요.' })}
            placeholder=""
            type="text"
            className={`w-full rounded-md border-b bg-white p-4 outline-none`}
          />
          <label htmlFor="title">Title</label>
          <input
            id="title"
            disabled={isLoading}
            {...register('title', { required: '제목을 입력해주세요.' })}
            placeholder=""
            type="text"
            className={`w-full rounded-md border-b bg-white p-4 outline-none`}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            disabled={isLoading}
            {...register('content', { required: '내용을 입력해주세요.' })}
            placeholder=""
            className={`w-full rounded-md border-b bg-white p-4 outline-none`}
          />
          <Button type="submit" color="primary" size="large" className="w-full">
            Submit
          </Button>
        </form>
        <div className="flex w-1/2 flex-col gap-6">
          <div className="flex items-center">
            <div className="mr-4 flex size-[80px] items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4">
              <RiKakaoTalkFill size={40} />
            </div>
            <div>
              <h3>Kakao</h3>
              <Link className="link-text" href="">
                오픈채팅 바로가기
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 flex size-[80px] items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4">
              <MdEmail size={40} />
            </div>
            <div>
              <h3>E-mail</h3>
              <Link className="link-text" href="mailTo:jngmnj4@gmail.com">
                jngmnj4@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 flex size-[80px] items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4">
              <HiLocationMarker size={40} />
            </div>
            <div>
              <h3>Location</h3>
              <p>Seoul, South Korea</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
