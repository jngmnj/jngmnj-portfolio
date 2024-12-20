import { addDoc, collection, FirestoreError } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

const postsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ id: string } | FirestoreError>
) => {
  const { method, body } = req;

  console.log('여기');
  switch (method) {
    case 'POST': {
      try {
        const docRef = await addDoc(collection(db, 'posts'), body);
        if (docRef.id) {
          return res.status(200).json({ id: docRef.id });
        }
      } catch (error) {
        return res.status(400).json(error as FirestoreError);
      }
    }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default postsHandler;
