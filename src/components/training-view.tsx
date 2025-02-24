import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Play, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface TrainingStep {
  title: string;
  duration: string;
  image: string;
  description: string;
  theory: string[];
  keyPoints: string[];
}

interface SportTraining {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: TrainingStep[];
}

const sportsTrainingData: Record<string, SportTraining> = {
  football: {
    id: 'football',
    name: 'Football Training',
    description: 'Master the fundamentals of football with our comprehensive training program.',
    difficulty: 'Beginner',
    steps: [
      {
        title: 'Warm-up Routine',
        duration: '10 mins',
        image: 'https://appinsports.com/wp-content/uploads/2021/04/jeffrey-f-lin-XUsMIX04wvc-unsplash-scaled.jpg',
        description: 'Essential warm-up exercises for football training',
        theory: [
          'Start with light jogging to increase heart rate',
          'Perform dynamic stretches focusing on legs and core',
          'Include football-specific movements like side-steps and high knees',
          'End with short sprints to prepare for intense activity'
        ],
        keyPoints: [
          'Never skip warm-up to prevent injuries',
          'Maintain proper form during exercises',
          'Gradually increase intensity',
          'Focus on both upper and lower body'
        ]
      },
      {
        title: 'Dribbling Basics',
        duration: '20 mins',
        image: 'https://appinsports.com/wp-content/uploads/2021/04/jeffrey-f-lin-XUsMIX04wvc-unsplash-scaled.jpg',
        description: 'Learn ball control and basic dribbling techniques',
        theory: [
          'Keep the ball close to your feet',
          'Use both inside and outside of foot',
          'Practice at different speeds',
          'Look up while dribbling to maintain awareness'
        ],
        keyPoints: [
          'Start slow and focus on control',
          'Practice with both feet',
          'Keep your body between the ball and defender',
          'Use small touches for better control'
        ]
      },
      {
        title: 'Passing Practice',
        duration: '15 mins',
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80',
        description: 'Master different types of passes',
        theory: [
          'Plant your non-kicking foot beside the ball',
          'Strike the middle of the ball for ground passes',
          'Follow through with your kicking foot',
          'Use inside foot for accuracy, laces for power'
        ],
        keyPoints: [
          'Keep your head steady',
          'Practice both short and long passes',
          'Communicate with teammates',
          'Aim ahead of receiving player'
        ]
      }
    ]
  },
  mma: {
    id: 'mma',
    name: 'MMA Training',
    description: 'Build strength, agility, and fighting techniques with professional MMA training.',
    difficulty: 'Intermediate',
    steps: [
      {
        title: 'Shadow Boxing',
        duration: '15 mins',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
        description: 'Practice basic punches and footwork',
        theory: [
          'Start with basic jab-cross combinations',
          'Focus on proper stance and guard position',
          'Practice footwork patterns',
          'Incorporate head movement'
        ],
        keyPoints: [
          'Keep hands up to protect face',
          'Stay light on your feet',
          'Rotate hips for power',
          'Breathe with each punch'
        ]
      },
      {
        title: 'Core Strength',
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=800&q=80',
        description: 'Essential core exercises for fighters',
        theory: [
          'Perform plank variations',
          'Include rotational exercises',
          'Add resistance training',
          'Focus on explosive movements'
        ],
        keyPoints: [
          'Maintain proper form',
          'Engage core throughout',
          'Control breathing',
          'Progress gradually'
        ]
      }
    ]
  },
  tennis: {
    id: 'tennis',
    name: 'Tennis Training',
    description: 'Develop your tennis skills from ground strokes to advanced serve techniques.',
    difficulty: 'Intermediate',
    steps: [
      {
        title: 'Forehand Technique',
        duration: '25 mins',
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
        description: 'Master the fundamental forehand stroke',
        theory: [
          'Start with proper grip (Eastern or Semi-Western)',
          'Position body sideways to the net',
          'Use proper swing path (low to high)',
          'Follow through over the shoulder'
        ],
        keyPoints: [
          'Keep eyes on the ball',
          'Bend knees for stability',
          'Transfer weight forward',
          'Maintain loose grip pressure'
        ]
      },
      {
        title: 'Serve Basics',
        duration: '30 mins',
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
        description: 'Learn the proper serving technique',
        theory: [
          'Start with trophy position',
          'Toss ball consistently',
          'Bend knees and load power',
          'Extend upward for contact'
        ],
        keyPoints: [
          'Keep toss consistent',
          'Use legs for power',
          'Pronate wrist on contact',
          'Follow through completely'
        ]
      }
    ]
  },
  basketball: {
    id: 'basketball',
    name: 'Basketball Training',
    description: 'From dribbling to shooting, master the essential basketball skills.',
    difficulty: 'Beginner',
    steps: [
      {
        title: 'Shooting Form',
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
        description: 'Perfect your shooting technique',
        theory: [
          'Align feet with shoulders',
          'Position ball in shooting pocket',
          'Focus on target (rim)',
          'Use BEEF technique (Balance, Eyes, Elbow, Follow-through)'
        ],
        keyPoints: [
          'Keep elbow in',
          'Release at peak height',
          'Follow through fully',
          'Practice rhythm and timing'
        ]
      },
      {
        title: 'Ball Handling',
        duration: '25 mins',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
        description: 'Improve your dribbling skills',
        theory: [
          'Start with basic dribbling',
          'Practice crossovers',
          'Add behind-the-back dribble',
          'Incorporate speed changes'
        ],
        keyPoints: [
          'Keep head up',
          'Use fingertips',
          'Stay low',
          'Protect the ball'
        ]
      }
    ]
  },
  cricket: {
    id: 'cricket',
    name: 'Cricket Training',
    description: 'Comprehensive cricket training covering batting, bowling, and fielding.',
    difficulty: 'Intermediate',
    steps: [
      {
        title: 'Batting Stance',
        duration: '30 mins',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
        description: 'Master the proper batting technique',
        theory: [
          'Position feet shoulder-width apart',
          'Bend knees slightly',
          'Hold bat at comfortable height',
          'Keep eyes level and focused'
        ],
        keyPoints: [
          'Balance is key',
          'Watch the ball closely',
          'Maintain grip pressure',
          'Keep head still'
        ]
      },
      {
        title: 'Bowling Action',
        duration: '35 mins',
        image: 'https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&w=800&q=80',
        description: 'Develop proper bowling technique',
        theory: [
          'Start with run-up practice',
          'Focus on loading position',
          'Master release point',
          'Follow through completely'
        ],
        keyPoints: [
          'Maintain straight arm',
          'Focus on target',
          'Control pace',
          'Practice consistency'
        ]
      }
    ]
  },
  athletics: {
    id: 'athletics',
    name: 'Athletics Training',
    description: 'Track and field training focusing on running, jumping, and throwing techniques.',
    difficulty: 'Advanced',
    steps: [
      {
        title: 'Sprint Technique',
        duration: '25 mins',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
        description: 'Perfect your sprinting form',
        theory: [
          'Master starting position',
          'Drive knees high',
          'Maintain proper arm swing',
          'Focus on foot strike'
        ],
        keyPoints: [
          'Stay relaxed',
          'Keep shoulders level',
          'Breathe rhythmically',
          'Maintain form when tired'
        ]
      },
      {
        title: 'Long Jump',
        duration: '30 mins',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
        description: 'Learn proper long jump technique',
        theory: [
          'Calculate run-up distance',
          'Maintain sprint speed',
          'Master takeoff position',
          'Perfect landing technique'
        ],
        keyPoints: [
          'Speed is crucial',
          'Time takeoff precisely',
          'Drive knees up',
          'Land efficiently'
        ]
      }
    ]
  }
};

export function TrainingView() {
  const navigate = useNavigate();
  const { sportId } = useParams();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showTheory, setShowTheory] = React.useState(false);

  const sport = sportId ? sportsTrainingData[sportId] : null;

  if (!sport) {
    return <div>Sport not found</div>;
  }

  const currentTraining = sport.steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-900 px-4 py-8"
    >
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate('/sports')}
          className="mb-6 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Sports Selection
        </button>

        <div className="mb-8 rounded-xl bg-gray-800 p-6">
          <h1 className="mb-2 text-3xl font-bold text-white">{sport.name}</h1>
          <p className="mb-4 text-gray-300">{sport.description}</p>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
              {sport.difficulty}
            </span>
            <span className="flex items-center gap-2 text-gray-300">
              <Clock className="h-4 w-4" />
              {sport.steps.reduce((acc, step) => acc + parseInt(step.duration), 0)} mins total
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="overflow-hidden rounded-xl bg-gray-800">
            <motion.img
              src={currentTraining.image}
              alt={currentTraining.title}
              className="h-64 w-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="p-6">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 text-2xl font-bold text-white"
              >
                {currentStep + 1}. {currentTraining.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4 text-gray-300"
              >
                {currentTraining.description}
              </motion.p>
              
              <div className="mb-6 flex items-center gap-4">
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  {currentTraining.duration}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTheory(!showTheory)}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                >
                  <Play className="h-4 w-4" />
                  {showTheory ? 'Hide Details' : 'Show Details'}
                </motion.button>
              </div>

              {showTheory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg bg-gray-700 p-4"
                >
                  <div className="mb-4">
                    <h3 className="mb-2 text-lg font-semibold text-white">Step-by-Step Guide</h3>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      {currentTraining.theory.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-white">Key Points to Remember</h3>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      {currentTraining.keyPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + 0.1 * index }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={cn(
              'rounded-full bg-gray-700 px-6 py-3 font-semibold text-white transition-all',
              currentStep === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-600'
            )}
          >
            Previous Step
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep((prev) => Math.min(sport.steps.length - 1, prev + 1))}
            disabled={currentStep === sport.steps.length - 1}
            className={cn(
              'rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-all',
              currentStep === sport.steps.length - 1
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-blue-600'
            )}
          >
            Next Step
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}