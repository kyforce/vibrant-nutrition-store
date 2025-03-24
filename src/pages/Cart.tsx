
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Cart: React.FC = () => {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Votre Panier</h1>
          <Link
            to="/products"
            className="text-brand-green hover:underline flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Continuer les achats
          </Link>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="mx-auto w-20 h-20 text-gray-300 mb-4">
              <ShoppingBag size={80} />
            </div>
            <h2 className="text-xl font-semibold mb-4">Votre panier est vide</h2>
            <p className="text-gray-500 mb-8">
              Vous n'avez pas encore ajouté de produits à votre panier.
            </p>
            <Link
              to="/products"
              className="btn-hover inline-block bg-brand-green text-white px-6 py-3 rounded-lg font-medium"
            >
              Découvrir nos produits
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 w-24 h-24 sm:w-20 sm:h-20 bg-gray-50 rounded-lg p-2 mr-4 mb-4 sm:mb-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                          <Link
                            to={`/products/${item.product.id}`}
                            className="font-medium hover:text-brand-green"
                          >
                            {item.product.name}
                          </Link>
                          <span className="font-semibold text-brand-green">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="flex items-center mt-2 sm:mt-0">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-l-md text-gray-500 hover:bg-gray-50"
                            >
                              <Minus size={14} />
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-200">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-r-md text-gray-500 hover:bg-gray-50"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors mt-2 sm:mt-0"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-100">
                  <button
                    onClick={clearCart}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frais de livraison</span>
                    <span>Gratuit</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-brand-green">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button className="btn-hover w-full bg-brand-green text-white py-3 rounded-lg font-medium">
                  Procéder au paiement
                </button>

                <div className="mt-6 text-xs text-gray-500">
                  <p>
                    En passant votre commande, vous acceptez nos{" "}
                    <Link to="/terms" className="text-brand-green hover:underline">
                      conditions d'utilisation
                    </Link>{" "}
                    et notre{" "}
                    <Link to="/privacy" className="text-brand-green hover:underline">
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
