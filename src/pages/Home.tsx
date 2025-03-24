
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Leaf, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          observerRef.current?.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-light-yellow to-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              <div className="inline-block px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-brand-green mb-6">
                Compléments alimentaires naturels
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Révélez votre potentiel avec nos solutions{" "}
                <span className="bg-gradient-to-r from-brand-green to-brand-yellow bg-clip-text text-transparent">
                  naturelles
                </span>
              </h1>
              <p className="text-gray-700 mb-8">
                Découvrez notre gamme de compléments alimentaires conçus pour
                améliorer votre santé et votre bien-être quotidien. Des
                ingrédients de qualité, scientifiquement validés.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="btn-hover bg-brand-green text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
                >
                  Découvrir nos produits
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  to="/categories"
                  className="btn-hover bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium"
                >
                  Voir les catégories
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex justify-center"
            >
              <div className="relative">
                <motion.img
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                  src={products[0].image}
                  alt="Produit vedette"
                  className="h-[450px] object-contain z-20 relative"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-light-green rounded-full filter blur-xl opacity-70 z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-section">
            <h2 className="text-3xl font-bold mb-4">
              Pourquoi choisir nos produits
            </h2>
            <p className="text-gray-600">
              Nous nous engageons à fournir des compléments alimentaires de la
              plus haute qualité pour améliorer votre bien-être quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-brand-green" />,
                title: "Qualité garantie",
                description:
                  "Tous nos produits sont fabriqués selon les normes les plus strictes avec des ingrédients de premier choix."
              },
              {
                icon: <Leaf className="w-8 h-8 text-brand-green" />,
                title: "100% Naturel",
                description:
                  "Nous utilisons des ingrédients naturels, sans additifs chimiques nocifs pour votre santé."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-brand-green" />,
                title: "Efficacité prouvée",
                description:
                  "Nos formules sont développées par des experts et soutenues par des études scientifiques."
              },
              {
                icon: <Award className="w-8 h-8 text-brand-green" />,
                title: "Certifié",
                description:
                  "Nos produits sont certifiés conformes aux normes internationales de qualité et de sécurité."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-brand-light-green w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10 fade-in-section">
            <h2 className="text-3xl font-bold">Produits populaires</h2>
            <Link
              to="/products"
              className="text-brand-green font-medium flex items-center hover:underline"
            >
              Voir tous les produits
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-10"></div>
            <div className="relative z-10 max-w-xl fade-in-section">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à améliorer votre santé ?
              </h2>
              <p className="text-gray-700 mb-8">
                Rejoignez des milliers de clients satisfaits qui ont transformé
                leur bien-être grâce à nos compléments alimentaires naturels.
              </p>
              <Link
                to="/products"
                className="btn-hover bg-brand-green text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
              >
                Commencez maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
