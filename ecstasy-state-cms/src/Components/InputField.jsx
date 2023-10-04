import React from 'react'
import { componentSelectionOptions } from './componentSelectionOptions.js'

export default function InputField() {
    
    return (
    <div className='inputField'>

        <label htmlFor='type'>Type</label>
        
        <select name='type' className='typeSelector'>
            {componentSelectionOptions.map((option) => {
               return <option key={option}>{option}</option>;
            })}
        </select>
        
        <label htmlFor='content'>Content</label>
        <input type='text' name='content' className='contentBox'>
        
        </input>

    </div>
  )
}
