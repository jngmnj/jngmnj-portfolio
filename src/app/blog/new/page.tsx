'use client';

import { MarkdownEditor } from '@/components/blog/Markdown';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useCategories, useTags } from '@/utils/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

export default function NewPostPage() {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { data: existingCategories } = useCategories();
  const { data: existingTags } = useTags();

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTags(selectedValues);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current?.value) return alert('제목을 입력해주세요.');
    if (!category) return alert('카테고리을 입력해주세요.');
    if (!content) return alert('내용을 입력해주세요.');

    const formData = new FormData();

    formData.append('title', titleRef.current?.value);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tags));
    formData.append('createdAt', new Date().toISOString());
    formData.append('isPublished', 'true'); // 임시
    formData.append('authorId', 'admin'); // 임시

    try {
      console.log('Title:', formData.get('title'));
      const response = await axios.post('/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const docRefId = response.data.id;
      router.push(`/blog/${docRefId}`);
    } catch (e) {
      console.log(e);
      alert('글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="mb-8 text-center text-2xl font-medium">글쓰기</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <Input type="file" ref={fileRef} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2"
          >
            <option value="">카테고리를 선택하세요</option>
            {(existingCategories ?? []).map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
          <select
            multiple
            value={tags}
            onChange={handleTagChange}
            className="focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2"
            size={4}
          >
            {(existingTags ?? []).map((tag) => (
              <option key={`${tag.tag_id}-${tag.tag_name}`} value={tag.tag_id}>
                {tag.tag_name}
              </option>
            ))}
          </select>
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(s) => setContent(s ?? '')}
          />
        </div>
        <div className="mt-6 text-center">
          <Button type="submit" size="large">
            작성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
