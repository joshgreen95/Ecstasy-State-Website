import React, { useState } from 'react'

export default function ImgInput() {
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [image, setImage] = useState(null);

    function UploadImage(event){
        console.log(event);

        setIsImageUploaded(true);
    }


    return (
    <>
        {isImageUploaded} ? <>Donezo!</>  
    :
        
        <div className={'imgInput'}>
        <label htmlFor='imgUpload'>Image</label>
        
        <input type='image' className={'imgUpload'} onChange={(e) => {
            UploadImage(e);
        }}>

        </input>
        </div>
    </>
    
  )
}
