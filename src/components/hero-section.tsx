import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const athletes = [
  {
    name: 'Football Player',
    image: 'https://appinsports.com/wp-content/uploads/2021/04/jeffrey-f-lin-XUsMIX04wvc-unsplash-scaled.jpg',
  },
  {
    name: 'MMA Fighter',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Basketball Player',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
  },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % athletes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 backdrop-blur-md">
        <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          FitForAll
        </div>
        <div className="flex space-x-4">
          <button className="text-white" onClick={() => navigate('/')}>Home</button>
          <button className="text-white" onClick={() => navigate('/about')}>About</button>
          <button className="text-white" onClick={() => navigate('/services')}>Services</button>
          <button className="text-white" onClick={() => navigate('/contact')}>Contact</button>
        </div>
      </nav>

      {athletes.map((athlete, index) => (
        <motion.div
          key={athlete.name}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${athlete.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-bold text-white md:text-7xl"
          >
            Transform Your Game
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-xl text-gray-200"
          >
            Professional training programs tailored to your sport
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/sports')}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-opacity-90"
          >
            Get Started
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}