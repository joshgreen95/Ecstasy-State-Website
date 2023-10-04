//Core
import React from 'react'
//Components
import GeneratedContent from '../logic/GeneratedContent.jsx'

import { testPost } from './TestContentObject.js'
import BlogContent from './BlogContent.jsx'

export default function ContentContainer() {
  return (
    <div className='contentContainer'>
        <BlogContent />
    </div>
  )
}
