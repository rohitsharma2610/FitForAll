import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FolderRoot as Football,
  Box as Boxing,
  Tent as Tennis,
  ShoppingBasket as Basketball,
  Ticket as Cricket,
  FileWarning as Running,
} from 'lucide-react';
import { cn } from '../lib/utils';

const sports = [
  { id: 'football', name: 'Football', icon: Football },
  { id: 'mma', name: 'MMA', icon: Boxing },
  { id: 'tennis', name: 'Tennis', icon: Tennis },
  { id: 'basketball', name: 'Basketball', icon: Basketball },
  { id: 'cricket', name: 'Cricket', icon: Cricket },
  { id: 'athletics', name: 'Athletics', icon: Running },
];

export function SportsSelection() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = React.useState<string | null>(null);

  const handleContinue = () => {
    if (selectedSport) {
      navigate(`/training/${selectedSport}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-4xl font-bold text-white"
        >
          Choose Your Sport
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => (
            <motion.div
              key={sport.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group cursor-pointer rounded-xl bg-gray-800 p-6 transition-all',
                selectedSport === sport.id && 'ring-2 ring-blue-500'
              )}
              onClick={() => setSelectedSport(sport.id)}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-4 rounded-full bg-gray-700 p-4"
                  animate={{
                    rotate: selectedSport === sport.id ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <sport.icon className="h-12 w-12 text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">{sport.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedSport ? 1 : 0 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedSport}
            className={cn(
              'rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white transition-all',
              selectedSport ? 'hover:bg-blue-600' : 'cursor-not-allowed opacity-50'
            )}
          >
            Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
}