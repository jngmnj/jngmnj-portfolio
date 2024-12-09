import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../../firebase';

const PostListPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'posts', 'qJqJ1sQcs8onguZ64UDI');
      // const docSnap = await getDoc(docRef);
      const docSnap = await await getDocs(collection(db, 'posts'));

      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          console.log('Document data:', doc.data());
        });
      } else {
        console.log('No documents found!');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container grid grid-cols-3 gap-10">
      <div className="col-span-2">{/* <PostList /> */}</div>
      <div className="">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">카테고리</div>
            <div className="text-sm text-gray-500">더보기</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">태그</div>
            <div className="text-sm text-gray-500">더보기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
