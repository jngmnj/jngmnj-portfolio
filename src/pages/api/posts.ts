import { Post } from '@/types';
import { FirestoreError } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | FirestoreError>
) {
  if (req.method !== 'POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  if (method === 'POST') {
    try {
      const posts = await getPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (method === 'POST') {
    try {
      const post = await createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
