import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";


export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="Nature Spicy" className="h-16" />
            <p className="text-sm">
              Bringing the finest spices and natural products from Kerala to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate("/shop/home")} className="hover:text-white">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/shop/listing")} className="hover:text-white">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-white">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contactForm")} className="hover:text-white">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/privacy-policy")} className="hover:text-white">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@naturespicy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Idukki, Kerala, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Nature Spicy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
