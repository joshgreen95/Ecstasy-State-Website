import React, { useEffect, useState } from 'react';
import { QuerySnapshot, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from './Firebase.js';
import GeneratedContent from '../logic/GeneratedContent.jsx';


export default function BlogContent() {
    const [contentArray, setContentArray] = useState([]);

    const getPosts = async () => {
        let postArray = [];
        await getDocs(collection(db, 'post'))
            .then((querySnapshot) => {
                querySnapshot.forEach((query) => {
                    const parsedOBJ = JSON.parse(query.data()['post']);
                    let updatedArray = [...postArray, parsedOBJ];
                    postArray = updatedArray;
                });
                
            }) .then(() => {
                setContentArray(postArray);
            })
    }
   
    useEffect(() => {
        getPosts();
    }, []);

return (
    <>
    <div className='blogContent'>
        {contentArray.map((content) => {
            return <GeneratedContent content={content} />
        })}
    </div>
    </>
)
}
