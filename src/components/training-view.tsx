import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

import { 
  ChevronLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  Star,
  Trophy,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

// Define the chapter interface
interface Chapter {
  id: number;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  isLocked: boolean;
  isCompleted: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Define the sports data with chapters
const sportsData: Record<string, {
  name: string;
  description: string;
  chapters: Chapter[];
}> = {
  'football': {
    name: 'Football',
    description: 'Master the beautiful game with our specialized training programs designed for all skill levels.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Football Training Chapter ${i + 1}`,
      duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: i === 0 
        ? 'Introduction to football fundamentals and basic techniques for beginners.' 
        : `Advanced training on ${['dribbling', 'passing', 'shooting', 'defending', 'tactical awareness', 'ball control', 'heading', 'free kicks', 'penalty kicks', 'goalkeeping'][i % 10]}.`,
      videoUrl: 'https://www.youtube.com/watch?v=zyIgPqOpMWY',
      thumbnail: `https://images.unsplash.com/photo-${['1579952363873-27f3bade9f55', '1517927033932-b3d18e61fb3a', '1508098682722-e99c643e7f0b', '1431324155996-1f16bf0ebb7f'][i % 4]}?w=800&q=80`,
      isLocked: i > 5,
      isCompleted: i < 3,
      difficulty: i < 7 ? 'beginner' : i < 14 ? 'intermediate' : 'advanced'
    }))
  },
  'mma': {
    name: 'MMA',
    description: 'Train in mixed martial arts with our comprehensive programs covering striking, grappling, and ground techniques.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `MMA Training Chapter ${i + 1}`,
      duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: i === 0 
        ? 'Introduction to MMA fundamentals and basic techniques for beginners.' 
        : `Advanced training on ${['striking', 'grappling', 'ground techniques', 'clinch work', 'takedowns', 'submissions', 'defense', 'footwork', 'conditioning', 'strategy'][i % 10]}.`,
      videoUrl: 'https://www.youtube.com/watch?v=0N1_0SUGlDQ',
      thumbnail: `https://images.unsplash.com/photo-${['1615117972428-28de67cda58e', '1599058917765-a780eda07a3e', '1595078475328-1ab05d0a6a0e', '1517838277536-f5f99be501cd'][i % 4]}?w=800&q=80`,
      isLocked: i > 5,
      isCompleted: i < 3,
      difficulty: i < 7 ? 'beginner' : i < 14 ? 'intermediate' : 'advanced'
    }))
  },
  'tennis': {
    name: 'Tennis',
    description: 'Perfect your serve, backhand, and forehand with our tennis training programs.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Tennis Training Chapter ${i + 1}`,
      duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: i === 0 
        ? 'Introduction to tennis fundamentals and basic techniques for beginners.' 
        : `Advanced training on ${['serve', 'forehand', 'backhand', 'volley', 'smash', 'slice', 'drop shot', 'lob', 'footwork', 'strategy'][i % 10]}.`,
      videoUrl: 'https://www.youtube.com/watch?v=IpVf-GeYoUM',
      thumbnail: `https://images.unsplash.com/photo-${['1595435934249-5df7ed86e1c0', '1622279457486-62dcc4a431d6', '1531315630201-bb15abeb1653', '1526413232644-8a40f03cc03b'][i % 4]}?w=800&q=80`,
      isLocked: i > 5,
      isCompleted: i < 3,
      difficulty: i < 7 ? 'beginner' : i < 14 ? 'intermediate' : 'advanced'
    }))
  },
  'basketball': {
    name: 'Basketball',
    description: 'Elevate your basketball skills with our specialized training.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Basketball Training Chapter ${i + 1}`,
      duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: i === 0 
        ? 'Introduction to basketball fundamentals and basic techniques for beginners.' 
        : `Advanced training on ${['shooting', 'dribbling', 'passing', 'defense', 'rebounding', 'post moves', 'pick and roll', 'footwork', 'conditioning', 'team play'][i % 10]}.`,
      videoUrl: 'https://www.youtube.com/watch?v=CMQp0bwjokw',
      thumbnail: `https://images.unsplash.com/photo-${['1546519638-68e109498ffc', '1519861531473-9200262188bf', '1608245449230-4ac19066d2d0', '1574623452334-1e0ac2b3ccb4'][i % 4]}?w=800&q=80`,
      isLocked: i > 5,
      isCompleted: i < 3,
      difficulty: i < 7 ? 'beginner' : i < 14 ? 'intermediate' : 'advanced'
    }))
  },
  'wrestling': {
    name: 'Wrestling',
    description: 'Master the art of wrestling with our intensive training programs.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Wrestling Training Chapter ${i + 1}`,
      duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: i === 0 
        ? 'Introduction to wrestling fundamentals and basic techniques for beginners.' 
        : `Advanced training on ${['takedowns', 'pins', 'escapes', 'reversals', 'throws', 'clinch work', 'ground control', 'conditioning', 'strategy', 'mental toughness'][i % 10]}.`,
      videoUrl: 'https://www.youtube.com/watch?v=R3xrNlelylQ',
      thumbnail: `https://images.unsplash.com/photo-${['1611338631743-b0362363f417', '1576149146095-caa19d4de102', '1517838277536-f5f99be501cd', '1526374965328-7f61d3f18734'][i % 4]}?w=800&q=80`,
      isLocked: i > 5,
      isCompleted: i < 3,
      difficulty: i < 7 ? 'beginner' : i < 14 ? 'intermediate' : 'advanced'
    }))
  },
  'athletics': {
    name: 'Athletics',
    description: 'Enhance your running, jumping, and throwing abilities with our athletics training.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Athletics Training Chapter ${i + 1}`,
      duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: i === 0 
        ? 'Introduction to athletics fundamentals and basic techniques for beginners.' 
        : `Advanced training on ${['sprinting', 'long distance running', 'hurdles', 'long jump', 'high jump', 'shot put', 'javelin', 'discus', 'pole vault', 'relay'][i % 10]}.`,
      videoUrl: 'https://www.youtube.com/watch?v=brFHyOtTwH4',
      thumbnail: `https://images.unsplash.com/photo-${['1461896836934-ffe607ba8211', '1552674605-db6ffd4facb5', '1486218119243-13883505764c', '1541252260730-0412e8e2108e'][i % 4]}?w=800&q=80`,
      isLocked: i > 5,
      isCompleted: i < 3,
      difficulty: i < 7 ? 'beginner' : i < 14 ? 'intermediate' : 'advanced'
    }))
  }
};

export function TrainingView() {
  const { sportId } = useParams<{ sportId: string }>();
  const navigate = useNavigate();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<'all' | 'completed' | 'locked'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const playerRef = React.useRef<ReactPlayer>(null);

  // Generate stars for background
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

  const stars = generateStars(150);

  // Get sport data
  const sport = sportId && sportsData[sportId] 
    ? sportsData[sportId] 
    : { name: 'Unknown Sport', description: '', chapters: [] };

  // Filter chapters based on filters and search
  const filteredChapters = sport.chapters.filter(chapter => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && chapter.isCompleted) || 
      (filter === 'locked' && chapter.isLocked);
    
    const matchesDifficulty = 
      difficultyFilter === 'all' || 
      chapter.difficulty === difficultyFilter;
    
    const matchesSearch = 
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      chapter.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesDifficulty && matchesSearch;
  });

  // Handle chapter selection
  const handleSelectChapter = (chapter: Chapter) => {
    if (chapter.isLocked) {
      // Show unlock modal or message
      alert('This chapter is locked. Complete previous chapters to unlock.');
      return;
    }
    setSelectedChapter(chapter);
    setIsPlaying(true);
  };

  // Handle video controls
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle progress
  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100);
  };

  // Handle back navigation
  const handleBack = () => {
    if (selectedChapter) {
      setSelectedChapter(null);
      setIsPlaying(false);
    } else {
      navigate('/');
    }
  };

  // Mark chapter as completed
  const markAsCompleted = (chapterId: number) => {
    // In a real app, this would update the database
    // For now, we'll just show an alert
    alert(`Chapter ${chapterId} marked as completed!`);
  };

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
        
        {/* Shooting stars */}
        <motion.div
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{
            width: '150px',
            left: '-150px',
            top: '20%',
            rotate: '30deg'
          }}
          animate={{
            left: ['0%', '120%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 15
          }}
        />
        <motion.div
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            width: '200px',
            left: '-200px',
            top: '60%',
            rotate: '15deg'
          }}
          animate={{
            left: ['0%', '120%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 23,
            delay: 5
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/70 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>{selectedChapter ? 'Back to Chapters' : 'Back to Sports'}</span>
            </button>
            
            <h1 className="text-2xl font-bold text-white">{sport.name} Training</h1>
            
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {selectedChapter ? (
            /* Video Player Section */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Video Player */}
              <div 
                id="video-container" 
                className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20"
              >
                <ReactPlayer
                  ref={playerRef}
                  url={selectedChapter.videoUrl}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  muted={isMuted}
                  controls={false}
                  onProgress={handleProgress}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, controls: 0, modestbranding: 1 }
                    }
                  }}
                />
                
                {/* Custom Controls */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex justify-end">
                    <button 
                      onClick={toggleFullscreen}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={togglePlay}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      
                      <button 
                        onClick={toggleMute}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedChapter.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{selectedChapter.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className={cn(
                          selectedChapter.difficulty === 'beginner' ? 'text-green-400' : 
                          selectedChapter.difficulty === 'intermediate' ? 'text-yellow-400' : 
                          'text-red-400'
                        )}>
                          {selectedChapter.difficulty.charAt(0).toUpperCase() + selectedChapter.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => markAsCompleted(selectedChapter.id)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full text-sm font-medium transition-colors"
                  >
                    Mark as Completed
                  </button>
                </div>
                
                <p className="text-gray-300">{selectedChapter.description}</p>
              </div>
              
              {/* Next Chapters */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Next Chapters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sport.chapters
                    .filter(chapter => chapter.id > selectedChapter.id)
                    .slice(0, 3)
                    .map(chapter => (
                      <motion.div
                        key={chapter.id}
                        whileHover={{ scale: 1.03 }}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => handleSelectChapter(chapter)}
                      >
                        <div className="relative aspect-video">
                          <img 
                            src={chapter.thumbnail} 
                            alt={chapter.title} 
                            className="w-full h-full object-cover"
                          />
                          {chapter.isLocked && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                              <Lock className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {chapter.duration}
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="text-white font-medium truncate">{chapter.title}</h4>
                          <p className="text-gray-400 text-sm truncate">{chapter.description}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Chapters List */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Sport Info */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
                  {sport.name} Training Program
                </h2>
                <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
                  {sport.description}
                </p>
              </div>
              
              {/* Filters */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setFilter('all')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        filter === 'all' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      All Chapters
                    </button>
                    <button 
                      onClick={() => setFilter('completed')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        filter === 'completed' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      Completed
                    </button>
                    <button 
                      onClick={() => setFilter('locked')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        filter === 'locked' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      Locked
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setDifficultyFilter('all')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        difficultyFilter === 'all' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      All Levels
                    </button>
                    <button 
                      onClick={() => setDifficultyFilter('beginner')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        difficultyFilter === 'beginner' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      Beginner
                    </button>
                    <button 
                      onClick={() => setDifficultyFilter('intermediate')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        difficultyFilter === 'intermediate' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      Intermediate
                    </button>
                    <button 
                      onClick={() => setDifficultyFilter('advanced')}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        difficultyFilter === 'advanced' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      Advanced
                    </button>
                  </div>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search chapters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Chapters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChapters.map((chapter) => (
                  <motion.div
                    key={chapter.id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => handleSelectChapter(chapter)}
                  >
                    <div className="relative aspect-video">
                      <img 
                        src={chapter.thumbnail} 
                        alt={chapter.title} 
                        className="w-full h-full object-cover"
                      />
                      {chapter.isLocked && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Lock className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {chapter.isCompleted && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {chapter.duration}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                        <span className={cn(
                          chapter.difficulty === 'beginner' ? 'text-green-400' : 
                          chapter.difficulty === 'intermediate' ? 'text-yellow-400' : 
                          'text-red-400'
                        )}>
                          {chapter.difficulty.charAt(0).toUpperCase() + chapter.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{chapter.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{chapter.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">{chapter.duration}</span>
                        </div>
                        
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={cn(
                                "h-4 w-4",
                                star <= Math.floor(Math.random() * 3) + 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredChapters.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No chapters match your filters. Try adjusting your search criteria.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}