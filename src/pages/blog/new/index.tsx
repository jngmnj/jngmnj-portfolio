import ImageUploader from '@/components/blog/ImageUploader';
import { MarkdownEditor } from '@/components/blog/Markdown';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import ReactSelect from 'react-select';

const New = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current?.value) return alert('제목을 입력해주세요.');
    if (!category) return alert('카테고리을 입력해주세요.');
    if (!content) return alert('내용을 입력해주세요.');
    // if (!tags) return alert('태그를 입력해주세요.');

    const formData = new FormData();
    formData.append('title', titleRef.current?.value ?? '');
    formData.append('category', category);
    formData.append('content', content);
    formData.append('tags', tags);

    // 이미지 파일이 있을 경우
    if (fileRef.current?.files) {
      formData.append('file', fileRef.current.files[0]);
    }

    try {
      await axios.post('/api/blog', formData);
      alert('글이 작성되었습니다.');
      router.push('/blog');
    } catch (e) {
      console.log(e);
      alert('글 작성에 실패했습니다.');
    }
  };
  return (
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="mb-8 text-center text-2xl font-medium">글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <ImageUploader />
          {/* <Input
            type="file"
            // 이미지파일만 받음
            accept="imgage/*"
            ref={fileRef}
          /> */}
          <ReactSelect
            instanceId={'category'}
            placeholder="카테고리"
            isMulti={false}
            onChange={(e) => e && setCategory(e?.value)}
          />
          <ReactSelect
            instanceId={'tags'}
            placeholder="태그"
            onChange={(e) =>
              e && setTags(JSON.stringify(e.map((e) => e.value)))
            }
            isMulti
          />
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
};

export default New;
