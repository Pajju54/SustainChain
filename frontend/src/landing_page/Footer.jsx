import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container p-5 border-top">
        <div className="row p-5">
          <div className="col">
            <img
              src="media/images/SustainChain_logo.png"
              alt="Company Logo"
              style={{ width: "50%" }}
            />
            <p className="text-muted mt-2 p-1">&copy; 2024, SustainChain. All rights reserved.</p>
          </div>
          <div className="col linkStyle">
            <p>Company</p>
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>About Us</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Our Mission</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Sustainability Goals</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Transparency</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Partners</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Blog</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Media</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Community</a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Contact Us</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Help Center</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>FAQs</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Terms of Service</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Privacy Policy</a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Create an Account</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Login</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Admin Dashboard</a>
            <br />
          </div>
        </div>

        <div
          className="mt-2 text-small text-muted p-5"
          style={{ fontSize: "small" }}
        >
          <p>
            SustainChain is committed to fostering ethical supply chains by promoting transparency and accountability among manufacturers. Our platform aims to connect consumers and businesses with responsible producers worldwide.
          </p>

          <p>
            Please ensure to verify sustainability information and follow best practices for ethical sourcing.
          </p>

          <p>
            For any assistance, reach out to our support team at support@sustainchain.com.
          </p>

          <p>
            "Empowering ethical choices and building trust—one supply chain at a time."
          </p>

          <p>
            © 2024 SustainChain. All rights reserved. By using our platform, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
