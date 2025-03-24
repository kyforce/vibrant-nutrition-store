
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-brand-green/10 font-bold text-9xl">404</div>
          <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Veuillez vérifier l'URL ou retourner à la page d'accueil.
          </p>
          <Link
            to="/"
            className="btn-hover inline-flex items-center bg-brand-green text-white px-6 py-3 rounded-lg font-medium"
          >
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
