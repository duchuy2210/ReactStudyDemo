/**
 * Customs hooks sử dụng cho post và delete images ở PostAddNew.js
 */

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useFirebaseImage(setValue, getValues) {
  //Tạo state để handle progress chạy upload ảnh
  const [progress, setProgress] = useState(0);
  //State khi upload xong thì hiện ảnh lên chổ label input
  const [image, setImage] = useState('');

  //Kiểm tra 2 tham số
  if (!setValue || !setValue) return;

  //onSelect IMG
  const handleSelectImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setValue('image_name', file.name);
    handleUploadImage(file);
  };

  //Delete images
  const handleDeleteImage = () => {
    const storage = getStorage();
    console.log(getValues('image_name'));
    // Create a reference to the file to delete
    const imageRef = ref(storage, 'images/' + getValues('image_name'));

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        toast.success('Deleted successfully');
        setImage('');
        setProgress(0);
      })
      .catch(error => {
        toast.error('Failure to delete');
      });
  };

  //Handle Upload File Image
  const handleUploadImage = file => {
    const storage = getStorage();
    const metadata = {
      contentType: 'image/jpeg',
    };
    // Upload file to the object 'images/'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        console.log('Upload is ' + progressPercent + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Nothing at all');
        }
      },
      error => {
        console.log('Upload error: ' + error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL and show image
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          toast.success('Upload successfully');
          setImage(downloadURL);
        });
      }
    );
  };
  const handleResetImage = () => {
    setImage('');
    setProgress(0);
  };
  return {
    image,
    progress,
    handleSelectImage,
     handleDeleteImage,
    handleResetImage,
  };
}
