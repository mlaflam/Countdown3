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
      const imgUrl = story.media[0]['media-metadata'][0];

      return <Story key={story.id} title={storyTitle} author={storyAuthor} description={storyDescription} url={storyUrl} imgUrl={imgUrl} />;
  });

  return (
    <div className="news-story-container">
      <div className='news-story'>
        {story}
      </div>
    </div>
  )
}

export default News