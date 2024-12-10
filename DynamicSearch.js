import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get("query");
    setQuery(queryParam);
  }, [location]);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);

      const fetchResults = async () => {
        try {
          const response = await axios.get(
            "https://frequencebonheur.fr/admin/api/search/news",
            {
              params: { value: query },
            }
          );
          setResults(response.data.news || []);
          console.log("search", response.data.news);
        } catch (error) {
          console.error(error);
          setError("An error occurred while fetching search results");
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  const truncateDescription = (htmlString, maxLength) => {
    const plainText = htmlString.replace(/<[^>]+>/g, ""); // Strip HTML tags
    return plainText.length > maxLength
      ? `${plainText.substring(0, maxLength)}...`
      : plainText;
  };

  const handleCardClick = (slug) => {
    navigate(`/${slug}`);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        <h3>Search Results for "{query}"</h3>
        <div style={styles.gridContainer}>
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item._id}
                style={styles.card}
                onClick={() => handleCardClick(item.slug)}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.image}
                  />
                )}
                <div style={styles.cardContent}>
                  <h5 style={styles.title}>{item.title}</h5>
                  <p style={styles.description}>
                    {truncateDescription(item.description, 100)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  cardContent: {
    padding: "16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
};

export default SearchForm;
