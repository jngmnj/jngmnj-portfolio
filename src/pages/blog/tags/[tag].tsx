import PostList from '@/components/blog/PostList';
import Tags from '@/components/blog/Tags';
import { GetServerSideProps } from 'next';

type TagPostsProps = {
  tag: string;
};

const TagPosts = ({ tag }: TagPostsProps) => {
  return (
    <div className="container grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <PostList tag={tag} />
      </div>
      <div className="">
        <Tags />
      </div>
    </div>
  );
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
