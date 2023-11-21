import React, { useState } from 'react'

export default function ImgInput() {
    const [isImageUploaded, setIsImageUploaded] = useState(false);
  
    function UploadImage(){

    }
    return (
    <>
        {isImageUploaded} ? <>Donezo!</>  
    :
        
        <div className={'imgInput'}>
        <label htmlFor='imgUpload'>Image</label>
        
        <input type='image' className={'imgUpload'} onChange={() => {
            UploadImage();
        }}>

        </input>
        </div>
    </>
    
  )
}
