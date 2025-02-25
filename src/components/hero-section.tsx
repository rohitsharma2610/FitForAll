import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Dumbbell, Target, Brain, Trophy, ArrowRight, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const athletes = [
  {
    name: 'Football Player',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=2000&q=80',
    quote: "Push your limits on the field",
  }, 
  {
    name: 'MMA Fighter',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=2000&q=80',
    quote: "Victory is earned in training",
  },
  {
    name: 'Basketball Player',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=2000&q=80',
    quote: "Rise above the competition",
  },
  {
    name: 'Swimming',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=2000&q=80',
    quote: "Make waves in your journey",
  },
  {
    name: 'Track and Field',
    image: 'https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?auto=format&fit=crop&w=2000&q=80',
    quote: "Break records, set new standards",
  }
];

const featureDetails = [
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: "Personalized Training",
    description: "Custom programs designed for your specific goals and sport",
    longDescription: "Experience training like never before with our AI-powered personalized programs. We analyze your current fitness level, goals, and sport-specific requirements to create a tailored training regimen that evolves with you. Our adaptive system adjusts your workouts based on your progress, ensuring optimal results.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2070&q=80",
    benefits: [
      "Custom workout plans",
      "Real-time adjustments",
      "Sport-specific training",
      "Progress tracking"
    ]
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Goal Tracking",
    description: "Monitor your progress with advanced metrics and analytics",
    longDescription: "Stay motivated and informed with our comprehensive goal tracking system. Watch your progress unfold through detailed analytics, performance metrics, and visual progress indicators. Set both short-term and long-term goals while our intelligent system helps you stay on track.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2070&q=80",
    benefits: [
      "Visual progress tracking",
      "Performance analytics",
      "Milestone celebrations",
      "Adaptive goal setting"
    ]
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Mental Conditioning",
    description: "Develop the mindset of a champion",
    longDescription: "Success in sports is as much mental as it is physical. Our mental conditioning program helps you develop the psychological resilience and focus needed to perform at your peak. Learn techniques used by elite athletes to overcome challenges and maintain composure under pressure.",
    image: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=2070&q=80",
    benefits: [
      "Stress management",
      "Focus enhancement",
      "Confidence building",
      "Performance visualization"
    ]
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Competition Ready",
    description: "Prepare for peak performance when it matters most",
    longDescription: "When competition day arrives, be confident that you're prepared to perform at your absolute best. Our competition preparation program covers everything from nutrition timing to warm-up routines, ensuring you're physically and mentally ready to excel when it counts.",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=2070&q=80",
    benefits: [
      "Peak performance timing",
      "Competition strategies",
      "Recovery optimization",
      "Pre-event preparation"
    ]
  }
];

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
            <p className="text-gray-400 mb-8">
              Ready to transform your athletic performance? Contact us today and let's discuss how we can help you achieve your goals.
            </p>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-5 w-5 text-cyan-500 mr-3" />
                <span>contact@fitforall.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-5 w-5 text-cyan-500 mr-3" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-5 w-5 text-cyan-500 mr-3" />
                <span>123 Fitness Street, Gym City, SP 12345</span>
              </motion.div>
            </div>
          </motion.div>
          <div>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-cyan-500 mb-4"
                    >
                      <Send className="h-16 w-16 mx-auto" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-gray-400">We'll get back to you soon.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <motion.div whileHover={{ y: -2 }}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }}>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = ({ feature, index }: { feature: typeof featureDetails[0], index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          <div className={`space-y-6 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
            <div className="flex items-center gap-3 text-cyan-500">
              {feature.icon}
              <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {feature.longDescription}
            </p>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Key Benefits:</h4>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <div className="h-2 w-2 rounded-full bg-cyan-500" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative group ${isEven ? 'lg:order-last' : 'lg:order-first'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <img
              src={feature.image}
              alt={feature.title}
              className="relative rounded-xl w-full h-[400px] object-cover shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function HeroSection() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % athletes.length);
    }, 5000);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 transition-all duration-300 backdrop-blur-md bg-black/20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-cyan-500 text-3xl font-bold cursor-pointer flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <Trophy className="h-8 w-8" />
          FitForAll
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-6"
        >
          {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
            <button
              key={item}
              className="text-cyan-500 hover:text-white transition-colors duration-300 text-lg font-medium relative group"
              onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          ))}
        </motion.div>
      </nav>

      {athletes.map((athlete, index) => (
        <motion.div
          key={athlete.name}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${athlete.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: index === currentIndex ? 1 : 0, y: index === currentIndex ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-10 text-white text-2xl font-light italic"
          >
            "{athlete.quote}"
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 min-h-screen">
        <div className="h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6 text-6xl font-bold text-white md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              Transform Your Game
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8 text-2xl text-gray-200"
            >
              Professional training programs tailored to elevate your performance
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/sports')}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Get Started
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="group relative inline-flex items-center gap-2 rounded-full border-2 border-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-cyan-500/10"
              >
                Learn More
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 bg-black">
          <div className="py-20 px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-white mb-16"
            >
              Why Choose FitForAll?
            </motion.h2>
          </div>
          {featureDetails.map((feature, index) => (
            <FeatureSection key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative z-20 py-20 px-4 bg-black"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            Contact Us
          </motion.h2>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;