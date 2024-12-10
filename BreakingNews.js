import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';  
import style from "./News.module.css";

const BreakingNews = () => {
    const [newsItems, setNewsItems] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch('https://frequencebonheur.fr/admin/api/latest/news')
            .then(response => response.json())
            .then(data => {
                console.log("API Response: ", data);
                setNewsItems(Array.isArray(data) ? data : data.news || []);
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });
    }, []);

    const styles = {
        container: {
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            overflow: 'hidden', 
            marginTop: '20px',
            padding: '0 10px',  // Added padding for responsiveness
        },
        ticker: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            height: '60px',
            margin: '0 auto',
            justifyContent: 'space-between', // Adjusted for space between items
        },
        news: {
            flex: 1,  // Allows it to take available space
            background: 'grey',
            padding: '16px 2% 0 2%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        title: {
            width: '50%', // Set a larger width, e.g., 80% of the parent container
            maxWidth: '250px', // Optionally limit the maximum width
            textAlign: 'center',
            background: '#87CEFA',
            position: 'relative',
            padding: '20px', // Add padding for more space inside the element
            display: 'block', // Ensure it's a block element to respect width
            margin: '0 auto', // Center it within its container
        },
        titleArrow: {
            background: "grey",
            position: 'absolute',
            right: '-16%',
            borderLeft: '25px solid #87CEFA',
            borderTop: '30px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '33px solid transparent',
            top: '40%',
            transform: 'translateY(-50%)',
        },
        titleText: {
            fontSize: '18px',
        },
        marquee: {
            fontSize: '18px',
            display: 'inline-block',
        },
    };

    // Conditionally render BreakingNews based on the current location (only show on '/')
    if (location.pathname !== '/') {
        return null; 
    }

    return (
        <div style={styles.container}>
            <div className="ticker" style={styles.ticker}>
                <div className="title" style={styles.title}>
                    <h5
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, black, grey)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                       Breaking News
                    </h5>

                    <div style={styles.titleArrow}></div>
                </div>
                <div className="news" style={styles.news}>
                    <marquee style={styles.marquee}>
                        {Array.isArray(newsItems) && newsItems.length > 0 ? (
                            newsItems.map((newsItem, index) => (
                                <Link
                                    key={index}
                                    to={`/${newsItem.slug}`} // Ensure slug is defined in newsItem
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        paddingRight: '20px',
                                    }}
                                >
                                    {newsItem.title}
                                </Link>
                            ))
                        ) : (
                            <span>No news available</span>
                        )}
                    </marquee>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;
