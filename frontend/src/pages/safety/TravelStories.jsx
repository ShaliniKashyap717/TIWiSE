import { ChevronLeft, ChevronRight, ThumbsUp, Bookmark, Star, Quote } from 'lucide-react';





import { useState, useEffect } from 'react';
import { fetchStories, updateStory } from './api';

const TravelStories = ({ 
  currentStoryIndex, 
  autoScroll,
  setAutoScroll,
  setCurrentStoryIndex,
  handleNextStory,
  handlePrevStory
}) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStories = async () => {
      try {
        const { data } = await fetchStories();
        setStories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };
    getStories();
  }, []);

  const toggleLike = async (id, isLiked) => {
    try {
      const action = isLiked ? 'unlike' : 'like';
      const { data } = await updateStory(id, action);
      
      setStories(stories.map(story => 
        story._id === id ? data : story
      ));
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };


  if (loading) return <div>Loading stories...</div>;
  if (!stories.length) return <div>No stories found.</div>;

  return (
   
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <h2 className="text-xl font-semibold text-teal-600 mb-4">Travel Experiences</h2>
          
         <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="text-center max-h-full overflow-y-auto"> {/* Added overflow handling */}
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`w-4 h-4 ${i < stories[currentStoryIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-1">{stories[currentStoryIndex].title}</h3>
        <p className="text-xs text-teal-600 mb-2">{stories[currentStoryIndex].location}</p>
        <p className="text-gray-700 text-sm mb-2 italic max-h-32 overflow-y-auto"> {/* Constrained content */}
          "{stories[currentStoryIndex].content}"
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>— {stories[currentStoryIndex].author || 'Anonymous'}</span>
          <span>{stories[currentStoryIndex].date}</span>
        </div>
      </div>
    </div>
  </div>
          
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={handlePrevStory}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-1">
              {stories.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setCurrentStoryIndex(index);
                    setAutoScroll(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentStoryIndex ? 'bg-teal-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNextStory}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
          
            
            <button 
              onClick={() => setAutoScroll(!autoScroll)}
              className="text-xs text-teal-600 hover:text-teal-800 flex items-center"
            >
              {autoScroll ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play
                </>
              )}
            </button>
          </div>
        </div>
  );
};

export default TravelStories;