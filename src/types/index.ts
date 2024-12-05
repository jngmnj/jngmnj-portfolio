// import { FirebaseFirestore } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export type Post = {
  id?: string; // Firestore 문서 ID (자동 생성)
  title: string; // 게시물 제목
  category: string; // 게시물 카테고리
  content: string; // 게시물 내용
  authorId: string; // 작성자 ID
  authorName?: string; // 작성자 이름 (선택적)
  //   createdAt: FirebaseFirestore.Timestamp; // 작성 시간 (Firestore 타임스탬프)
  createdAt: Timestamp;
  updatedAt?: Timestamp; // 수정 시간 (선택적)
  tags?: string[]; // 태그 (선택적)
  likesCount?: number; // 좋아요 수 (선택적)
  commentsCount?: number; // 댓글 수 (선택적)
  isPublished: boolean; // 게시 여부
  previewImgUrl?: string; // 미리보기 이미지 URL (선택적)
};

export type Project = {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  stack: string[];
  links: {
    github: string;
    demo: string;
  };
};
