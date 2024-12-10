import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecentNews = () => {
    const [footerNewsData, setFooterNewsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFooterNewsData = async () => {
            try {
                const response = await fetch("https://frequencebonheur.fr/admin/api/recent/news");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setFooterNewsData(data);
                } else if (data && Array.isArray(data.news)) {
                    setFooterNewsData(data.news);
                } else {
                    console.error("Invalid data structure:", data);
                }
            } catch (error) {
                console.error("Error fetching footer news data:", error);
            }
        };

        fetchFooterNewsData();
    }, []);

    const handleCardClick = (slug) => {
        navigate(`/${slug}`);
    };

    return (
        <div className="recent-news-container">
            <div className="main-content">
                <div className="news-header">
                    <h3>Recent News</h3>
                </div>

                <div className="news-list">
                    {footerNewsData.map((news, index) => (
                        <div
                            key={index}
                            className="news-card"
                            onClick={() => handleCardClick(news.slug)}
                        >
                            <div className="news-image">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                />
                            </div>
                            <div className="news-details">
                                <div className="news-title">{news.title}</div>
                                <p className="news-description">
                                    {news.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 80)}...
                                </p>
                                <p className="news-author">
                                    <span>{news.writerName || "Unknown"}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar">
                <h3>All Category News</h3>
                <ul>
                    <li><a href="#">Nation</a></li>
                    <li><a href="#">Entreprise</a></li>
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Divertissement</a></li>
                </ul>
            </div>

            <style>{`
                /* Container Style */
               .recent-news-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-top: 40px;  /* Add margin-top */
                    margin-bottom: 40px;  /* Add margin-bottom */
                    margin-left: 20px;  /* Add margin-left */
                    margin-right: 20px;  /* Add margin-right */
                    flex-wrap: wrap;
                    gap: 20px; /* Ensure there's space between items */
                    
                }

                /* Main Content Area */
                .main-content {
                    flex: 1;
                    padding: 20px;
                    margin-right: 20px;
                }

                .news-header h3 {
                    font-family: 'Georgia', serif;
                    font-size: 36px;
                    font-weight: bold;
                    color: grey;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .news-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
                    gap: 20px; /* Space between the cards */
                }

                .news-card {
                    background-color: #fff;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                }

                .news-image img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                }

                .news-details {
                    padding: 10px;
                    color: #333;
                    flex-grow: 1; /* Ensure details section stretches as needed */
                }

                .news-title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 5px;
                    color: #444;
                }

                .news-description {
                    font-size: 12px;
                    color: #666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 10px;
                }

                .news-author {
                    font-size: 12px;
                    color: #999;
                }

                .sidebar {
                    width: 250px;
                    background-color: #f4f4f4;
                    padding: 20px;
                    border-left: 2px solid #ddd;
                    position: sticky;
                    top: 0;
                    height: 385px;
                    overflow-y: auto;
                    border-radius: 10px;
                    margin-top: 125px;
                }

                .sidebar h3 {
                    font-family: 'Georgia', serif;
                    font-size: 24px;
                    font-weight: bold;
                    color: grey;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .sidebar ul {
                    list-style: none;
                    padding: 0;
                }

                .sidebar ul li {
                    margin-bottom: 10px;
                }

                .sidebar ul li a {
                    color: #333;
                    text-decoration: none;
                }

                /* Mobile responsiveness */
                @media (max-width: 768px) {
                    .recent-news-container {
                        flex-direction: column;
                    }

                    .sidebar {
                        width: 100%;
                        margin-top: 20px;
                        margin-right: 0;
                        margin-left: 0;
                    }

                    .news-list {
                        grid-template-columns: 1fr; /* Stack cards vertically on smaller screens */
                    }

                    .news-card {
                        width: 100%;
                    }

                    .sidebar h3 {
                        font-size: 18px;
                    }

                    .sidebar ul {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                    }

                    .sidebar ul li {
                        margin-right: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default RecentNews;
