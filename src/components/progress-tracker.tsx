import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  Target,
  Flame,
  Apple,
  Beef,
  Egg,
  Droplet,
  Plus,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NutritionData {
  calories: {
    goal: number;
    consumed: number;
  };
  macros: {
    protein: {
      goal: number;
      consumed: number;
    };
    carbs: {
      goal: number;
      consumed: number;
    };
    fat: {
      goal: number;
      consumed: number;
    };
  };
  water: {
    goal: number;
    consumed: number;
  };
  meals: {
    id: number;
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
}

interface ProgressData {
  totalWorkouts: number;
  completedWorkouts: number;
  streakDays: number;
  totalMinutes: number;
  achievements: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    icon: keyof typeof iconMap;
  }[];
  recentActivities: {
    id: number;
    title: string;
    date: string;
    duration: string;
    completed: boolean;
  }[];
  skills: {
    name: string;
    level: number;
    progress: number;
  }[];
  nutrition: NutritionData;
}

// Map of icon names to Lucide icon components
const iconMap = {
  Award: Award,
  Flame: Flame,
  Target: Target,
  TrendingUp: TrendingUp,
  CheckCircle2: CheckCircle2
};

// Sample data - replace with your actual data source
const sampleProgressData: ProgressData = {
  totalWorkouts: 48,
  completedWorkouts: 32,
  streakDays: 7,
  totalMinutes: 1240,
  achievements: [
    {
      id: 1,
      title: 'First Mile',
      description: 'Complete your first workout',
      completed: true,
      icon: 'CheckCircle2'
    },
    {
      id: 2,
      title: 'Consistency King',
      description: 'Complete 7 days streak',
      completed: true,
      icon: 'Flame'
    },
    {
      id: 3,
      title: 'Halfway There',
      description: 'Complete 50% of your program',
      completed: false,
      icon: 'Target'
    },
    {
      id: 4,
      title: 'Level Up',
      description: 'Increase skill level in any category',
      completed: true,
      icon: 'TrendingUp'
    },
    {
      id: 5,
      title: 'Champion',
      description: 'Complete all workouts in a program',
      completed: false,
      icon: 'Award'
    }
  ],
  recentActivities: [
    {
      id: 1,
      title: 'Strength Training - Upper Body',
      date: '2025-03-15',
      duration: '45 mins',
      completed: true
    },
    {
      id: 2,
      title: 'Cardio Session',
      date: '2025-03-14',
      duration: '30 mins',
      completed: true
    },
    {
      id: 3,
      title: 'Flexibility & Mobility',
      date: '2025-03-12',
      duration: '20 mins',
      completed: true
    },
    {
      id: 4,
      title: 'Recovery Session',
      date: '2025-03-10',
      duration: '15 mins',
      completed: true
    }
  ],
  skills: [
    {
      name: 'Strength',
      level: 3,
      progress: 65
    },
    {
      name: 'Endurance',
      level: 2,
      progress: 40
    },
    {
      name: 'Flexibility',
      level: 4,
      progress: 80
    },
    {
      name: 'Speed',
      level: 2,
      progress: 35
    },
    {
      name: 'Technique',
      level: 3,
      progress: 60
    }
  ],
  nutrition: {
    calories: {
      goal: 2500,
      consumed: 1850
    },
    macros: {
      protein: {
        goal: 180,
        consumed: 135
      },
      carbs: {
        goal: 250,
        consumed: 190
      },
      fat: {
        goal: 80,
        consumed: 60
      }
    },
    water: {
      goal: 3000,
      consumed: 2100
    },
    meals: [
      {
        id: 1,
        name: 'Breakfast',
        time: '07:30 AM',
        calories: 450,
        protein: 35,
        carbs: 40,
        fat: 15
      },
      {
        id: 2,
        name: 'Pre-Workout Snack',
        time: '10:00 AM',
        calories: 200,
        protein: 15,
        carbs: 25,
        fat: 5
      },
      {
        id: 3,
        name: 'Lunch',
        time: '01:00 PM',
        calories: 650,
        protein: 45,
        carbs: 70,
        fat: 20
      },
      {
        id: 4,
        name: 'Post-Workout Shake',
        time: '04:30 PM',
        calories: 250,
        protein: 30,
        carbs: 25,
        fat: 5
      },
      {
        id: 5,
        name: 'Dinner',
        time: '07:00 PM',
        calories: 550,
        protein: 40,
        carbs: 50,
        fat: 20
      }
    ]
  }
};

interface ProgressTrackerProps {
  data?: ProgressData;
  className?: string;
}

export function ProgressTracker({ data = sampleProgressData, className }: ProgressTrackerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activities' | 'nutrition'>('overview');
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    time: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  // Calculate overall progress percentage
  const overallProgress = Math.round((data.completedWorkouts / data.totalWorkouts) * 100);
  
  // Calculate nutrition percentages
  const caloriesPercentage = Math.round((data.nutrition.calories.consumed / data.nutrition.calories.goal) * 100);
  const proteinPercentage = Math.round((data.nutrition.macros.protein.consumed / data.nutrition.macros.protein.goal) * 100);
  const carbsPercentage = Math.round((data.nutrition.macros.carbs.consumed / data.nutrition.macros.carbs.goal) * 100);
  const fatPercentage = Math.round((data.nutrition.macros.fat.consumed / data.nutrition.macros.fat.goal) * 100);
  const waterPercentage = Math.round((data.nutrition.water.consumed / data.nutrition.water.goal) * 100);
  
  const handleAddMeal = () => {
    // In a real app, you would add the meal to your data source
    console.log('Adding meal:', newMeal);
    setShowAddMeal(false);
    setNewMeal({
      name: '',
      time: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  };
  
  return (
    <div className={cn("min-h-screen bg-gray-900 pt-16", className)}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white">Your Progress</h1>
          <p className="text-gray-400">
            Track your training journey and achievements
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-gray-800 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-medium text-gray-400">Workouts Completed</h3>
            </div>
            <p className="text-2xl font-bold text-white">{data.completedWorkouts}/{data.totalWorkouts}</p>
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-gray-400">Progress</span>
                <span className="text-blue-400">{overallProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-gray-800 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <h3 className="text-sm font-medium text-gray-400">Current Streak</h3>
            </div>
            <p className="text-2xl font-bold text-white">{data.streakDays} days</p>
            <p className="mt-2 text-xs text-gray-400">Keep it going!</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-gray-800 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              <h3 className="text-sm font-medium text-gray-400">Total Time</h3>
            </div>
            <p className="text-2xl font-bold text-white">{data.totalMinutes} mins</p>
            <p className="mt-2 text-xs text-gray-400">{Math.round(data.totalMinutes / 60)} hours of training</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-gray-800 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <h3 className="text-sm font-medium text-gray-400">Achievements</h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {data.achievements.filter(a => a.completed).length}/{data.achievements.length}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {data.achievements.filter(a => !a.completed).length} more to unlock
            </p>
          </motion.div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 flex overflow-x-auto border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === 'overview' 
                ? "border-blue-500 text-blue-500" 
                : "border-transparent text-gray-400 hover:text-gray-300"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === 'nutrition' 
                ? "border-blue-500 text-blue-500" 
                : "border-transparent text-gray-400 hover:text-gray-300"
            )}
          >
            Nutrition
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === 'achievements' 
                ? "border-blue-500 text-blue-500" 
                : "border-transparent text-gray-400 hover:text-gray-300"
            )}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === 'activities' 
                ? "border-blue-500 text-blue-500" 
                : "border-transparent text-gray-400 hover:text-gray-300"
            )}
          >
            Recent Activities
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-white">Skill Progress</h2>
                <div className="space-y-4">
                  {data.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{skill.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "h-2 w-2 rounded-full mx-0.5",
                                  i < skill.level ? "bg-blue-500" : "bg-gray-600"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">Level {skill.level}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-400">
                        <span>Progress to next level</span>
                        <span>{skill.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="mb-4 text-xl font-semibold text-white">Recent Achievements</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.achievements
                    .filter(achievement => achievement.completed)
                    .slice(0, 3)
                    .map((achievement) => {
                      const Icon = iconMap[achievement.icon];
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-3 rounded-lg bg-gray-800 p-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                            <Icon className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{achievement.title}</h3>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              {/* Nutrition Summary */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-gray-800 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <h3 className="text-sm font-medium text-gray-400">Calories</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {data.nutrition.calories.consumed} / {data.nutrition.calories.goal} kcal
                  </p>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-gray-400">Daily Goal</span>
                      <span className="text-orange-400">{caloriesPercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${caloriesPercentage}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl bg-gray-800 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-400" />
                    <h3 className="text-sm font-medium text-gray-400">Water Intake</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {data.nutrition.water.consumed} / {data.nutrition.water.goal} ml
                  </p>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-gray-400">Daily Goal</span>
                      <span className="text-blue-400">{waterPercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${waterPercentage}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl bg-gray-800 p-4 sm:col-span-2 lg:col-span-1"
                >
                  <h3 className="mb-3 text-sm font-medium text-gray-400">Macronutrients</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Beef className="h-4 w-4 text-red-400" />
                          <span className="text-sm text-white">Protein</span>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {data.nutrition.macros.protein.consumed}g / {data.nutrition.macros.protein.goal}g
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full bg-red-500 transition-all duration-300"
                          style={{ width: `${proteinPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Apple className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-white">Carbs</span>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {data.nutrition.macros.carbs.consumed}g / {data.nutrition.macros.carbs.goal}g
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${carbsPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Egg className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-white">Fat</span>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {data.nutrition.macros.fat.consumed}g / {data.nutrition.macros.fat.goal}g
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full bg-yellow-500 transition-all duration-300"
                          style={{ width: `${fatPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Meal Tracking */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Today's Meals</h2>
                  <button
                    onClick={() => setShowAddMeal(true)}
                    className="flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    <Plus className="h-4 w-4" />
                    Add Meal
                  </button>
                </div>
                
                <div className="space-y-4">
                  {data.nutrition.meals.map((meal) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-lg bg-gray-800 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{meal.name}</h3>
                          <p className="text-sm text-gray-400">{meal.time}</p>
                        </div>
                        <p className="text-lg font-semibold text-white">{meal.calories} kcal</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="rounded-md bg-gray-700 p-2">
                          <p className="text-gray-400">Protein</p>
                          <p className="font-medium text-white">{meal.protein}g</p>
                        </div>
                        <div className="rounded-md bg-gray-700 p-2">
                          <p className="text-gray-400">Carbs</p>
                          <p className="font-medium text-white">{meal.carbs}g</p>
                        </div>
                        <div className="rounded-md bg-gray-700 p-2">
                          <p className="text-gray-400">Fat</p>
                          <p className="font-medium text-white">{meal.fat}g</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Nutrition Tips */}
              <div className="rounded-xl bg-gray-800 p-4">
                <h3 className="mb-3 text-lg font-semibold text-white">Nutrition Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <p>Aim to consume protein within 30 minutes after your workout for optimal recovery.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <p>Stay hydrated throughout the day, not just during workouts.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <p>Complex carbs are better for sustained energy during longer training sessions.</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">All Achievements</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.achievements.map((achievement) => {
                  const Icon = iconMap[achievement.icon];
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: achievement.id * 0.1 }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg p-4",
                        achievement.completed ? "bg-gray-800" : "bg-gray-800/50 opacity-60"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        achievement.completed ? "bg-blue-500/20" : "bg-gray-700"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          achievement.completed ? "text-blue-400" : "text-gray-500"
                        )} />
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-medium",
                          achievement.completed ? "text-white" : "text-gray-400"
                        )}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                      {achievement.completed && (
                        <div className="ml-auto">
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab === 'activities' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Recent Activities</h2>
              <div className="space-y-4">
                {data.recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg bg-gray-800 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">{activity.title}</h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {activity.duration}
                          </div>
                        </div>
                      </div>
                      {activity.completed && (
                        <div className="rounded-full bg-green-500/10 p-1">
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Weekly Progress Chart */}
        <div className="rounded-xl bg-gray-800 p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">Weekly Activity</h2>
          <div className="flex h-40 items-end justify-between gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              // Generate random heights for the chart bars
              const height = Math.floor(Math.random() * 80) + 20;
              const isToday = index === 4; // Assuming Friday is today for this example
              
              return (
                <div key={day} className="flex flex-1 flex-col items-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                      "w-full rounded-t-md",
                      isToday ? "bg-blue-500" : "bg-blue-500/40"
                    )}
                  />
                  <p className="mt-2 text-xs font-medium text-gray-400">{day}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Add Meal Modal */}
        {showAddMeal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Add Meal</h3>
                <button 
                  onClick={() => setShowAddMeal(false)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="meal-name" className="mb-1 block text-sm font-medium text-gray-300">
                    Meal Name
                  </label>
                  <input
                    id="meal-name"
                    type="text"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                    className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Breakfast, Lunch, Snack"
                  />
                </div>
                
                <div>
                  <label htmlFor="meal-time" className="mb-1 block text-sm font-medium text-gray-300">
                    Time
                  </label>
                  <input
                    id="meal-time"
                    type="text"
                    value={newMeal.time}
                    onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                    className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 08:00 AM"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="meal-calories" className="mb-1 block text-sm font-medium text-gray-300">
                      Calories (kcal)
                    </label>
                    <input
                      id="meal-calories"
                      type="number"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal({...newMeal, calories: parseInt(e.target.value) || 0})}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="meal-protein" className="mb-1 block text-sm font-medium text-gray-300">
                      Protein (g)
                    </label>
                    <input
                      id="meal-protein"
                      type="number"
                      value={newMeal.protein}
                      onChange={(e) => setNewMeal({...newMeal, protein: parseInt(e.target.value) || 0})}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="meal-carbs" className="mb-1 block text-sm font-medium text-gray-300">
                      Carbs (g)
                    </label>
                    <input
                      id="meal-carbs"
                      type="number"
                      value={newMeal.carbs}
                      onChange={(e) => setNewMeal({...newMeal, carbs: parseInt(e.target.value) || 0})}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="meal-fat" className="mb-1 block text-sm font-medium text-gray-300">
                      Fat (g)
                    </label>
                    <input
                      id="meal-fat"
                      type="number"
                      value={newMeal.fat}
                      onChange={(e) => setNewMeal({...newMeal, fat: parseInt(e.target.value) || 0})}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowAddMeal(false)}
                    className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMeal}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Add Meal
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}