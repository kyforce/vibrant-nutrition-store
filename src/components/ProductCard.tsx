
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
    >
      <div className={`product-image-container bg-brand-light-${product.color === "black" ? "yellow" : product.color}`}>
        <div className={`color-indicator ${product.colorClass}`}></div>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
            aria-label="Ajouter aux favoris"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link to={`/products/${product.id}`}>
              <h3 className="font-semibold text-lg hover:text-brand-green transition-colors duration-200">
                {product.name}
              </h3>
            </Link>
            <span className="text-xs font-medium text-muted-foreground">
              {product.category}
            </span>
          </div>
          <div className="text-lg font-bold text-brand-green">
            {formatPrice(product.price)}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <Link 
            to={`/products/${product.id}`}
            className="text-sm font-medium text-brand-green hover:underline"
          >
            Voir détails
          </Link>
          
          <button
            onClick={() => addItem(product, 1)}
            className="btn-hover flex items-center space-x-1 bg-brand-green text-white px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
