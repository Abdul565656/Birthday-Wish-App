'use client' // Enables client-side rendering for this component

// Import necessary dependencies
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

// Define type for Confetti component props
type ConfettiProps = {
  width: number
  height: number
}

// Dynamically import Confetti component
const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

// Define color arrays for candles, balloons, and confetti
const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

export default function BirthdayWish() {
  // State variables
  const [candlesLit, setCandlesLit] = useState<number>(0) // Number of lit candles
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0) // Number of popped balloons
  const [showConfetti, setShowConfetti] = useState<boolean>(false) // Whether to show confetti
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 }) // Window size for confetti
  const [celebrating, setCelebrating] = useState<boolean>(false) // Whether celebration has started

  // Constants
  const totalCandles: number = 5 // Total number of candles
  const totalBalloons: number = 5 // Total number of balloons

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Effect to show confetti when all candles are lit and balloons are popped
  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  // Function to light a candle
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  // Function to pop a balloon
  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  // Function to start celebration
  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 500)
  }

  return (
    // Main container with animated gradient background
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-xy">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-pink-300 opacity-70 filter blur-xl animate-float-x"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-purple-300 opacity-70 filter blur-xl animate-float-y"></div>
      <div className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full bg-red-300 opacity-70 filter blur-xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
  
      {/* Animated wrapper for the card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Birthday card */}
        <Card className="mx-auto overflow-hidden transition-transform duration-500 ease-in-out hover:shadow-2xl transform hover:-translate-y-2 border-4 border-transparent bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg rounded-3xl">
          {/* Glowing border */}
          <div className="absolute inset-0 w-full h-full border-4 rounded-3xl border-white opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
  
          {/* Card header with birthday message */}
          <CardHeader className="text-center py-8 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 rounded-t-3xl shadow-xl relative z-10">
            <CardTitle className="text-5xl font-extrabold text-white tracking-wide drop-shadow-md animate-glow">
              Happy 18th Birthday!
            </CardTitle>
            <CardDescription className="text-3xl font-semibold text-gray-200 mt-3 animate-fade-in">
              Abdullah Kashif
            </CardDescription>
            <p className="text-lg text-gray-300 mt-2 animate-fade-in">July 16th</p>
          </CardHeader>
          
          {/* Card content with candles and balloons */}
          <CardContent className="space-y-10 text-center py-6 px-8 bg-white/50 backdrop-blur-md rounded-b-3xl relative">
            {/* Candles section */}
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-4">Light the Candles:</h3>
              <div className="flex justify-center space-x-4">
                {/* Map through candles */}
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.4 : 0 }}
                      >
                        {/* Lit candle */}
                        <FaBirthdayCake
                          className={`w-10 h-10 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-125 glow-on-hover`}
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      // Unlit candle
                      <FaBirthdayCake
                        className={`w-10 h-10 text-gray-300 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-125`}
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            
            {/* Balloons section */}
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-4">Pop the Balloons:</h3>
              <div className="flex justify-center space-x-4">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="glow-on-hover"
                  >
                    <GiBalloons
                      className={`w-10 h-10 cursor-pointer hover:scale-125`}
                      style={{ color: index < balloonsPoppedCount ? '#E2E8F0' : balloonColors[index % balloonColors.length] }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
  
          {/* Card footer with celebrate button */}
          <CardFooter className="flex justify-center py-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 rounded-b-3xl shadow-xl relative z-10">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 glow-on-hover"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-3 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
  
      {/* Confetti component */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={800}
          colors={confettiColors}
          className="z-20"
        />
      )}
    </div>
  )
}  