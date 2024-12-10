// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";

// function CategoryPage() {
//     const { categoryName } = useParams(); 
//     const [categoryData, setCategoryData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log("Category name:", categoryName);
//         const fetchCategoryData = async () => {
//             try {
//                 const response = await fetch(`https://frequencebonheur.fr/admin/api/category/news/${categoryName}`);
//                 const data = await response.json();
//                 console.log("Fetched category data:", data.news); // Log the fetched data to inspect the structure
//                 setCategoryData(data.news || []); // Ensure we set an empty array if no data is found
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching category data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchCategoryData();
//     }, [categoryName]);

//     const formatDescription = (description) => {
//         const strippedDescription = description.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
//         return strippedDescription.length > 250 
//             ? `${strippedDescription.substring(0, 250)}...` 
//             : strippedDescription;
//     };

//     return (
//         <div className="container my-5">

//             {loading ? (
//                 <p>Loading category data...</p>
//             ) : (
//                 <div className="row">
//                     {categoryData.length > 0 ? (
//                         categoryData.map((item, index) => (
//                             <div key={index} className="col-md-4 mb-4">
//                                 <Link to={`/news/${item.slug}`} className="text-decoration-none">
//                                     <div className="card">
//                                         <img
//                                             src={item.image}
//                                             alt={item.title}  // Assuming the 'title' field exists in the response
//                                             style={{
//                                                 width: "100%",
//                                                 height: "100%",
//                                                 objectFit: "cover",
//                                             }}
//                                         />
//                                         <div className="card-body">
//                                             <h5 className="card-title text-dark">
//                                                 {item.title || "No Title Available"}
//                                             </h5> {/* Set text color to black using Bootstrap's text-dark class */}
//                                             <p
//                                                 className="text-dark" // Set text color to black using Bootstrap's text-dark class
//                                                 style={{
//                                                     overflow: "hidden",
//                                                     display: "-webkit-box",
//                                                     WebkitLineClamp: 5,
//                                                     WebkitBoxOrient: "vertical",
//                                                     textOverflow: "ellipsis",
//                                                 }}
//                                             >
//                                                 {formatDescription(item.description || "No description available.")}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No items found for this category.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CategoryPage;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryPage() {
    const { categoryName } = useParams();
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 21;

    useEffect(() => {
        console.log("Category name:", categoryName);
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`https://frequencebonheur.fr/admin/api/category/news/${categoryName}`);
                const data = await response.json();
                console.log("Fetched category data:", data.news);

                // Sort the news items by date, assuming 'publishedAt' or 'createdAt' exists
                const sortedData = data.news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

                setCategoryData(sortedData || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching category data:", error);
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [categoryName]);

    const formatDescription = (description) => {
        const strippedDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
        return strippedDescription.length > 250
            ? `${strippedDescription.substring(0, 250)}...`
            : strippedDescription;
    };

    // Pagination logic
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = categoryData.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(categoryData.length / cardsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);  // Scroll to top when page changes
    };

    return (
        <div className="container my-5">
            <style>
                {`
                    .custom-card {
                        height: 350px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        border: none;
                        display: flex;
                        flex-direction: column;
                    }
                    .custom-card img {
                        height: 200px;
                        object-fit: cover;
                    }
                    .card-body {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .card-title {
                        font-size: 1.2rem;
                        margin-bottom: 10px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .card-text {
                        font-size: 1rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
                    }
                    .pagination {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        margin-top: 20px;
                    }
                    .pagination button {
                        padding: 5px 15px;
                        border: none;
                        border-radius: 5px;
                        background-color: black; 
                        color: white;
                        cursor: pointer;
                        transition: color 0.3s; 
                    }

                    .pagination button:hover {
                        color: red; 
                    }

                    .pagination button:disabled {
                        background-color: #cccccc; 
                        cursor: not-allowed;
                    }

                `}
            </style>

            {loading ? (
                <p>Loading category data...</p>
            ) : (
                <>
                    <div className="row">
                        {currentCards.length > 0 ? (
                            currentCards.map((item, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <Link to={`/${item.slug}`} className="text-decoration-none">
                                        <div className="card custom-card">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="card-img-top"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title text-dark">{item.title || "No Title Available"}</h5>
                                                <p className="card-text text-dark">{formatDescription(item.description || "No description available.")}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No items found for this category.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CategoryPage;






