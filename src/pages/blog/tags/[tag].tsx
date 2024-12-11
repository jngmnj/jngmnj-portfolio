import PostList from '@/components/blog/PostList';
import { GetServerSideProps } from 'next';

type TagPostsProps = {
  tag: string;
};

const TagPosts = ({ tag }: TagPostsProps) => {
  return <PostList tag={tag} />;
};

export default TagPosts;

export const getServerSideProps: GetServerSideProps<TagPostsProps> = async ({
  query,
}) => {
  const { tag } = query;
  return {
    props: {
      tag: query.tag as string,
    },
  };
};
