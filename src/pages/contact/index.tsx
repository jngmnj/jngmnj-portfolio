import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import { cn } from '@/utils/style';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitContact: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    console.log('data', data);
    const { name, company, email, title, content } = data;
    setIsLoading(true);
    // await createContact({ name, company, email, title, content });

    reset();
  };

  return (
    <div className="container">
      <div className="flex flex-col items-end gap-20 lg:flex-row">
        <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-8 lg:w-1/2">
          <form
            onSubmit={handleSubmit(handleSubmitContact)}
            method="post"
            className=""
          >
            {/* <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                disabled={isLoading}
                {...register('name', { required: '제목을 입력해주세요.' })}
                placeholder=""
                type="text"
                className={`w-full rounded-md border-b bg-white p-2 outline-none`}
              />
            </div> */}
            <div className="mb-4">
              <FormInput
                label="이름"
                id="name"
                register={register}
                errors={errors}
                disabled={isLoading}
                isLoading={false}
              />
            </div>
            <div className="mb-4">
              <FormInput
                label="회사"
                id="company"
                register={register}
                required={false}
                errors={errors}
                disabled={isLoading}
                isLoading={false}
              />
            </div>
            <div className="mb-4">
              <FormInput
                label="이메일"
                id="email"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
                isLoading={false}
              />
            </div>
            <div className="mb-4">
              <FormInput
                label="제목"
                id="title"
                disabled={isLoading}
                register={register}
                errors={errors}
                isLoading={false}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                disabled={isLoading}
                {...register('content', { required: '내용을 입력해주세요.' })}
                placeholder=""
                className={cn(
                  `w-full resize-none border-b bg-transparent p-2 outline-none`,
                  errors.content ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.content && (
                <p className="text-xs text-red-500">
                  {errors.content.message as string}
                </p>
              )}
            </div>
            <Button
              type="submit"
              color="primary"
              size="large"
              className="w-full"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
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
