import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Dumbbell,
  Target,
  Brain,
  Trophy,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Star,
  ChevronDown,
  Users,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import ChatbotWidget from './ChatbotWidget';

/* --------------------------------------------------
   Example Data (Enhanced)
-------------------------------------------------- */
const athletes = [
  {
    name: 'Elite Training',
    image:
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=2000&q=80',
    quote: 'Push beyond your limits, achieve the extraordinary'
  },
  {
    name: 'High Performance',
    image:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=2000&q=80',
    quote: 'Every champion was once a contender that refused to give up'
  },
  {
    name: 'Team Sports',
    image:
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=2000&q=80',
    quote: 'Together we achieve more, united we conquer'
  },
  {
    name: 'Boxing',
    image:
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=2000&q=80',
    quote: 'The fight is won or lost far away from witnesses'
  },
  {
    name: 'Running',
    image:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=2000&q=80',
    quote: 'Your only limit is you'
  },
  {
    name: 'Strength Training',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80',
    quote: 'Strength does not come from the body. It comes from the will'
  },
  {
    name: 'Basketball',
    image:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=2000&q=80',
    quote: 'Excellence is not a singular act, but a habit'
  },
  {
    name: 'Olympic Training',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=80',
    quote: 'Champions are made from something deep inside'
  }
];

const featureDetails = [
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: 'Personalized Training',
    description: 'Custom programs designed for your specific goals and sport',
    longDescription:
      'Experience training like never before with our AI-powered personalized programs. We analyze your current fitness level, goals, and sport-specific requirements to create a tailored training regimen that evolves with you. Our adaptive system adjusts your workouts based on your progress, ensuring optimal results.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2070&q=80',
    benefits: [
      'Custom workout plans',
      'Real-time adjustments',
      'Sport-specific training',
      'Progress tracking'
    ]
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Goal Tracking',
    description: 'Monitor your progress with advanced metrics and analytics',
    longDescription:
      'Stay motivated and informed with our comprehensive goal tracking system. Watch your progress unfold through detailed analytics, performance metrics, and visual progress indicators. Set both short-term and long-term goals while our intelligent system helps you stay on track.',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2070&q=80',
    benefits: [
      'Visual progress tracking',
      'Performance analytics',
      'Milestone celebrations',
      'Adaptive goal setting'
    ]
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'Mental Conditioning',
    description: 'Develop the mindset of a champion',
    longDescription:
      'Success in sports is as much mental as it is physical. Our mental conditioning program helps you develop the psychological resilience and focus needed to perform at your peak. Learn techniques used by elite athletes to overcome challenges and maintain composure under pressure.',
    image:
      'https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=2070&q=80',
    benefits: [
      'Stress management',
      'Focus enhancement',
      'Confidence building',
      'Performance visualization'
    ]
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Competition Ready',
    description: 'Prepare for peak performance when it matters most',
    longDescription:
      "When competition day arrives, be confident that you're prepared to perform at your absolute best. Our competition preparation program covers everything from nutrition timing to warm-up routines, ensuring you're physically and mentally ready to excel when it counts.",
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2070&q=80',
    benefits: [
      'Peak performance timing',
      'Competition strategies',
      'Recovery optimization',
      'Pre-event preparation'
    ]
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Michael Johnson",
    sport: "Professional Basketball",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80",
    quote: "Elite Sports transformed my game completely. Their personalized training program helped me increase my vertical jump by 4 inches in just 3 months!"
  },
  {
    name: "Sarah Williams",
    sport: "Olympic Swimmer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    quote: "The mental conditioning program was a game-changer for me. I've never been more focused during competitions. Highly recommend!"
  },
  {
    name: "David Chen",
    sport: "MMA Fighter",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    quote: "From strength training to recovery protocols, Elite Sports covers it all. My performance has improved dramatically since I started their program."
  }
];

// Stats data
const stats = [
  { value: "10,000+", label: "Athletes Trained", icon: <Users className="h-6 w-6 text-cyan-400" /> },
  { value: "95%", label: "Success Rate", icon: <Star className="h-6 w-6 text-cyan-400" /> },
  { value: "24/7", label: "Support Available", icon: <Clock className="h-6 w-6 text-cyan-400" /> }
];

/* --------------------------------------------------
   ContactForm Component (Enhanced)
-------------------------------------------------- */
const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-6"
              >
                <Send className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
              <p className="text-gray-300 max-w-md">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Ready to transform your athletic performance? Contact us today and let's discuss how we can help you achieve your goals.
                </p>
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center text-gray-200 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span>contact@elitesports.com</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-gray-200 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-gray-200 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span>123 Fitness Street, Gym City, SP 12345</span>
                  </motion.div>
                </div>
              </motion.div>
              <div>
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  action="https://submit-form.com/lznDoWOmT"
                  method="POST"
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full px-5 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all group-hover:border-cyan-400"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full px-5 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all group-hover:border-cyan-400"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all group-hover:border-cyan-400"
                      required
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send className="h-5 w-5" />
                    </span>
                  </motion.button>
                </motion.form>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* --------------------------------------------------
   TestimonialCard Component (New)
-------------------------------------------------- */
const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-md opacity-70" />
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="relative w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
          <p className="text-cyan-400">{testimonial.sport}</p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-2 -left-2 text-4xl text-cyan-500 opacity-30">"</div>
        <p className="text-gray-300 italic relative z-10 pl-4">{testimonial.quote}</p>
        <div className="absolute -bottom-4 -right-2 text-4xl text-cyan-500 opacity-30">"</div>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------
   StatCard Component (New)
-------------------------------------------------- */
const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col items-center text-center"
    >
      <div className="mb-3">{stat.icon}</div>
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
        {stat.value}
      </h3>
      <p className="text-gray-400">{stat.label}</p>
    </motion.div>
  );
};

/* --------------------------------------------------
   FeatureSection Component (Enhanced)
-------------------------------------------------- */
const FeatureSection = ({
  feature,
  index
}: {
  feature: typeof featureDetails[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            isEven ? '' : 'lg:flex-row-reverse'
          }`}
        >
          <div className={`space-y-8 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
            <motion.div 
              className="flex items-center gap-4 text-cyan-400"
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {feature.title}
              </h3>
            </motion.div>
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {feature.longDescription}
            </motion.p>
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-2xl font-semibold text-white">
                Key Benefits:
              </h4>
              <ul className="space-y-4">
                {feature.benefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    className="flex items-center gap-3 text-gray-300 group"
                  >
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:scale-125 transition-all duration-300" />
                    <span className="group-hover:text-cyan-400 transition-colors duration-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative group ${
              isEven ? 'lg:order-last' : 'lg:order-first'
            }`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-30 transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-30'}`} />
            <motion.div
              animate={{ 
                y: isHovered ? -10 : 0,
                scale: isHovered ? 1.02 : 1
              }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-gray-700"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-2xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-cyan-300">{feature.description}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------
   HeroSection Component (Enhanced)
-------------------------------------------------- */
export function HeroSection() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Slideshow and scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % athletes.length);
    }, 5000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

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

  const navbarStyle = {
    backgroundColor: scrollY > 100 ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none',
    borderBottom: scrollY > 100 ? '1px solid rgba(59, 130, 246, 0.2)' : 'none'
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />

        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"
              style={{ top: `${20 * (i + 1)}%` }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Navbar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 transition-all duration-500"
        style={navbarStyle}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold cursor-pointer flex items-center gap-3"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
        >
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          Elite Sports
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-8 items-center"
        >
          {[''].map((item, index) => (
            <motion.button
              key={item}
              className="text-white hover:text-cyan-400 transition-colors duration-300 text-lg font-medium relative group"
              onClick={() =>
                navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
              }
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
          ))}
          {/* Clerk SignInButton */}
          <SignedOut>
            <SignInButton mode="modal">
              <motion.button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Sign In
              </motion.button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <UserButton />
            </motion.div>
          </SignedIn>
        </motion.div>
      </motion.nav>

      {/* Background Slides with Enhanced Animation */}
      {athletes.map((athlete, index) => (
        <motion.div
          key={athlete.name}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.1
          }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 scale-110"
            style={{ 
              backgroundImage: `url(${athlete.image})`,
              animation: index === currentIndex ? 'slowZoom 10s infinite alternate' : 'none'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              y: index === currentIndex ? 0 : 20
            }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-32 left-10 text-white text-3xl font-light italic max-w-md"
          >
            <div className="relative">
              <motion.div
                className="absolute -top-6 -left-6 text-6xl text-cyan-500 opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "
              </motion.div>
              <p className="relative z-10">{athlete.quote}</p>
              <motion.div
                className="absolute -bottom-6 -right-6 text-6xl text-cyan-500 opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                "
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8 text-6xl font-bold text-white md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 leading-tight"
            >
              Transform Your Athletic Potential
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-10 text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Professional training programs tailored to elevate your performance and unlock your true capabilities
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
        <SignedOut>
        <SignInButton redirectUrl="/profile">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 rounded-xl
                       bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4
                       text-lg font-semibold text-white transition-all
                       hover:shadow-xl hover:shadow-cyan-500/30"
          >
            Get Started
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </SignInButton>
      </SignedOut>

      <SignedOut>
      <SignInButton redirectUrl="/profile">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="group relative inline-flex items-center gap-2 rounded-xl border-2 border-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-cyan-500/10"
              >
                Learn More
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              </SignInButton>
      </SignedOut>
            
            </motion.div>

            
            {/* Scroll indicator */}
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <p className="text-gray-400 mb-2">Scroll to explore</p>
                <ChevronDown className="h-6 w-6 text-cyan-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section (New) */}
        <div className="relative z-20 bg-black py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-20 bg-black">
          <div className="py-20 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
            >
              Why Choose Elite Sports?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16"
            >
              Our comprehensive approach to athletic development sets us apart from traditional training programs
            </motion.p>
          </div>
          {featureDetails.map((feature, index) => (
            <FeatureSection key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Testimonials Section (New) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative z-20 py-24 px-4 bg-black"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16"
          >
            Hear from athletes who have transformed their performance with our programs
          </motion.p>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative z-20 py-24 px-4 bg-gradient-to-b from-black to-gray-900"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16"
          >
            Ready to take your performance to the next level? Get in touch with our team today.
          </motion.p>
          <ContactForm />
        </motion.div>

        {/* Footer */}
        <footer className="relative z-20 bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                <Trophy className="h-6 w-6 text-cyan-500" />
                Elite Sports
              </div>
              <p className="text-sm">Transforming athletic potential since 2020</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Programs', 'About', 'Contact'].map(item => (
                  <li key={item}>
                    <a href={`/${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Programs</h4>
              <ul className="space-y-2">
                {['Strength Training', 'Speed & Agility', 'Recovery', 'Mental Conditioning'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map(item => (
                  <a 
                    key={item} 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all"
                  >
                    <span className="sr-only">{item}</span>
                    {/* Icon placeholder */}
                    <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2025 Elite Sports. All rights reserved.</p>
          </div>
        </footer>
      </div>
      
      {/* Render ChatbotWidget */}
      <ChatbotWidget />
    </div>
  );
}

export default HeroSection;