'use client';

import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import Toast from '@/components/common/Toast';
import { cn } from '@/utils/style';
import { useToast } from '@/utils/useToast';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiLocationMarker } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleSubmitContact: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    const { name, company, email, title, content } = data;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('company', company);
    formData.append('email', email);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('createdAt', new Date().toISOString());

    try {
      const res = await axios.post('/api/contact', formData);
      if (res.status === 200) {
        showToast('성공적으로 전송되었습니다.', 'success');
        reset();
      }
    } catch (error) {
      console.error('Failed to send contact:', error);
      showToast('전송에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content container flex flex-1 flex-col justify-center">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <div className="flex flex-col items-end gap-20 lg:flex-row">
        <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:w-1/2">
          <form
            onSubmit={handleSubmit(handleSubmitContact)}
            method="post"
            className="space-y-5"
          >
            <div>
              <FormInput
                label="Name"
                id="name"
                register={register}
                errors={errors}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
            <div>
              <FormInput
                label="Company"
                id="company"
                register={register}
                required={false}
                errors={errors}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
            <div>
              <FormInput
                label="Email"
                id="email"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
            <div>
              <FormInput
                label="Title"
                id="title"
                disabled={isLoading}
                register={register}
                errors={errors}
                isLoading={isLoading}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium">
                Message<span className="ml-1 text-red-500">*</span>
              </label>
              <textarea
                id="content"
                disabled={isLoading}
                {...register('content', { required: 'Message is required.' })}
                placeholder="Enter your message"
                rows={6}
                className={cn(
                  `w-full resize-none rounded-none border-b bg-transparent p-2 transition-colors outline-none`,
                  errors.content
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-gray-300'
                )}
              />
              {errors.content && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.content.message as string}
                </p>
              )}
            </div>
            <Button
              type="submit"
              color="primary"
              size="large"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <ImSpinner2 className="animate-spin" />
                  <span>Sending...</span>
                </span>
              ) : (
                'Submit'
              )}
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
                Open Chat
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 flex size-[80px] items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4">
              <MdEmail size={40} />
            </div>
            <div>
              <h3>Email</h3>
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
}
