import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Layers } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo and Background */}
      <div className="flex-1 relative bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 flex items-center justify-center overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/20 rotate-45 transform"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-white/20 rotate-12 transform"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-white/20 rotate-45 transform"></div>
          <div className="absolute bottom-1/3 right-1/3 w-20 h-20 border-2 border-white/20 rotate-12 transform"></div>
          
          {/* Abstract triangular shapes */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[70px] border-l-transparent border-r-transparent border-b-white/10 absolute -top-10 -left-10"></div>
              <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-white/15 absolute top-20 right-20"></div>
            </div>
          </div>
          
          {/* Glowing effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-blue-300/20"></div>
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
            onClick={() => window.location.href = "/api/login"}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Sign Up
          </Button>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-600">
            Already have an account? 
            <button 
              onClick={() => window.location.href = "/api/login"}
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
