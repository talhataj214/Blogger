import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Footer() {
  const [importantLinks, setImportantLinks] = useState([]);

  // Fetch important links from the API
  useEffect(() => {
    fetch("https://frequencebonheur.fr/admin/api/category/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.categories) {
          setImportantLinks(data.categories); // Update state with the categories array
        }
      })
      .catch((error) => console.error("Error fetching important links:", error));
  }, []);

  return (
    <div className="footer-container" style={styles.footerContainer}>
      <footer className="footer-wrapper" style={styles.footerWrapper}>
        <div className="footer-upper" style={styles.footerUpper}>
          <div className="footer-inner-container" style={styles.footerInnerContainer}>
            <div className="footer-row" style={styles.footerRow}>
              <div className="footer-column footer-about" style={styles.footerColumn}>
                <div className="footer-logo mb-4">
                  <Link to="/" aria-label="Go to Home">
                    <img
                      src="company.png"
                      alt="Company Logo"
                      className="footer-logo-img"
                      style={styles.footerLogoImg}
                    />
                  </Link>                </div>
                <p className="footer-description" style={styles.footerDescription}>
                  There are many variations of <br />
                  passages of Lorem Ipsum available,<br />
                  but the majority have suffered <br />
                  alteration in some form, by injected <br />
                  humour, or randomised words which <br />
                  don't look even slightly believable.
                </p>
              </div>
              <div className="footer-column footer-links" style={styles.footerColumn}>
                <div className="footer-widget-title" style={styles.footerWidgetTitle}>
                  <h3><i>News Link</i></h3>
                </div>
                <ul className="footer-link-list" style={styles.footerLinkList}>
                  {importantLinks.length > 0 ? (
                    importantLinks.map((link, index) => (
                      <li key={index}>
                        <a href="#" style={styles.footerLink}>
                          {link.category}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li style={{ color: "white" }}>Loading...</li>
                  )}
                </ul>
              </div>
              <div className="footer-column footer-tags" style={styles.footerColumn}>
                <div className="footer-widget-title" style={styles.footerWidgetTitle}>
                  <h3><i>Pages</i></h3>
                </div>
                <ul className="footer-tag-list" style={styles.footerTagList}>
                  <li><a href="/about-us" className="footer-tag" style={styles.footerTag}>About us</a></li>
                  <li><a href="/contact-us" className="footer-tag" style={styles.footerTag}>Contact us</a></li>
                </ul>
              </div>
              <div className="footer-column footer-social" style={styles.footerColumn}>
                <div className="footer-widget-title" style={styles.footerWidgetTitle}>
                  <h3><i>Social Media</i></h3>
                </div>
                <ul className="footer-social-list" style={styles.footerSocialList}>
                  <li><a href="/" style={styles.footerSocialLink}><img src="facebook.png" alt="Facebook" className="footer-social-icon" style={styles.footerSocialIcon} /> Facebook</a></li>
                  <li><a href="/" style={styles.footerSocialLink}><img src="twitter.png" alt="Twitter" className="footer-social-icon" style={styles.footerSocialIcon} /> Twitter</a></li>
                  <li><a href="/" style={styles.footerSocialLink}><img src="instagram.jpg" alt="Instagram" className="footer-social-icon" style={styles.footerSocialIcon} /> Instagram</a></li>
                  <li><a href="/" style={styles.footerSocialLink}><img src="youtube.png" alt="YouTube" className="footer-social-icon" style={styles.footerSocialIcon} /> YouTube</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-lower" style={styles.footerLower}>
          <div className="footer-inner-container" style={styles.footerInnerContainer}>
            <div className="footer-row" style={styles.footerRow}>
              <div className="footer-column footer-copyright" style={styles.footerColumn}>
                <p className="footer-copyright-text" style={styles.footerCopyrightText}>
                  Copyright © 2024
                  <a href="https://preview.themeforest.net/item/bloggar-news-magazine-react-template/full_screen_preview/43731729" className="footer-copyright-link" style={styles.footerCopyrightLink}> @Blogger.com™ </a>. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  footerContainer: {
    width: "100%",
    backgroundColor: "#2f2f2f",
  },
  footerWrapper: {
    color: "white",
  },
  footerInnerContainer: {
    width: "90%",
    margin: "0 auto",
  },
  footerRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  footerColumn: {
    padding: "10px",
    flex: 1,
  },
  footerLogoImg: {
    width: "140px",
    height: "auto",
    marginRight: "15px",
  },
  footerDescription: {
    fontSize: "14px",
    lineHeight: "1.8",
  },
  footerWidgetTitle: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  footerLinkList: {
    listStyle: "none",
    paddingLeft: "0",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
  },
  footerSocialList: {
    listStyle: "none",
    paddingLeft: "0",
  },
  footerSocialLink: {
    color: "white",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  footerSocialIcon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  footerLower: {
    padding: "10px 0",
    backgroundColor: "#1f1f1f",
    textAlign: "center",
  },
  footerCopyrightText: {
    fontSize: "14px",
    color: "white",
    margin: "0",
  },
  footerCopyrightLink: {
    color: "grey",
    textDecoration: "underline",
  },
};

export default Footer;
