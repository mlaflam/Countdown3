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

    console.log(imgUrl);

    return (
      <Story
        key={story.id}
        title={storyTitle}
        author={storyAuthor}
        description={storyDescription}
        url={storyUrl}
        imgUrl={imgUrl || 'https://static01.nyt.com/images/2025/05/18/multimedia/18dc-Biden/18dc-Biden-thumbStandard-v4.jpg'} // Fallback image URL
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