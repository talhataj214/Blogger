import React, { useEffect, useState } from "react";

function FetchNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://frequencebonheur.fr/admin/api/latest/news");
        const data = await response.json();
        setNewsData(data.news);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h3
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "36px",
            fontWeight: "bold",
            color: "grey",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
            paddingBottom: "10px",
            paddingTop: "30px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Favourite News
        </h3>
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "inline-block",
              animation: newsData.length > 0 ? "marquee 15s linear infinite" : "none",
              whiteSpace: "nowrap",
            }}
          >
            {newsData.length === 0 ? (
              <div style={{ display: "inline-block", padding: "10px" }}>
                <p>Loading news...</p>
              </div>
            ) : (
              newsData.concat(newsData).map((newsItem) => (
                <div
                  key={newsItem._id}
                  style={{
                    display: "inline-block",
                    width: "250px", // Card width
                    margin: "10px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <a href={`/${newsItem.slug}`} style={{ textDecoration: "none" }}>
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      style={{
                        width: "100%",
                        height: "150px", // Reduced image height
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        color: "#333",
                      }}
                    >
                      <h6
                        style={{
                          fontSize: "14px", // Smaller font size
                          fontWeight: "bold",
                          margin: "0",
                          lineHeight: "1.4",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {newsItem.title.length > 50
                          ? `${newsItem.title.slice(0, 50)}...`
                          : newsItem.title}
                      </h6>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
}

export default FetchNews;
