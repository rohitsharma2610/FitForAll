import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Search, 
  Flame, 
  ArrowRight, 
  X,
  Save,
  Clock,
  Apple,
  Beef,
  Egg
} from 'lucide-react';
import { cn } from '../lib/utils';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  quantity: number;
}

interface MealEntry {
  id: string;
  name: string;
  time: string;
  foods: FoodItem[];
}

interface CalorieGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Common food database with nutritional information
const foodDatabase: FoodItem[] = [
  { id: '1', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g', quantity: 1 },
  { id: '2', name: 'Brown Rice', calories: 112, protein: 2.6, carbs: 23.5, fat: 0.9, servingSize: '100g', quantity: 1 },
  { id: '3', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, servingSize: '100g', quantity: 1 },
  { id: '4', name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, servingSize: '100g', quantity: 1 },
  { id: '5', name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, servingSize: '100g', quantity: 1 },
  { id: '6', name: 'Egg', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, servingSize: '1 large', quantity: 1 },
  { id: '7', name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, servingSize: '100g', quantity: 1 },
  { id: '8', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, servingSize: '1 medium', quantity: 1 },
  { id: '9', name: 'Avocado', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, servingSize: '100g', quantity: 1 },
  { id: '10', name: 'Oatmeal', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, servingSize: '100g', quantity: 1 },
  { id: '11', name: 'Almonds', calories: 579, protein: 21, carbs: 21.6, fat: 49.9, servingSize: '100g', quantity: 1 },
  { id: '12', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g', quantity: 1 },
  { id: '13', name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, servingSize: '100g', quantity: 1 },
  { id: '14', name: 'Cottage Cheese', calories: 98, protein: 11.1, carbs: 3.4, fat: 4.3, servingSize: '100g', quantity: 1 },
  { id: '15', name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fat: 50, servingSize: '100g', quantity: 1 },
];

// Default meal templates
const defaultMeals: MealEntry[] = [
  { id: '1', name: 'Breakfast', time: '07:00', foods: [] },
  { id: '2', name: 'Lunch', time: '12:00', foods: [] },
  { id: '3', name: 'Dinner', time: '18:00', foods: [] },
  { id: '4', name: 'Snacks', time: '15:00', foods: [] },
];

export function CalorieCounter() {
  const [meals, setMeals] = useState<MealEntry[]>(defaultMeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [activeMealId, setActiveMealId] = useState<string | null>(null);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [customFood, setCustomFood] = useState<FoodItem>({
    id: '',
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: '',
    quantity: 1
  });
  const [calorieGoal, setCalorieGoal] = useState<CalorieGoal>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 70
  });

  // Calculate total nutrition for the day
  const dailyTotals = meals.reduce(
    (acc, meal) => {
      const mealTotals = meal.foods.reduce(
        (mealAcc, food) => {
          return {
            calories: mealAcc.calories + food.calories * food.quantity,
            protein: mealAcc.protein + food.protein * food.quantity,
            carbs: mealAcc.carbs + food.carbs * food.quantity,
            fat: mealAcc.fat + food.fat * food.quantity
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );

      return {
        calories: acc.calories + mealTotals.calories,
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fat: acc.fat + mealTotals.fat
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // Calculate percentages for progress bars
  const caloriePercentage = Math.min(Math.round((dailyTotals.calories / calorieGoal.calories) * 100), 100);
  const proteinPercentage = Math.min(Math.round((dailyTotals.protein / calorieGoal.protein) * 100), 100);
  const carbsPercentage = Math.min(Math.round((dailyTotals.carbs / calorieGoal.carbs) * 100), 100);
  const fatPercentage = Math.min(Math.round((dailyTotals.fat / calorieGoal.fat) * 100), 100);

  // Calculate macronutrient distribution
  const totalMacroCalories = 
    (dailyTotals.protein * 4) + 
    (dailyTotals.carbs * 4) + 
    (dailyTotals.fat * 9);
  
  const proteinCaloriePercentage = totalMacroCalories > 0 
    ? Math.round((dailyTotals.protein * 4 / totalMacroCalories) * 100) 
    : 0;
  
  const carbsCaloriePercentage = totalMacroCalories > 0 
    ? Math.round((dailyTotals.carbs * 4 / totalMacroCalories) * 100) 
    : 0;
  
  const fatCaloriePercentage = totalMacroCalories > 0 
    ? Math.round((dailyTotals.fat * 9 / totalMacroCalories) * 100) 
    : 0;

  // Search food database
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = foodDatabase.filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Add food to meal
  const addFoodToMeal = (mealId: string, food: FoodItem) => {
    setMeals(prevMeals => 
      prevMeals.map(meal => {
        if (meal.id === mealId) {
          // Create a new food item with a unique ID
          const newFood = {
            ...food,
            id: Date.now().toString()
          };
          return {
            ...meal,
            foods: [...meal.foods, newFood]
          };
        }
        return meal;
      })
    );
    setShowAddFoodModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Remove food from meal
  const removeFoodFromMeal = (mealId: string, foodId: string) => {
    setMeals(prevMeals => 
      prevMeals.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: meal.foods.filter(food => food.id !== foodId)
          };
        }
        return meal;
      })
    );
  };

  // Update food quantity
  const updateFoodQuantity = (mealId: string, foodId: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setMeals(prevMeals => 
      prevMeals.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: meal.foods.map(food => 
              food.id === foodId ? { ...food, quantity } : food
            )
          };
        }
        return meal;
      })
    );
  };

  // Add custom food
  const handleAddCustomFood = () => {
    if (!customFood.name || customFood.calories <= 0) return;
    
    const newFood: FoodItem = {
      ...customFood,
      id: `custom-${Date.now()}`
    };
    
    if (activeMealId) {
      addFoodToMeal(activeMealId, newFood);
    }
    
    setCustomFood({
      id: '',
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: '',
      quantity: 1
    });
  };

  // Add new meal
  const addNewMeal = () => {
    const newMeal: MealEntry = {
      id: Date.now().toString(),
      name: 'Custom Meal',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      foods: []
    };
    
    setMeals(prevMeals => [...prevMeals, newMeal]);
  };

  // Remove meal
  const removeMeal = (mealId: string) => {
    setMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
  };

  // Update meal details
  const updateMealDetails = (mealId: string, name: string, time: string) => {
    setMeals(prevMeals => 
      prevMeals.map(meal => 
        meal.id === mealId ? { ...meal, name, time } : meal
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white">Calorie Counter</h1>
          <p className="text-gray-400">
            Track your daily nutrition and stay on top of your goals
          </p>
        </div>

        {/* Daily Summary */}
        <div className="mb-8 rounded-xl bg-gray-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Daily Summary</h2>
            <button 
              onClick={() => setShowGoalModal(true)}
              className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400 hover:bg-blue-500/30"
            >
              Set Goals
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              {/* Calories */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <span className="font-medium text-white">Calories</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white">
                      {Math.round(dailyTotals.calories)} / {calorieGoal.calories}
                    </span>
                    <span className="ml-1 text-sm text-gray-400">kcal</span>
                  </div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${caloriePercentage}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-400">
                    {calorieGoal.calories - Math.round(dailyTotals.calories) > 0 
                      ? `${calorieGoal.calories - Math.round(dailyTotals.calories)} kcal remaining` 
                      : 'Goal reached'}
                  </span>
                  <span className="text-orange-400">{caloriePercentage}%</span>
                </div>
              </div>

              {/* Macronutrients */}
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Beef className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-white">Protein</span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      {Math.round(dailyTotals.protein)}g / {calorieGoal.protein}g
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
                      {Math.round(dailyTotals.carbs)}g / {calorieGoal.carbs}g
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
                      {Math.round(dailyTotals.fat)}g / {calorieGoal.fat}g
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
            </div>

            {/* Macronutrient Distribution */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-400">Macronutrient Distribution</h3>
              
              <div className="mb-4 h-4 overflow-hidden rounded-full bg-gray-700">
                <div className="flex h-full">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${proteinCaloriePercentage}%` }} 
                  />
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${carbsCaloriePercentage}%` }} 
                  />
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ width: `${fatCaloriePercentage}%` }} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm text-white">Protein</span>
                  </div>
                  <p className="text-xs text-gray-400">{proteinCaloriePercentage}%</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm text-white">Carbs</span>
                  </div>
                  <p className="text-xs text-gray-400">{carbsCaloriePercentage}%</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm text-white">Fat</span>
                  </div>
                  <p className="text-xs text-gray-400">{fatCaloriePercentage}%</p>
                </div>
              </div>
              
              <div className="mt-4 rounded-lg bg-blue-500/10 p-3">
                <p className="text-sm text-blue-400">
                  <strong>Tip:</strong> Aim for a balanced macronutrient distribution with 
                  approximately 30% protein, 40% carbs, and 30% fat for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Today's Meals</h2>
          <button
            onClick={addNewMeal}
            className="flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            Add Meal
          </button>
        </div>

        <div className="space-y-6">
          {meals.map((meal) => {
            // Calculate meal totals
            const mealTotals = meal.foods.reduce(
              (acc, food) => {
                return {
                  calories: acc.calories + food.calories * food.quantity,
                  protein: acc.protein + food.protein * food.quantity,
                  carbs: acc.carbs + food.carbs * food.quantity,
                  fat: acc.fat + food.fat * food.quantity
                };
              },
              { calories: 0, protein: 0, carbs: 0, fat: 0 }
            );

            return (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-gray-800"
              >
                <div className="border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                        <Clock className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{meal.name}</h3>
                        <p className="text-sm text-gray-400">{meal.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-semibold text-white">{Math.round(mealTotals.calories)} kcal</p>
                        <p className="text-xs text-gray-400">
                          P: {Math.round(mealTotals.protein)}g • 
                          C: {Math.round(mealTotals.carbs)}g • 
                          F: {Math.round(mealTotals.fat)}g
                        </p>
                      </div>
                      <button
                        onClick={() => removeMeal(meal.id)}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Food Items */}
                <div className="p-4">
                  {meal.foods.length > 0 ? (
                    <div className="mb-4 space-y-3">
                      {meal.foods.map((food) => (
                        <div
                          key={food.id}
                          className="flex items-center justify-between rounded-lg bg-gray-700 p-3"
                        >
                          <div>
                            <p className="font-medium text-white">{food.name}</p>
                            <p className="text-xs text-gray-400">
                              {food.servingSize} • {Math.round(food.calories * food.quantity)} kcal
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateFoodQuantity(meal.id, food.id, food.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-white">{food.quantity}</span>
                              <button
                                onClick={() => updateFoodQuantity(meal.id, food.id, food.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFoodFromMeal(meal.id, food.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mb-4 text-center text-sm text-gray-400">No foods added yet</p>
                  )}

                  <button
                    onClick={() => {
                      setActiveMealId(meal.id);
                      setShowAddFoodModal(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-600 py-3 text-sm text-gray-400 hover:border-blue-500 hover:text-blue-400"
                  >
                    <Plus className="h-4 w-4" />
                    Add Food
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add Food Modal */}
        {showAddFoodModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Add Food</h3>
                <button
                  onClick={() => {
                    setShowAddFoodModal(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg bg-gray-700 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="mb-4 max-h-60 overflow-y-auto rounded-lg bg-gray-700">
                  {searchResults.map((food) => (
                    <div
                      key={food.id}
                      className="flex cursor-pointer items-center justify-between border-b border-gray-600 p-3 hover:bg-gray-600"
                      onClick={() => addFoodToMeal(activeMealId!, food)}
                    >
                      <div>
                        <p className="font-medium text-white">{food.name}</p>
                        <p className="text-xs text-gray-400">
                          {food.servingSize} • {food.calories} kcal
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-4 border-t border-gray-700 pt-4">
                <h4 className="mb-3 text-sm font-medium text-gray-400">Add Custom Food</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="food-name" className="mb-1 block text-xs text-gray-400">
                      Food Name
                    </label>
                    <input
                      id="food-name"
                      type="text"
                      value={customFood.name}
                      onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Homemade Smoothie"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="food-calories" className="mb-1 block text-xs text-gray-400">
                        Calories
                      </label>
                      <input
                        id="food-calories"
                        type="number"
                        value={customFood.calories}
                        onChange={(e) => setCustomFood({ ...customFood, calories: Number(e.target.value) })}
                        className="w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="kcal"
                      />
                    </div>
                    <div>
                      <label htmlFor="food-serving" className="mb-1 block text-xs text-gray-400">
                        Serving Size
                      </label>
                      <input
                        id="food-serving"
                        type="text"
                        value={customFood.servingSize}
                        onChange={(e) => setCustomFood({ ...customFood, servingSize: e.target.value })}
                        className="w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 100g, 1 cup"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="food-protein" className="mb-1 block text-xs text-gray-400">
                        Protein (g)
                      </label>
                      <input
                        id="food-protein"
                        type="number"
                        value={customFood.protein}
                        onChange={(e) => setCustomFood({ ...customFood, protein: Number(e.target.value) })}
                        className="w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="food-carbs" className="mb-1 block text-xs text-gray-400">
                        Carbs (g)
                      </label>
                      <input
                        id="food-carbs"
                        type="number"
                        value={customFood.carbs}
                        onChange={(e) => setCustomFood({ ...customFood, carbs: Number(e.target.value) })}
                        className="w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="food-fat" className="mb-1 block text-xs text-gray-400">
                        Fat (g)
                      </label>
                      <input
                        id="food-fat"
                        type="number"
                        value={customFood.fat}
                        onChange={(e) => setCustomFood({ ...customFood, fat: Number(e.target.value) })}
                        className="w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddFoodModal(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomFood}
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                  <Save className="h-4 w-4" />
                  Add Custom Food
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Set Goals Modal */}
        {showGoalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Set Nutrition Goals</h3>
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="goal-calories" className="mb-1 block text-sm font-medium text-gray-300">
                    Daily Calories (kcal)
                  </label>
                  <input
                    id="goal-calories"
                    type="number"
                    value={calorieGoal.calories}
                    onChange={(e) => setCalorieGoal({ ...calorieGoal, calories: Number(e.target.value) })}
                    className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="goal-protein" className="mb-1 block text-sm font-medium text-gray-300">
                      Protein (g)
                    </label>
                    <input
                      id="goal-protein"
                      type="number"
                      value={calorieGoal.protein}
                      onChange={(e) => setCalorieGoal({ ...calorieGoal, protein: Number(e.target.value) })}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="goal-carbs" className="mb-1 block text-sm font-medium text-gray-300">
                      Carbs (g)
                    </label>
                    <input
                      id="goal-carbs"
                      type="number"
                      value={calorieGoal.carbs}
                      onChange={(e) => setCalorieGoal({ ...calorieGoal, carbs: Number(e.target.value) })}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="goal-fat" className="mb-1 block text-sm font-medium text-gray-300">
                      Fat (g)
                    </label>
                    <input
                      id="goal-fat"
                      type="number"
                      value={calorieGoal.fat}
                      onChange={(e) => setCalorieGoal({ ...calorieGoal, fat: Number(e.target.value) })}
                      className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-blue-500/10 p-3">
                  <p className="text-sm text-blue-400">
                    <strong>Tip:</strong> For athletic performance, aim for 1.6-2.2g of protein per kg of bodyweight.
                    Carbs should be 3-5g/kg for moderate training and 5-8g/kg for intense training.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowGoalModal(false)}
                    className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowGoalModal(false)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Save Goals
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