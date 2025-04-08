'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import team1 from '@/public/images/team1.jpg';


export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const testimonials = [
    {
      quote: "Room.me has transformed how our remote team communicates. The video quality is outstanding and the interface is intuitive. It's made our daily standups much more engaging!",
      author: "Alex Chen - Engineering Lead"
    },
    {
      quote: "We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has become an essential tool for our team.",
      author: "Sarah Markivoc - Project Manager"
    },
    {
      quote: "The breakout room feature is a game-changer for our workshops. Room.me has helped us create the same collaborative atmosphere online.",
      author: "Michael Rodriguez - Training Director"
    }
  ];

  // Auto slide for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate required fields
    if (!email || !password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    if (email === 'test@visionexdigital.com.au' && password === 'password123') {
      login(email);
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-6xl min-h-[600px] flex rounded-lg overflow-hidden shadow-2xl bg-white dark:bg-gray-900">
        {/* Left panel - Login form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-black p-6 flex flex-col">
          <div className="mb-4 flex items-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center mr-2">
              <Image 
                src="/images/room-me-logo.svg" 
                alt="Room.me Logo" 
                width={24} 
                height={24}
                className="text-white"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">ROOM.ME</span>
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back to Room.me!</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Room.me is an innovative video conference product that
              revolutionizes virtual meetings.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
            {error && (
              <div className="p-2 bg-red-900/30 border border-red-800 text-red-400 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember" className="ml-2 block text-xs text-gray-600 dark:text-gray-400">
                  Remember for 30 days
                </label>
              </div>
              <a href="#" className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                Forgot password
              </a>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                  <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                </svg>
                Sign in with Google
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              Don&apos;t have account?{' '}
              <Link href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                Sign up
              </Link>
            </div>
          </form>
        </div>
        
        {/* Right panel - Image and testimonial */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-100 dark:bg-gray-900">
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={team1}
              alt="Team collaboration"
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
          {/* Testimonial overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg mb-6">
              <div className="relative h-28 overflow-y-auto">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className={`transition-opacity duration-500 absolute inset-0 ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <p className="text-base text-white mb-2 line-clamp-4">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-sm text-white font-medium">&quot;{testimonial.author}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slider indicators */}
            <div className="flex justify-center space-x-2 mb-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 ${
                    index === currentSlide ? 'w-6 bg-white' : 'w-3 bg-gray-400'
                  } rounded-full transition-all duration-300`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}