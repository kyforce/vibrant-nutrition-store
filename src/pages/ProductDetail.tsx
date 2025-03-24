
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Minus, Plus, Star, Check } from "lucide-react";
import { getProductById, getProductsByCategory, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products from the same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate("/products");
      }
    }
  }, [id, navigate]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-green">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-green">
            Produits
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-brand-light-${product.color === "black" ? "yellow" : product.color} rounded-2xl p-8 flex items-center justify-center relative overflow-hidden`}
          >
            <div className={`color-indicator ${product.colorClass}`}></div>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={product.image}
              alt={product.name}
              className="max-h-[500px] object-contain mix-blend-multiply"
            />
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              {product.category}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center text-sm text-gray-600 hover:text-brand-green mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour aux produits
            </Link>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">4.0 (24 avis)</span>
            </div>

            <p className="text-xl font-bold text-brand-green mb-4">
              {formatPrice(product.price)}
            </p>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Caractéristiques:
              </div>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Dosage recommandé:
              </div>
              <p className="text-gray-600">{product.dosage}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="mr-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg w-32">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-full text-center border-0 focus:ring-0"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilité
                  </div>
                  {product.stock > 0 ? (
                    <span className="text-brand-green flex items-center">
                      <Check size={16} className="mr-1" /> En stock ({product.stock})
                    </span>
                  ) : (
                    <span className="text-red-500">Rupture de stock</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => addItem(product, quantity)}
                className="btn-hover w-full bg-brand-green text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2" size={20} />
                Ajouter au panier
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex flex-wrap -mb-px">
              <button
                onClick={() => setActiveTab("description")}
                className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "description"
                    ? "text-brand-green border-brand-green"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "ingredients"
                    ? "text-brand-green border-brand-green"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Ingrédients
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 text-sm font-medium border-b-2 ${
                  activeTab === "reviews"
                    ? "text-brand-green border-brand-green"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Avis (24)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            {activeTab === "description" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">À propos de {product.name}</h3>
                <p className="text-gray-700 mb-4">
                  {product.description}
                </p>
                <p className="text-gray-700">
                  Nos produits sont fabriqués dans des installations certifiées selon les normes de qualité les plus élevées. Chaque lot est soumis à des tests rigoureux pour garantir la pureté, la puissance et l'efficacité.
                </p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Ingrédients</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Avis des clients</h3>
                <p className="text-gray-500 italic">
                  Les avis seront disponibles prochainement.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
