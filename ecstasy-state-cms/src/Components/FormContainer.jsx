import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';
import { Post } from '../Logic/PostBuilder.js';
import InputField from './InputField.jsx';


import { InterpretForm } from '../Logic/FormInterpreter.js';

export default function FormContainer() {
    const [formRoot, setFormRoot] = useState(null);
    const [componentCount, setComponentCount] = useState(0);
    const [componentsToRender, setComponentsToRender] = useState([]);
    const [post, setPost] = useState(new Post());


    function PopulateComponents(){
        //Why does this loop? 
        for(let i = componentCount; i <= componentCount; i++){
            let updatedArray = [...componentsToRender, InputField];
            setComponentsToRender(updatedArray);
            console.log(componentsToRender);
         }        
    }

    function PopulateImageComponent(){
        let updatedArray = [...componentsToRender, ]
    }
    
    useEffect(() => {
    })

    return (
    <>
        <button onClick={() =>{
                setComponentCount(componentCount + 1);
                PopulateComponents();
        }} >Add Field</button>

        <button onClick={() => {

        }}>Add Image </button>
        <div className='formContainer'>
            <form id='contentForm' onSubmit={(e)=>{
                e.preventDefault();
                InterpretForm(e, post);
                post.UploadToFirebase();
            }}>

                {componentsToRender.map((component) => {
                    return <InputField />
                })}

            </form>
                <button type='submit' form='contentForm' onClick={((e) => {
                    
                })}>Submit</button>
        </div>
    </>
  )
}
