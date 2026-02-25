'use client';

import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import Toast from '@/components/common/Toast';
import { cn } from '@/utils/style';
import { useToast } from '@/utils/useToast';
import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImSpinner2 } from 'react-icons/im';

export default function ContactForm() {
  const { t } = useTranslation('common');
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
        showToast(t('contact.toast.success'), 'success');
        reset();
      }
    } catch (error) {
      console.error('Failed to send contact:', error);
      showToast(t('contact.toast.error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:w-1/2">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <form
        onSubmit={handleSubmit(handleSubmitContact)}
        method="post"
        className="space-y-5"
      >
        <div>
          <FormInput
            label={t('contact.form.name.label')}
            id="name"
            register={register}
            placeholder={t('contact.form.name.placeholder')}
            required={t('contact.form.name.required')}
            errors={errors}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <div>
          <FormInput
            label={t('contact.form.company.label')}
            id="company"
            register={register}
            placeholder={t('contact.form.company.placeholder')}
            required={false}
            errors={errors}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <div>
          <FormInput
            label={t('contact.form.email.label')}
            id="email"
            type="email"
            register={register}
            placeholder={t('contact.form.email.placeholder')}
            required={t('contact.form.email.required')}
            errors={errors}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <div>
          <FormInput
            label={t('contact.form.title.label')}
            id="title"
            disabled={isLoading}
            register={register}
            placeholder={t('contact.form.title.placeholder')}
            required={t('contact.form.title.required')}
            errors={errors}
            isLoading={isLoading}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            {t('contact.form.message.label')}
            <span className="ml-1 text-red-500">*</span>
          </label>
          <textarea
            id="content"
            disabled={isLoading}
            {...register('content', {
              required: t('contact.form.message.required'),
            })}
            placeholder={t('contact.form.message.placeholder')}
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
              <span>{t('contact.form.sending')}</span>
            </span>
          ) : (
            t('contact.form.submit')
          )}
        </Button>
      </form>
    </div>
  );
}
