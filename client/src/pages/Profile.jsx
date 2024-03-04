import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {

  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState()
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        })
      })
  }

  // firebase storage rules 
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size < 5 * 1024 * 1024 && 
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef}
          hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])} />
        <img src={formData.avatar || currentUser.avatar} alt=""
          onClick={() => fileRef.current.click()}
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 ' />
        <p className='text-sm self-center'>
          {fileUploadError ?
            <span className='text-red-700'>Error Image upload(image must be less than 5mb)</span> :
            filePerc > 0 && filePerc < 100 ?
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              :
              filePerc === 100 ? <span className='text-green-700'>Image successfully uplaoded!</span> : ''
          }
        </p>
        <input type='text' placeholder='username'
          className='border p-3 rounded-lg-2' id='username' />
        <input type='email' placeholder='email'
          className='border p-3 rounded-lg-2' id='email' />
        <input type='password' placeholder='password'
          className='border p-3 rounded-lg-2' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 
          uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
