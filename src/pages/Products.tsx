
import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, getCategories } from "../data/products";

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const categories = getCategories();

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || 
        product.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory 
        ? product.category === selectedCategory 
        : true;
        
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Produits</h1>
          <p className="text-gray-600">
            Découvrez notre gamme complète de compléments alimentaires naturels, conçus pour améliorer votre santé et votre bien-être au quotidien.
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700 hover:text-brand-green md:hidden"
            >
              <Filter size={18} />
              <span>{showFilters ? "Masquer les filtres" : "Afficher les filtres"}</span>
            </button>
          </div>

          <div className={`md:flex space-y-4 md:space-y-0 md:space-x-2 ${showFilters ? "block" : "hidden md:flex"}`}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-brand-green text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-brand-green text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Aucun produit ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="text-brand-green font-medium hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
