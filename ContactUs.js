import React, { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message Sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  };

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
          maxWidth: "600px",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
          borderRadius: "15px",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
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
            marginBottom: "10px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Feel free to reach out to us for any inquiries or assistance. Our team
          is here to help and will respond promptly.
        </p>

        {/* Contact Info */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="mail.jpg"
            alt="Email Icon"
            style={{
              width: "40px",
              height: "auto",
              marginRight: "10px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          />
          <h3 style={{ fontSize: "18px", color: "#2c3e50", fontWeight: "500" }}>
            admin@gmail.com
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 20px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 20px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            style={{
              width: "100%",
              padding: "12px 20px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              resize: "none",
              boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: "12px 25px",
              backgroundColor: "#6e8efb",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#5a7bc9")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#6e8efb")
            }
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
