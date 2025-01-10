import { addDoc, collection, FirestoreError } from 'firebase/firestore';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: string } | FirestoreError>
) {
  if (req.method !== 'POST') return res.status(405).end();

  console.log('test~~~');
  const form = formidable({ multiples: true, keepExtensions: true });

  const [fields, files] = await form.parse(req);

  const { title, category, tags, content, createdAt, isPublished, authorId } =
    fields;

  const postRequest = {
    title: title?.[0],
    category: category?.[0],
    tags: tags?.[0],
    content: content?.[0],
    createdAt: createdAt?.[0],
    isPublished: isPublished?.[0],
    authorId: authorId?.[0],
  };

  console.log('postRequest:', postRequest);
  try {
    const docRef = await addDoc(collection(db, 'posts'), postRequest);
    if (docRef.id) {
      return res.status(200).json({ id: docRef.id });
    }
  } catch (error) {
    return res.status(400).json(error as FirestoreError);
  }
}
