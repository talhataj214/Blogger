import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './News.module.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [slug, setSlug] = useState(''); // You can update the slug dynamically here
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchMoreData = async (slug) => {
    try {
      const response = await fetch(`https://frequencebonheur.fr/admin/api/all/news?slug=${slug}`);
      const data = await response.json();
      if (data && data.news) {
        const formattedNews = Object.entries(data.news);
        setNews(formattedNews);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  useEffect(() => {
    if (slug) {
      fetchMoreData(slug);
    } else {
      fetchMoreData('default-slug'); // or any default category slug
    }
  }, [slug]);

  const handleCardClick = (slug) => {
    navigate(`/${slug}`); // Navigate to the dynamic news detail page
  };

  return (
    <div>
      <h1 className={styles.header}>All The Top News Categories</h1>
      <div className={styles.newsGrid}>
        {news.length > 0 &&
          news.map(([category, articles], i) => (
            <div key={i} className={styles.newsCategory}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              {articles.map((article, secI) => (
                <div
                  key={secI}
                  className={styles.newsItem}
                  style={{
                    padding: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {article.image ? (
                    <div className={styles.imageContainer}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className={styles.newsImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://picsum.photos/150';
                        }}
                      />
                      <div className={styles.categoryOverlay}>{category}</div>
                    </div>
                  ) : (
                    <div className={styles.imageContainer}>
                      <img
                        src="https://picsum.photos/150"
                        alt="No Image Available"
                        className={styles.newsImage}
                      />
                      <div className={styles.categoryOverlay}>{category}</div>
                    </div>
                  )}

                  {article.title && (
                    <h1 className={styles.newsTitle} style={{ fontWeight: 'bold' }}>
                      {article.title.split(' ').slice(0, 8).join(' ') + (article.title.split(' ').length > 10 ? '...' : '')}
                    </h1>
                  )}

                  {article.writerName && (
                    <div style={{ fontWeight: 'bold' }}>{article.writerName}</div>
                  )}

                  {article.description && (
                    <div
                      className={styles.newsDescription}
                      style={{
                        fontSize: "16px",
                        marginBottom: "12px",
                        whiteSpace: "normal",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        textOverflow: "ellipsis",
                      }}
                    >
                      {truncateText(article.description.replace(/<[^>]+>/g, ''))}
                    </div>
                  )}
                  <button
                    onClick={() => handleCardClick(article.slug)} // Call handleCardClick on click
                    className={styles.newsLink}
                    style={{
                      fontSize: "12px",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default News;
