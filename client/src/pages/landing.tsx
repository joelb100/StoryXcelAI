import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Layers } from "lucide-react";
import animatedBgGif from "@assets/animatedBG_1753651803819.gif";

export default function Landing() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo and Animated Background */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <img 
            src={animatedBgGif}
            alt="StoryXcel Animated Background"
            className="w-full h-full object-cover"
            style={{ 
              imageRendering: 'auto',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
            onError={(e) => {
              // Fallback to gradient background if GIF fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.className += ' bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700';
              }
            }}
          />
          
          {/* Fallback gradient overlay for browsers that don't support the GIF */}
          <noscript>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700"></div>
          </noscript>
          
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* StoryXcel Logo */}
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-6xl font-black text-cyan-500">X</span>
            </div>
          </div>
          
          <div className="text-white">
            <h1 className="text-6xl font-black mb-2 tracking-wider">
              STORY<span className="text-cyan-200">X</span>CEL
            </h1>
            <p className="text-xl font-medium tracking-wide opacity-90">
              Creative Project Management
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-96 bg-white flex flex-col justify-center px-8 py-12">
        <div className="mb-8">
          {/* Small Logo */}
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl font-black text-white">X</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to StoryXcel</h2>
          <p className="text-gray-600">Sign in to start creating amazing projects</p>
        </div>

        <div className="space-y-6">
          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Input 
                type="text"
                placeholder="Enter your first name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Input 
                type="text"
                placeholder="Enter your last name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input 
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input 
                type="password"
                placeholder="Create a password"
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to terms and opt-ins unless chosen others
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <Button 
            onClick={() => window.location.href = "/"}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Sign Up
          </Button>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-600">
            Already have an account? 
            <button 
              onClick={() => window.location.href = "/"}
              className="ml-1 text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign in →
            </button>
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
