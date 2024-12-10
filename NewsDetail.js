import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetailWithSidebar = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [popularNews, setPopularNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch main article details
  const fetchArticleDetail = async () => {
    try {
      const response = await axios.get(`https://frequencebonheur.fr/admin/api/news/details/${slug}`);
      if (response.data && response.data.news) {
        setArticle(response.data.news);
      } else {
        throw new Error('Article not found');
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message || 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch popular news
  const fetchPopularNews = async () => {
    try {
      const response = await axios.get('https://frequencebonheur.fr/admin/api/popular/news');
      if (response.data && response.data.popularNews) {
        setPopularNews(response.data.popularNews);
      } else {
        throw new Error('No popular news found');
      }
    } catch (error) {
      console.error('Error fetching popular news:', error.message);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
    fetchPopularNews();
  }, [slug]);

  // Scroll to top when the article or slug changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [slug]);

  // Get the current date in 'MM/DD/YYYY' format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', // optional: 'Monday'
    year: 'numeric',
    month: 'long', // optional: 'November'
    day: 'numeric', // optional: '29'
  });

  if (loading) {
    return <div style={styles.loading}>Loading article details...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* Left Column: Article Details */}
      <div style={styles.mainContent}>
        <div style={styles.detailContainer}>
          {/* Author and Date at the top */}
          <div style={styles.authorAndDate}>
            <p style={styles.writerName}> {article.writerName || 'Unknown Author'}</p>
            <p style={styles.publishedDate}>{article.publishedDate || currentDate}</p>
          </div>

          {/* Article Title */}
          <h1 style={styles.title}>{article.title}</h1>

          {/* Article Image */}
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              style={styles.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300';
              }}
            />
          )}

          {/* Article Description */}
          <div
            style={styles.description}
            dangerouslySetInnerHTML={{ __html: article.description }}
          />

          {/* Footer: Removed second published date */}
          <div style={styles.footer}></div>
        </div>
      </div>

      {/* Right Column: Popular News */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Popular Posts</h2>
        {popularNews.map((news) => (
          <div key={news._id} style={styles.popularPost}>
            <img
              src={news.image}
              alt={news.title}
              style={styles.popularImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
            <div>
              <p style={styles.popularCategory}>{news.category}</p>
              <h3 style={styles.popularTitle}>{news.title}</h3>
              <p style={styles.popularAuthor}> {news.writerName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles with responsiveness
const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    flexWrap: 'wrap', // Allow columns to stack on smaller screens
  },
  mainContent: {
    flex: 2,
    minWidth: '300px', // Ensure it doesn’t get too narrow
  },
  detailContainer: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
  authorAndDate: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#555',
  },
  writerName: {
    fontWeight: 'bold',
    color: 'red',
  },
  publishedDate: {
    color: '#777',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '1.5rem',
  },
  footer: {
    fontSize: '0.9rem',
    color: '#777',
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
    marginTop: '1rem',
    textAlign: 'center',
  },
  sidebar: {
    height: 'auto',
    flex: 1,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    maxHeight: 'calc(100vh - 40px)', // Prevent sidebar from overflowing
    overflowY: 'auto', // Enable scrolling if there are too many posts
  },
  sidebarTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  popularPost: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    gap: '10px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    overflow: 'hidden', // Prevents overflow of content in the card
  },
  popularImage: {
    width: '70px',
    height: '70px',
    borderRadius: '5px',
  },
  popularTitle: {
    fontSize: '1rem',
    color: 'black',
    fontWeight: 'bold',
    margin: '0',
  },
  popularCategory: {
    fontSize: '0.8rem',
    color: 'black',
    fontWeight: 'bold',  
  },
  popularAuthor: {
    fontSize: '0.8rem',
    color: 'red',
    fontWeight: 'bold',  
  },
  loading: {
    fontSize: '1.2rem',
    color: 'black',
    textAlign: 'center',
    marginTop: '2rem',
  },
  error: {
    fontSize: '1.2rem',
    color: 'red',
    textAlign: 'center',
    marginTop: '2rem',
  },

  // Media Queries for Responsiveness
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',
      padding: '10px',
    },
    mainContent: {
      flex: 1,
      marginBottom: '20px',
    },
    sidebar: {
      flex: 1,
      height: 'auto',
      maxHeight: 'none', // Disable fixed height for smaller screens
    },
    popularPost: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px',
    },
    popularImage: {
      width: '50px',
      height: '50px',
    },
    title: {
      fontSize: '1.5rem',
    },
  },

  '@media (max-width: 480px)': {
    title: {
      fontSize: '1.2rem',
    },
    sidebarTitle: {
      fontSize: '1.2rem',
    },
    popularPost: {
      padding: '10px',
    },
    popularImage: {
      width: '40px',
      height: '40px',
    },
  },
};

export default NewsDetailWithSidebar;
