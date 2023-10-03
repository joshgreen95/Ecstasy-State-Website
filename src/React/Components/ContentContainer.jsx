//Core
import React from 'react'

//Components
import GeneratedContent from '../logic/GeneratedContent.jsx'

import { testPost } from './TestContentObject.js'

export default function ContentContainer() {
  return (
    <div className='contentContainer'>
        <GeneratedContent content={testPost}/>
    </div>
  )
}
