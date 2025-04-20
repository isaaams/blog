import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4">
      <div className="container">
        <div className="row">
          {/* Colonne À propos */}
          <div className="col-md-4 mb-4">
            <h4 className="text-warning">About Us</h4>
            <p className="text-secondary">
              Your trusted online shopping destination offering quality products and exceptional service.
            </p>
            <div className="text-white">
              <p>📞 +212693458885</p>
              <p>✉️ guiziahmed778@gmail.com</p>
            </div>
          </div>

          {/* Colonne Service Client */}
          <div className="col-md-4 mb-4">
            <h4 className="text-warning">Customer Service</h4>
            <ul className="list-unstyled">
              <li><a href="/shipping-policy" className="text-secondary text-decoration-none">Shipping Policy</a></li>
              <li><a href="/returns" className="text-secondary text-decoration-none">Returns & Exchanges</a></li>
              <li><a href="/faq" className="text-secondary text-decoration-none">FAQ</a></li>
              <li><a href="/contact" className="text-secondary text-decoration-none">Contact Us</a></li>
              <li><a href="/privacy-policy" className="text-secondary text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Colonne Newsletter */}
          <div className="col-md-4 mb-4">
            <h4 className="text-warning">Stay Connected</h4>
            <div className="mb-3">
              <p className="text-secondary">Subscribe for updates and special offers!</p>
              <form className="d-flex gap-2">
                <input 
                  type="email" 
                  className="form-control"
                  placeholder="Enter your email" 
                  required 
                />
                <button type="submit" className="btn btn-warning">Subscribe</button>
              </form>
            </div>
            
            <div className="d-flex gap-3 mb-3">
              <a href="https://www.facebook.com/profile.php?id=100084957827223" className="text-warning"><FaFacebook size={24} /></a>
              <a href="#" className="text-warning"><FaInstagram size={24} /></a>
              <a href="#" className="text-warning"><FaTwitter size={24} /></a>
            </div>

            <div className="d-flex gap-3 text-muted">
              <FaCcVisa size={32} />
              <FaCcMastercard size={32} />
              <FaPaypal size={32} />
            </div>
          </div>
        </div>

        <div className="text-center py-3 border-top border-secondary mt-4">
          <p className="mb-0 text-muted">
            © {new Date().getFullYear()} YourStoreName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;