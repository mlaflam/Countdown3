import React from 'react'

const Story = ({ title, author, description, url, imgUrl }) => {
  console.log(imgUrl);
  return (
    <div className='story-box'>
      <a className="story-link" href={url} target="_blank">
        <img src={imgUrl.url} alt="News Icon" className='story-image' />
        <div>
           <div className='story-title'>{title}</div>
          <div className='story-author'>{author}</div>
          <div className='story-description'>{description}</div>
        </div>

      </a>
    </div>
  )
}

export default Story