
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold">VN</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-brand-green to-brand-yellow bg-clip-text text-transparent">
                VitaNature
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              VitaNature est votre partenaire de confiance pour des compléments alimentaires naturels et efficaces. Notre mission est d'améliorer votre bien-être au quotidien.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/perte-de-poids" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Perte de poids
                </Link>
              </li>
              <li>
                <Link to="/categories/anti-age" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Anti-âge
                </Link>
              </li>
              <li>
                <Link to="/categories/detox" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Détox
                </Link>
              </li>
              <li>
                <Link to="/categories/energie" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Énergie
                </Link>
              </li>
              <li>
                <Link to="/categories/beaute" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Beauté
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-brand-green mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">123 Avenue de la Santé, Dakar, Sénégal</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-brand-green mr-2" />
                <span className="text-gray-600 text-sm">+221 76 000 00 00</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-brand-green mr-2" />
                <span className="text-gray-600 text-sm">contact@vitanature.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} VitaNature. Tous droits réservés.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-brand-green transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-brand-green transition-colors text-sm">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
