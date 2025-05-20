import React from 'react'
import Story from './Story';

const News = ({ data }) => {
  const list = data.results;
  console.log(list);

  const story = list.slice(0, 5).map(story => {
    const storyTitle = story.title;
    const storyAuthor = story.byline;
    const storyDescription = story.abstract;
    const storyUrl = story.url;

    // Safely access media and media-metadata
    const imgUrl = story.media && story.media[0] && story.media[0]['media-metadata'] && story.media[0]['media-metadata'][0]?.url;

    // console.log(imgUrl);

    return (
      <Story
        key={story.id}
        title={storyTitle}
        author={storyAuthor}
        description={storyDescription}
        url={storyUrl}
        imgUrl={imgUrl || 'https://static.vecteezy.com/system/resources/previews/022/014/063/original/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg'} // Fallback image URL
      />
    );
  });

  return (
    <div className="news-story-container">
      <div className='news-story'>
        {story}
      </div>
    </div>
  );
}

export default News;