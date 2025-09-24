import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import React, { useState } from 'react';
import { app } from '../../../firebaseConfig'; // Firebase 초기화 파일

const storage = getStorage(app);

// 이미지 파일을 여러 개 업로드하는 함수
const uploadImages = async (files: FileList) => {
  const uploadedUrls = [];

  // 여러 이미지 파일을 처리하는 루프
  for (const file of Array.from(files)) {
    const storageRef = ref(storage, `images/${file.name}`);

    // 파일을 Firebase Storage에 업로드
    const snapshot = await uploadBytes(storageRef, file);

    // 업로드 완료 후 다운로드 URL 가져오기
    const downloadUrl = await getDownloadURL(snapshot.ref);
    uploadedUrls.push(downloadUrl); // 다운로드 URL을 배열에 저장
  }

  return uploadedUrls; // 모든 이미지의 다운로드 URL을 반환
};

const firestore = getFirestore(app);
// 이미지 다운로드 URL을 Firestore에 저장하는 함수
const saveImageUrlsToFirestore = async (urls: string[]) => {
  const docRef = await addDoc(collection(firestore, 'images'), {
    urls,
    uploadedAt: new Date(),
  });
  return docRef.id;
};

const ImageUploader = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  // 파일 업로드 처리 함수
  const handleUpload = async () => {
    if (files) {
      const urls = await uploadImages(files);
      setUploadedUrls(urls);

      const docRefId = await saveImageUrlsToFirestore(uploadedUrls); // Firestore에 이미지 URL 저장
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>

      {uploadedUrls.length > 0 && (
        <div>
          <h3>Uploaded Images</h3>
          {uploadedUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Uploaded ${index}`}
              width="200"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
