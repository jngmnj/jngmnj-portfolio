import {
  addDoc,
  collection,
  FirestoreError,
  Timestamp,
} from 'firebase/firestore';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebaseConfig';

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
    const { fields } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    let createdAtTimestamp;
    if (fields.createdAt && typeof fields.createdAt === 'string') {
      createdAtTimestamp = Timestamp.fromDate(new Date(fields.createdAt));
    } else {
      createdAtTimestamp = Timestamp.now();
    }

    const postRequest = {
      name: fields.name?.[0],
      company: fields.company?.[0],
      email: fields.email?.[0],
      title: fields.title?.[0],
      content: fields.content?.[0],
      createdAt: createdAtTimestamp,
    };

    const docRef = await addDoc(collection(db, 'contacts'), postRequest);
    return res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(400).json(error as FirestoreError);
  }
}
