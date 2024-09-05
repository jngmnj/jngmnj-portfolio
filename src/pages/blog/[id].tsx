import Image from 'next/image';

type PostProps = Post;

const Post = ({
  id,
  title,
  category,
  tags,
  content,
  created_at,
  preview_image_url,
}: PostProps) => {
  return (
    <div className="container">
      <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4 lg:grid-rows-1">
        <div className="col-span-3 border lg:col-span-2">
          <Image src={preview_img_url} alt="preview" width={800} height={400} />
        </div>
        <div className="col-span-3 border lg:col-span-1">dd</div>
      </div>
    </div>
  );
};

export default Post;
