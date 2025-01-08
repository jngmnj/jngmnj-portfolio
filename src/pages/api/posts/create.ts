import { addDoc, collection, FirestoreError } from 'firebase/firestore';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebase';

export const config = {
  api: {
    bodyParser: false, // formidable 사용 시 bodyParser 비활성화
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: string } | FirestoreError>
) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: true });
  try {
    const [fields] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    let tagsArray = [];
    if (fields.tags && fields.tags[0]) {
      console.log('tags:', fields.tags[0]);
      try {
        tagsArray = JSON.parse(fields.tags[0]);
      } catch (error) {
        console.error('Failed to parse tags:', error);
      }
    }

    const postRequest = {
      title: fields.title?.[0],
      category: fields.category?.[0],
      tags: tagsArray,
      content: fields.content?.[0],
      createdAt: fields.createdAt?.[0],
      isPublished: fields.isPublished?.[0],
      authorId: fields.authorId?.[0],
    };

    const docRef = await addDoc(collection(db, 'posts'), postRequest);
    return res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(400).json(error as FirestoreError);
  }
}
