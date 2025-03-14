"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const featureCardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { type: 'spring', stiffness: 300 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <motion.div 
        className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
        </div>
        
        <motion.h1 
          className="mb-4 text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          variants={itemVariants}
        >
          Sneaker Collect Plus
        </motion.h1>
        
        <motion.p 
          className="mb-8 max-w-2xl text-xl text-muted-foreground"
          variants={itemVariants}
        >
          Track and organize your sneaker collection with ease. Add, view, and manage your sneakers all in one place.
        </motion.p>
        
        <motion.div 
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          variants={itemVariants}
        >
          <Link href="/dashboard">
            <Button size="lg" className="min-w-40 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/collection">
            <Button size="lg" variant="outline" className="min-w-40 border-primary/20 hover:bg-primary/5">
              View Collection
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-4"
          variants={itemVariants}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* StockX link removed */}
        </motion.div>
        
        {/* Sneaker Silhouettes */}
        <div className="absolute -z-10 opacity-10 w-full h-full">
          <div className="absolute top-10 left-10 rotate-12">👟</div>
          <div className="absolute top-20 right-20 -rotate-12">👟</div>
          <div className="absolute bottom-20 left-1/4 rotate-45">👟</div>
          <div className="absolute bottom-10 right-1/4 -rotate-45">👟</div>
        </div>
      </motion.div>
      
      {/* Features Section */}
      <div className="py-16 px-6 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Everything You Need For Your Collection
          </motion.h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div 
              className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden relative"
              variants={featureCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -z-10"></div>
              <h2 className="mb-2 text-xl font-semibold flex items-center">
                <span className="text-2xl mr-2">📊</span> Track Your Collection
              </h2>
              <p className="text-muted-foreground">
                Keep a detailed record of all your sneakers with images, purchase info, and condition. Never lose track of your investments.
              </p>
              <div className="mt-4">
                <Link href="/collection">
                  <Button variant="ghost" size="sm" className="text-primary">
                    Explore Collection →
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden relative"
              variants={featureCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-bl-full -z-10"></div>
              <h2 className="mb-2 text-xl font-semibold flex items-center">
                <span className="text-2xl mr-2">🔖</span> Manage Your Wishlist
              </h2>
              <p className="text-muted-foreground">
                Keep track of sneakers you want to add to your collection in the future. Plan your next purchases with ease.
              </p>
              <div className="mt-4">
                <Link href="/wishlist">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View Wishlist →
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden relative"
              variants={featureCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -z-10"></div>
              <h2 className="mb-2 text-xl font-semibold flex items-center">
                <span className="text-2xl mr-2">📈</span> View Analytics
              </h2>
              <p className="text-muted-foreground">
                Get insights about your collection value, brand distribution, and more. Understand the true worth of your collection.
              </p>
              <div className="mt-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-primary">
                    See Analytics →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Testimonial/Stats Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-card rounded-xl p-8 shadow-lg border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary">85+</h3>
                <p className="text-muted-foreground mt-2">Sneakers in Database</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary">10+</h3>
                <p className="text-muted-foreground mt-2">Brands Supported</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary">100%</h3>
                <p className="text-muted-foreground mt-2">Collection Organized</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action */}
      <motion.div 
        className="py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to organize your collection?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of sneaker enthusiasts who use Sneaker Collect Plus to manage their collections.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
            Get Started Now
          </Button>
        </Link>
      </motion.div>
    </div>
  );
} 