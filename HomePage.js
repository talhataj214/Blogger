import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import style from "./News.module.css";

const CombinedNewsLayout = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize navigate hook

    // Get current date in the desired format
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',  // optional: 'Monday'
        year: 'numeric',
        month: 'long',  // optional: 'November'
        day: 'numeric',  // optional: '29'
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("https://frequencebonheur.fr/admin/api/popular/news");
                const data = await response.json();
                console.log("API Response:", data);

                if (data && Array.isArray(data.popularNews)) {
                    // Sort news data based on publishDate in descending order 
                    const sortedNews = [...data.popularNews].sort(
                        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
                    );
                    setNewsData(sortedNews);
                } else {
                    setNewsData([]);
                }
            } catch (err) {
                console.error("Error fetching news data:", err);
                setError("Failed to load news data.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!Array.isArray(newsData) || newsData.length === 0) {
        return <div>No popular news available.</div>;
    }

    const filteredNewsData = newsData.slice(0, 3);

    // Function to handle card click and navigate to a specific category
    const handleCardClick = (slug) => {
        navigate(`/${slug}`);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    padding: "16px",
                    boxSizing: "border-box",
                }}
            >
                {/* First card (larger) */}
                {filteredNewsData[0] && (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCardClick(filteredNewsData[0].slug);
                        }}
                        style={{
                            flex: "2",
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            backgroundColor: "#fff",
                            height: "450px",
                            textDecoration: "none",
                            color: "inherit",
                            position: "relative", // Needed for overlay positioning
                        }}
                    >
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            {/* Overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    right: "0",
                                    bottom: "0",
                                    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent dark overlay
                                    zIndex: "1", // Overlay behind text but in front of image
                                }}
                            ></div>

                            <img
                                src={filteredNewsData[0].image || "https://via.placeholder.com/600x400"}
                                alt={filteredNewsData[0].title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "20px",
                                    left: "20px",
                                    color: "#fff",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    zIndex: "2", // Ensure text appears above the overlay
                                }}
                            >
                                <h2 style={{ fontSize: "18px", margin: "0" }}>
                                    {filteredNewsData[0].title.length > 20
                                        ? `${filteredNewsData[0].title.slice(0, 99)}...`
                                        : filteredNewsData[0].title}
                                </h2>
                                <p style={{ fontSize: "14px", marginTop: "5px" }}>
                                    {filteredNewsData[0].description.replace(/<[^>]+>/g, "").slice(0, 350)}...
                                </p>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        marginTop: "10px",
                                        fontWeight: "bold",
                                        color: "#fff",
                                    }}
                                >
                                    <p>
                                        <span style={{ color: "red" }}>
                                            {filteredNewsData[0].writerName || "Unknown"}
                                        </span>
                                    </p>
                                    {/* Add the current date below writer's name */}
                                    <p style={{ fontSize: "12px", color: "#fff" }}>
                                        {currentDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                )}

                {/* Second and Third cards */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        flex: "1",
                    }}
                >
                    {filteredNewsData.slice(1).map((news, index) => (
                        <a
                            key={index}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleCardClick(news.slug);
                            }}
                            style={{
                                flex: "1",
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                backgroundColor: "#fff",
                                maxHeight: "300px",
                                height: "auto",
                                textDecoration: "none",
                                color: "inherit",
                                position: "relative", // Needed for overlay positioning
                            }}
                        >
                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                {/* Overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        right: "0",
                                        bottom: "0",
                                        backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent dark overlay
                                        zIndex: "1", // Overlay behind text but in front of image
                                    }}
                                ></div>

                                <img
                                    src={news.image || "https://via.placeholder.com/600x400"}
                                    alt={news.title}
                                    style={{
                                        width: "100%",
                                        height: "217px",
                                        objectFit: "cover",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        left: "10px",
                                        color: "#fff",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        zIndex: "2", // Ensure text appears above the overlay
                                    }}
                                >
                                    <h2 style={{ fontSize: "16px", margin: "0" }}>
                                        {news.title.length > 20
                                            ? `${news.title.slice(0, 50)}...`
                                            : news.title}
                                    </h2>
                                    <p style={{ fontSize: "12px", marginTop: "5px" }}>
                                        {news.description.replace(/<[^>]+>/g, "").slice(0, 200)}...
                                    </p>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "bold",
                                            color: "#fff",
                                        }}
                                    >
                                        <p>
                                            <span style={{ color: "red" }}>
                                                {news.writerName || "Unknown"}
                                            </span>
                                        </p>
                                        {/* Add the current date below writer's name */}
                                        <p style={{ fontSize: "12px", color: "#fff" }}>
                                            {currentDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CombinedNewsLayout;
