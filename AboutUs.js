import React from "react";

const AboutUs = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(135deg, #6e8efb, #a777e3)", // Gradient background
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
          borderRadius: "20px", // Rounded corners for a smooth look
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)", // Box shadow for depth
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Circle */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "#6e8efb",
            borderRadius: "50%",
            zIndex: -1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        ></div>

        <h1
          style={{
            fontSize: "42px",
            color: "#2c3e50",
            fontWeight: "700",
            letterSpacing: "2px",
            marginBottom: "20px",
            fontFamily: "'Playfair Display', serif", // Elegant font family
          }}
        >
          About Us
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#555",
            marginBottom: "30px",
            fontFamily: "'Roboto', sans-serif", // Smooth and readable font
          }}
        >
          Welcome to our website! We are dedicated to providing the best services and solutions to our customers. Our team
          consists of passionate and experienced professionals who work tirelessly to meet your needs. Empowering innovation
          and delivering exceptional solutions to meet your needs.
        </p>

        <h2
          style={{
            fontSize: "26px",
            color: "#6e8efb",
            fontWeight: "600",
            marginBottom: "15px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Our Mission
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#555",
            marginBottom: "30px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Our mission is to create innovative solutions that help businesses grow and succeed in an ever-changing world. We
          strive to make a positive impact on the industries we serve.
        </p>

        <h2
          style={{
            fontSize: "26px",
            color: "#6e8efb",
            fontWeight: "600",
            marginBottom: "15px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Our Values
        </h2>
        <ul
          style={{
            listStyleType: "disc",
            marginLeft: "30px",
            fontSize: "18px",
            color: "#555",
            fontFamily: "'Roboto', sans-serif",
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          <li style={{ marginBottom: "15px" }}>
            <b>Integrity:</b> We uphold the highest standards of honesty and transparency.
          </li>
          <li style={{ marginBottom: "15px" }}>
            <b>Excellence:</b> We are committed to delivering exceptional results.
          </li>
          <li style={{ marginBottom: "15px" }}>
            <b>Collaboration:</b> We work together as a team to achieve our goals.
          </li>
        </ul>

        {/* <div
          style={{
            marginTop: "50px",
            padding: "20px",
            backgroundColor: "#6e8efb",
            borderRadius: "10px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            color: "#fff",
            fontSize: "18px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "600" }}>Contact Us</h2>
          <p>If you have any questions or would like to get in touch with us, feel free to reach out.</p>
          <p style={{ fontWeight: "bold" }}>
            Email: <a href="mailto:info@company.com" style={{ color: "#fff" }}>info@company.com</a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;
