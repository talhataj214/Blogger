import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionThree = () => {
  const [entrepriseNews, setEntrepriseNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState(8);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchEntrepriseNews = async () => {
      try {
        const response = await fetch(
          "https://frequencebonheur.fr/admin/api/category/news/Entreprise"
        );
        const data = await response.json();

        // Sort news by date, 


        const sortedNews = data.news.sort(
          (a, b) => new Date(b.newsDate) - new Date(a.newsDate)
        );

        setEntrepriseNews(sortedNews); 
      } catch (error) {
        console.error("Error fetching entreprise news:", error);
      }
    };

    fetchEntrepriseNews();
  }, []);

  const handleShowAll = () => {
    setShowAll(!showAll);
    setVisibleNews(showAll ? 8 : entrepriseNews.length); // Toggle between 8 and all news
  };

  const handleCardClick = (slug) => {
    // Navigate to the category page with the slug
    navigate(`/${slug}`);
  };

  const displayedNews = showAll
    ? entrepriseNews
    : entrepriseNews.slice(0, visibleNews);

  return (
    <div style={styles.container}>
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: '36px',
          fontWeight: 'bold',
          color: 'grey',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
          paddingBottom: '10px',
          paddingTop: '30px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Section Enterprise News
      </h3>
      <div style={styles.cardContainer}>
        {displayedNews.map((news) => (
          <div
            key={news._id}
            style={styles.card}
            onClick={() => handleCardClick(news.slug)} // Pass the slug here
          >
            <div style={styles.imageWrapper}>
              <img
                src={news.image}
                alt={news.title}
                style={styles.image}
              />
            </div>
            <div style={styles.textContent}>
              <h2 style={styles.title}>{news.title}</h2>
              <p style={styles.description}>
                {news.description.replace(/<[^>]+>/g, "").slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleShowAll}
        style={styles.showAllButton}
      >
        {showAll ? 'Show Less' : 'Show All News'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f8f8',
    boxSizing: 'border-box',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '100%',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease-in-out',
  },
  textContent: {
    padding: '15px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  showAllButton: {
    backgroundColor: 'black',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default SectionThree;
