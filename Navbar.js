import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]); // Start with an empty array
    const [hoveredLink, setHoveredLink] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
    const [selectedLink, setSelectedLink] = useState(null); // Track the selected link
    const navigate = useNavigate(); // For navigation to the search results page

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://frequencebonheur.fr/admin/api/category/all');
                const data = await response.json();
                console.log("Fetched categories:", data); // Check if categories are correct
                if (data.categories && Array.isArray(data.categories)) {
                    setCategories(data.categories); // Set categories from the correct field
                } else {
                    console.error("Invalid data format:", data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Use navigate to pass the query parameter in the URL
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            console.log('value', searchQuery);
            setSearchQuery(''); // Clear the search query after submission
        } else {
            alert("Veuillez saisir une requête de recherche."); // Notify user about empty search
        }
    };

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName); // Set the clicked link as selected
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                {/* Logo */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img
                        src="/download.png"
                        alt="Company Logo"
                        style={{ height: "40px" }}
                    />
                </Link>

                {/* Hamburger Menu */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Desktop & Mobile Menu */}
                <div
                    className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                                onMouseEnter={() => setHoveredLink('home')}
                                onMouseLeave={() => setHoveredLink(null)}
                                onClick={() => handleLinkClick('home')} // Set the link as selected
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: selectedLink === 'home' ? 'lightgrey' : hoveredLink === 'home' ? 'lightgrey' : 'black',
                                    textDecoration: 'none',
                                    pointerEvents: selectedLink === 'home' ? 'none' : 'auto', // Disable click if selected
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/news"
                                className="nav-link"
                                onMouseEnter={() => setHoveredLink('news')}
                                onMouseLeave={() => setHoveredLink(null)}
                                onClick={() => handleLinkClick('news')} // Set the link as selected
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: selectedLink === 'news' ? 'lightgrey' : hoveredLink === 'news' ? 'lightgrey' : 'black',
                                    textDecoration: 'none',
                                    pointerEvents: selectedLink === 'news' ? 'none' : 'auto', // Disable click if selected
                                }}
                            >
                                News
                            </Link>
                        </li>

                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <li key={index} className="nav-item">
                                    <Link
                                        to={`/category/${category.category}`} // Pass category name in the URL
                                        className="nav-link"
                                        onMouseEnter={() => setHoveredLink(category.category)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                        onClick={() => handleLinkClick(category.category)} // Set the link as selected
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            color: selectedLink === category.category ? 'lightgrey' : hoveredLink === category.category ? 'lightgrey' : 'black',
                                            textDecoration: 'none',
                                            pointerEvents: selectedLink === category.category ? 'none' : 'auto', // Disable click if selected
                                        }}
                                    >
                                        {category.category}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="nav-item">
                                <span className="nav-link">Loading...</span>
                            </li>
                        )}
                    </ul>

                    {/* Search Bar */}
                    <form className="d-flex align-items-center" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-secondary" type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
