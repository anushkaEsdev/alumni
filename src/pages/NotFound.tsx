import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Home, RefreshCw, Trophy, X } from 'lucide-react';

const NotFound = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState<{ x: number; y: number; size: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameWon(false);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    
    // Initialize player position
    if (gameAreaRef.current) {
      const gameArea = gameAreaRef.current.getBoundingClientRect();
      setPlayerPosition({
        x: gameArea.width / 2,
        y: gameArea.height / 2
      });
      
      // Set random target position
      setTargetPosition({
        x: Math.random() * (gameArea.width - 30),
        y: Math.random() * (gameArea.height - 30)
      });
      
      // Generate obstacles
      const newObstacles = [];
      for (let i = 0; i < 5; i++) {
        newObstacles.push({
          x: Math.random() * (gameArea.width - 30),
          y: Math.random() * (gameArea.height - 30),
          size: 20 + Math.random() * 30
        });
      }
      setObstacles(newObstacles);
    }
    
    // Start game loop
    gameLoopRef.current = window.setInterval(gameLoop, 100);
    
    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Game loop
  const gameLoop = () => {
    if (!gameAreaRef.current || gameOver) return;
    
    // Check if player reached target
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - targetPosition.x, 2) +
      Math.pow(playerPosition.y - targetPosition.y, 2)
    );
    
    if (distance < 30) {
      // Player reached target
      setScore(prev => prev + 10);
      
      // Set new target position
      const gameArea = gameAreaRef.current.getBoundingClientRect();
      setTargetPosition({
        x: Math.random() * (gameArea.width - 30),
        y: Math.random() * (gameArea.height - 30)
      });
      
      // Check if player won (reached 5 targets)
      if (score >= 40) {
        endGame(true);
      }
    }
    
    // Check collision with obstacles
    for (const obstacle of obstacles) {
      const distance = Math.sqrt(
        Math.pow(playerPosition.x - obstacle.x, 2) +
        Math.pow(playerPosition.y - obstacle.y, 2)
      );
      
      if (distance < obstacle.size / 2 + 15) {
        endGame(false);
        break;
      }
    }
  };
  
  // End game
  const endGame = (won: boolean) => {
    setGameOver(true);
    setGameWon(won);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  };
  
  // Handle keyboard movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      const step = 10;
      let newX = playerPosition.x;
      let newY = playerPosition.y;
      
      switch (e.key) {
        case 'ArrowUp':
          newY -= step;
          break;
        case 'ArrowDown':
          newY += step;
          break;
        case 'ArrowLeft':
          newX -= step;
          break;
        case 'ArrowRight':
          newX += step;
          break;
        default:
          return;
      }
      
      // Keep player within game area
      if (gameAreaRef.current) {
        const gameArea = gameAreaRef.current.getBoundingClientRect();
        newX = Math.max(15, Math.min(gameArea.width - 15, newX));
        newY = Math.max(15, Math.min(gameArea.height - 15, newY));
      }
      
      setPlayerPosition({ x: newX, y: newY });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, gameStarted, gameOver]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full text-center"
      >
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        
        {!gameStarted ? (
          <div className="space-y-6">
            <p className="text-xl mb-8">
              Oops! Looks like you've wandered into uncharted territory.
              <br />
              Play a quick game to find your way back!
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="flex items-center gap-2"
                onClick={startGame}
              >
                <RefreshCw className="h-5 w-5" />
                Start Game
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/">
                  <Home className="h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <p className="font-semibold">Score: {score}</p>
                <p className="font-semibold">Time: {timeLeft}s</p>
              </div>
              
              <div className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={startGame}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Restart
                </Button>
              </div>
            </div>
            
            <div 
              ref={gameAreaRef}
              className="relative w-full h-[400px] bg-card rounded-lg border border-border overflow-hidden"
            >
              {/* Player */}
              <motion.div
                className="absolute w-8 h-8 bg-primary rounded-full z-10"
                style={{
                  left: `${playerPosition.x - 16}px`,
                  top: `${playerPosition.y - 16}px`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Target */}
              {!gameOver && (
                <motion.div
                  className="absolute w-6 h-6 bg-green-500 rounded-full z-10"
                  style={{
                    left: `${targetPosition.x - 12}px`,
                    top: `${targetPosition.y - 12}px`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              {/* Obstacles */}
              {obstacles.map((obstacle, index) => (
                <div
                  key={index}
                  className="absolute bg-destructive/30 rounded-full z-0"
                  style={{
                    left: `${obstacle.x - obstacle.size / 2}px`,
                    top: `${obstacle.y - obstacle.size / 2}px`,
                    width: `${obstacle.size}px`,
                    height: `${obstacle.size}px`,
                  }}
                />
              ))}
              
              {/* Game over message */}
              {gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-20"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    {gameWon ? "You Won! 🎉" : "Game Over"}
                  </h3>
                  <p className="mb-6">
                    {gameWon 
                      ? "You found your way back!" 
                      : "You hit an obstacle. Try again!"}
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      onClick={startGame}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Play Again
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild
                      className="flex items-center gap-2"
                    >
                      <Link to="/">
                        <Home className="h-4 w-4" />
                        Go Home
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Use arrow keys to move. Collect green targets while avoiding red obstacles.</p>
              <p>Collect 5 targets to win!</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NotFound;
