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
    <>
    <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-center text-8xl font-bold text-cyan-500   bg-gray-900 py-20 px-8 m-0 "
        >
          Choose Your Sport
        </motion.h2>
    <div className="flex flex-row min-h-screen bg-gray-900 py-20 px-8">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      {/* Left Section - Images & Icons */}
      <div className="w-1/2 flex flex-col items-center justify-center p-6">
        <motion.img
          src="https://www.shutterstock.com/shutterstock/photos/1402244102/display_1500/stock-photo-sport-collage-made-of-different-photos-of-models-tennis-running-badminton-soccer-and-1402244102.jpg"
          alt="Sports"
          className="rounded-2xl shadow-lg w-fit h-auto  mb-9 "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
         <motion.p
          className="text-white text-lg text-center mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          "Unlock your potential. Choose your sport and begin training!"
        </motion.p>

        <motion.img
          src="https://thumbs.dreamstime.com/z/creative-collage-young-people-men-women-motion-practicing-performing-different-sports-against-dark-background-abstract-338809764.jpg?ct=jpeg"
          alt="Sports"
          className="rounded-2xl shadow-lg w-fit h-auto  mb-6 "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
       
      </div>

      {/* Right Section - Sport Selection */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        
        <div className="grid grid-cols-2 gap-6">
          {sports.map((sport) => (
            <motion.div
              key={sport.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'h-72 w-72 group cursor-pointer rounded-xl bg-gray-800 p-6 transition-all flex flex-col items-center justify-center',
                selectedSport === sport.id && 'ring-2 ring-blue-500'
              )}
              onClick={() => setSelectedSport(sport.id)}
            >
              <motion.div
                className="mb-4 rounded-full bg-gray-700 p-4"
                animate={{ rotate: selectedSport === sport.id ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <sport.icon className="h-12 w-12 text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">{sport.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedSport ? 1 : 0 }}
          className="mt-8"
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
    </>
  );
}
