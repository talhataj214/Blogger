import React, { useState, useEffect } from "react";

function NewsletterSection() {
  const [email, setEmail] = useState(""); // State for email input
  const [message, setMessage] = useState(""); // State for message display
  const [categories, setCategories] = useState([]); // State for API data

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://frequencebonheur.fr/admin/api/category/all');
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Store fetched categories
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run this effect once on mount

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
    } else {
      setMessage("Thank you for subscribing!");
      // You can send the email to an API here
      // Example: sendEmailToAPI(email);
    }

    setEmail(""); // Optionally reset the email field
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h3 className="newsletter-heading">Never miss any Update</h3>
        <p className="newsletter-description">
          Get the freshest headlines and updates sent uninterrupted to your inbox.
        </p>

        {/* Display categories dynamically */}
        <div className="categories-list">
          <h4>Loading categories...</h4>
          <ul>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id}>{category.name}</li> 
              ))
            ) : (
              <p></p>
            )}
          </ul>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter a valid email address"
            required
            className="newsletter-input"
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit" className="newsletter-button">
            Submit
          </button>
        </form>

        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </section>
  );
}

export default NewsletterSection;
