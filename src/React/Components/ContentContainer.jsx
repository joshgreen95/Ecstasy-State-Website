//Core
import React from 'react'

//Components
import ContentWindow from './ContentWindow.jsx'

//BlogPost
import TestPost from '../BlogPosts/TestPost.jsx'
import TestPost2 from '../BlogPosts/TestPost2.jsx'

export default function ContentContainer() {
  return (
    <div className='contentContainer'>
        <ContentWindow content={TestPost} />

        <ContentWindow content={TestPost2} />
    </div>
  )
}
