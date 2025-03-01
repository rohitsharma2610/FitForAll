import React from 'react';
import { 
  Boxes, 
  ChevronRight,
  BarChart3,
  LogOut,
  Dumbbell,
  Crown,
  Trophy,
  Clock,
  Users,
  MessageSquare,
  Heart,
  ShoppingBasket,
  Apple
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';

function Profile() {
  const { user, isLoaded } = useUser();

  // If the user is not loaded or not logged in, show a loading state
  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  // Dynamic user details from Clerk
  const userProfileImage = user.imageUrl || "https://via.placeholder.com/150";
  const userName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.firstName || user.lastName || "User Name";
  const userEmail = user.primaryEmailAddress?.emailAddress || "user@example.com";

  // Mobile number from primaryPhoneNumber
  const mobileNumber = user.primaryPhoneNumber?.phoneNumber || "Mobile number not set";

  // Preferred Sports (string fallback)
  const preferredSports = user.publicMetadata?.preferredSports || "Not set";

  // Safely handle user.createdAt to avoid TypeScript errors
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  const freeFeatures = [
    { icon: Dumbbell, text: "Basic workout tracking" },
    { icon: Users, text: "Community access" },
    { icon: Clock, text: "Training history (30 days)" },
    { icon: MessageSquare, text: "Basic chat support" }
  ];

  const premiumFeatures = [
    { icon: Crown, text: "Advanced analytics" },
    { icon: Trophy, text: "Personalized training plans" },
    { icon: Heart, text: "Health metrics tracking" },
    { icon: Clock, text: "Unlimited history access" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] -right-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-0 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Navigation */}
          <div className="bg-slate-900/70 rounded-2xl p-6 backdrop-blur-xl border border-slate-800/50 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Trophy className="h-10 w-10 text-purple-500" />
                <div className="absolute inset-0 animate-pulse bg-purple-500/20 rounded-lg blur"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                Elite Sports
              </h1>
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
              {/* {[
                { icon: BarChart3, text: 'Progress', active:'' },
                { icon: Dumbbell, text: 'Choose Sports' },
                { icon: Settings, text: 'Settings' },
                { icon: LogOut, text: 'Logout' }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all  ${
                    item.active
                      ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/10'
                      : 'text-gray-400 hover:bg-slate-800/50 hover:text-purple-400'
                  }`}
                >
                  <div className="flex items-center gap-3">s
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.text}</span>
=======
            <div className="space-y-3">
              {/* Progress Button */}
              <Link to="/progressTracker">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-slate-800/50 hover:text-purple-400">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5" />
                    <span className="font-medium">Progress</span>
>>>>>>> 455da66d5b5aaeb27b60a48820bc3293a9fd4842
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform rotate-90" />
                </button>
              </Link>

              {/* Choose Sports Button */}
              <Link to="/sports">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-slate-800/50 hover:text-purple-400">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="h-5 w-5" />
                    <span className="font-medium">Choose Sports</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform" />
                </button>
              </Link>

              {/* Market Button */}
              <Link to="/market">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-slate-800/50 hover:text-purple-400">
                  <div className="flex items-center gap-3">
                    <ShoppingBasket className="h-5 w-5" />
                    <span className="font-medium">Market</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform" />
                </button>
              </Link>

              {/* Calorie Counter Button */}
              <Link to="/calorie">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-slate-800/50 hover:text-purple-400">
                  <div className="flex items-center gap-3">
                    <Apple className="h-5 w-5" />
                    <span className="font-medium">Calorie Counter</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform" />
                </button>
              </Link>

              {/* Logout Button (For navigation, if any) */}
              <Link to="/">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-slate-800/50 hover:text-purple-400">
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Center Section - App Description & Features */}
          <div className="space-y-6">
            <div className="bg-slate-900/70 rounded-2xl p-6 backdrop-blur-xl border border-slate-800/50 shadow-xl">
<<<<<<< HEAD
            <Trophy className="h-10 w-10 text-purple-500 inline mr-2 pb-2" />
                {/* <div className="absolute inset-0 animate-pulse bg-purple-500/20 rounded-lg blur"></div> */}

                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent  inline">
                Elite Sports
=======
              <Trophy className="h-10 w-10 text-purple-500 inline mr-2 pb-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent inline">
                FitForAll
>>>>>>> 455da66d5b5aaeb27b60a48820bc3293a9fd4842
              </h1>
              <div className="block">
                <Crown className="h-4 w-4 text-yellow-600 inline mr-2" />
                <span className="text-sm text-yellow-500 inline">Premium Applied</span>
              </div>

              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
                Your Fitness Journey Starts Here
              </h2>
              <p className="text-gray-400 leading-relaxed">
                FitForAll is your all-in-one fitness companion, designed to help you achieve your health and fitness goals. 
                Whether you're a beginner or an experienced athlete, our platform adapts to your needs and provides 
                personalized guidance every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Free Features */}
              <div className="bg-slate-900/70 rounded-2xl p-6 backdrop-blur-xl border border-slate-800/50 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  Core Features
                  <span className="text-sm font-normal text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    Free
                  </span>
                </h3>
                <div className="space-y-4">
                  {freeFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex justify-between gap-3 text-gray-400 group hover:text-emerald-400 transition-colors"
                    >
                      <feature.icon className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div className="bg-slate-900/70 rounded-2xl p-6 backdrop-blur-xl border border-purple-500/20 shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  Premium Features
                  <Crown className="h-4 w-4 text-purple-400" />
                </h3>
                <div className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-400 group/item hover:text-purple-400 transition-colors"
                    >
                      <feature.icon className="h-5 w-5 text-purple-400 group-hover/item:scale-110 transition-transform" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
                <button className="text-purple-400 border-2 m-3 p-3 rounded-2xl border-gray-400 hover:text-gray-400 hover:border-purple-400">
                  Buy Premium
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - User Profile (Clerk Data Integrated) */}
          <div className="bg-slate-900/70 rounded-2xl backdrop-blur-xl border border-slate-800/50 shadow-xl overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
            <Boxes className="h-10 w-10 text-purple-500" />
            <div className="absolute inset-0 animate-pulse bg-purple-500/20 rounded-lg blur"></div>
            <div className="p-6 -mt-12 relative">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={userProfileImage}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-slate-900 shadow-xl"
                />
                <div>
                  <h2 className="text-xl font-semibold text-white">{userName}</h2>
                  <p className="text-gray-400">{userEmail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-emerald-400">Online</span>
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-500">Premium Applied</span>
                  </div>
                </div>
              </div>

              {/* Safely handle user.createdAt */}
              {/*
                If user.createdAt can be null, we convert it safely:
                const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";
              */}
              <div className="space-y-4">
                {[
                  { label: "Member Since", value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A" },
                  { label: "Preferred Sports", value: preferredSports },
                  { label: "Mobile Number", value: mobileNumber }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-800/50 pb-3 hover:bg-slate-800/20 p-2 rounded transition-colors"
                  >
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-white">{String(item.value)}</p>

                  </div>
                ))}
              </div>

              {/* Sign Out Button */}
              <SignOutButton>
                <button 
                  className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all bg-red-500 hover:bg-red-600 text-white"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </SignOutButton>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 rounded-lg p-4 hover:bg-purple-500/20 transition-colors">
                  <h4 className="text-purple-400 text-sm">Workouts</h4>
                  <p className="text-2xl font-semibold text-white">248</p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 hover:bg-purple-500/20 transition-colors">
                  <h4 className="text-purple-400 text-sm">Active Days</h4>
                  <p className="text-2xl font-semibold text-white">186</p>
                </div>
              </div>
            </div>
          </div>
          {/* End of Right Section */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
