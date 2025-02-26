import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FolderRoot as Football,
  Box as Boxing,
  Tent as Tennis,
  ShoppingBasket as Basketball,
  Dumbbell as Wrestling,
  FileWarning as Running,
} from 'lucide-react';
import { cn } from '../lib/utils';

const sports = [
  { 
    id: 'football',
    name: 'Football',
    description: 'Master the beautiful game with our specialized training programs designed for all skill levels. Improve your ball control, passing accuracy, and tactical awareness.',
    icon: Football,
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      "https://media.istockphoto.com/id/2148699487/photo/close-up-on-legs-of-professional-football-player-dribbling-with-a-ball-during-international.jpg?s=2048x2048&w=is&k=20&c=R5vCh6fQ9zeccajH0Wa5bzcZuo3cMcnSBo4T4muWF7k=",
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80"
    ]
  },
  {
    id: 'mma',
    name: 'MMA',
    description: 'Train in mixed martial arts with our comprehensive programs covering striking, grappling, and ground techniques. Build strength, agility, and mental toughness.',
    icon: Boxing,
    images: [
      "https://images.unsplash.com/photo-1615117972428-28de67cda58e?w=800&q=80",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80",
      "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&q=80"
    ]
  },
  {
    id: 'tennis',
    name: 'Tennis',
    description: 'Perfect your serve, backhand, and forehand with our tennis training programs. Develop court awareness, footwork, and match strategy for competitive play.',
    icon: Tennis,
    images: [
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1666913667082-c1fecc45275d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    description: 'Elevate your basketball skills with our specialized training. Focus on shooting, dribbling, defense, and team play to become a complete player on the court.',
    icon: Basketball,
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
      "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&q=80"
    ]
  },
  {
    id: 'wrestling',
    name: 'Wrestling',
    description: 'Master the art of wrestling with our intensive training programs. Build strength, learn takedown techniques, and develop the mental toughness needed to excel.',
    icon: Wrestling,
    images: [
      "https://plus.unsplash.com/premium_photo-1664304747805-24b97bddf900?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1611338631743-b0362363f417?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1576149146095-caa19d4de102?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: 'athletics',
    name: 'Athletics',
    description: 'Enhance your running, jumping, and throwing abilities with our athletics training. Improve your technique, speed, and endurance for track and field events.',
    icon: Running,
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
      "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80"
    ]
  }
];

export function SportsSelection() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = React.useState<string | null>(null);

  const handleSelectSport = (sportId: string) => {
    setSelectedSport(sportId);
    // Smooth scroll to the sport section
    const element = document.getElementById(`sport-${sportId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartTraining = (sportId: string) => {
    navigate(`/training/${sportId}`);
  };

  // Star animation properties
  const generateStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 20,
      delay: Math.random() * 5
    }));
  };

  const stars = generateStars(100);

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden relative">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black opacity-80"></div>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-16 pb-8 text-center"
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          Choose Your Sport
        </h1>
        <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
          Select a sport below to explore our specialized training programs designed to elevate your performance
        </p>
        
        {/* Sport Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {sports.map((sport) => (
            <motion.button
              key={sport.id}
              whileHover={{ scale: 1.05, backgroundColor: '#164e63' }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-4 py-2 rounded-full flex items-center gap-2 transition-all',
                selectedSport === sport.id ? 'bg-cyan-700 text-white' : 'bg-gray-800 text-cyan-300'
              )}
              onClick={() => handleSelectSport(sport.id)}
            >
              <sport.icon className="h-4 w-4" />
              <span>{sport.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sport Sections */}
      <div className="relative z-10 pb-20">
        {sports.map((sport, index) => (
          <motion.section
            id={`sport-${sport.id}`}
            key={sport.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={cn(
              "py-16 px-8 relative",
              index % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/30"
            )}
          >
            <div className="max-w-7xl mx-auto">
              <div className={cn(
                "flex flex-col md:flex-row items-center gap-12",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                {/* Text Content */}
                <motion.div 
                  className="md:w-1/2"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="p-3 rounded-full bg-cyan-900/50"
                    >
                      <sport.icon className="h-8 w-8 text-cyan-400" />
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white">{sport.name}</h2>
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-8">
                    {sport.description}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold shadow-lg shadow-cyan-500/20"
                    onClick={() => handleStartTraining(sport.id)}
                  >
                    Start {sport.name} Training
                  </motion.button>
                </motion.div>
                
                {/* Images */}
                <motion.div 
                  className="md:w-1/2 grid grid-cols-2 gap-4"
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div 
                    className="col-span-2 aspect-video rounded-xl overflow-hidden shadow-xl shadow-cyan-900/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={sport.images[0]} 
                      alt={`${sport.name} training`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    className="aspect-square rounded-xl overflow-hidden shadow-xl shadow-cyan-900/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={sport.images[1]} 
                      alt={`${sport.name} training`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    className="aspect-square rounded-xl overflow-hidden shadow-xl shadow-cyan-900/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={sport.images[2]} 
                      alt={`${sport.name} training`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}