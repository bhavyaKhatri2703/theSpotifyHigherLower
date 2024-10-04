import React, { useState, useEffect } from 'react';
import { getRandomArtist } from './spotifyService';

export default function ArtistComparison() {
  const [leftArtist, setLeftArtist] = useState(null);
  const [rightArtist, setRightArtist] = useState(null);
  const [score, setScore] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const loadArtists = async () => {
      const artist1 = await getRandomArtist();
      const artist2 = await getRandomArtist();
      setLeftArtist(artist1);
      setRightArtist(artist2);
      setScore(0);
      setGameOver(false);
    };

    loadArtists();
  }, []);

  const HigherClicked = async () => {
    if (isAnimating || gameOver) return;

    if (leftArtist.followers.total <= rightArtist.followers.total) {
      setScore(score + 1);
      triggerAnimation('correct');
      setLeftArtist(rightArtist);
      const newArtist = await getRandomArtist();
      setRightArtist(newArtist);
    } else {
      triggerAnimation('wrong');
      setTimeout(() => setGameOver(true), 2000); 
    }
  };

  const LowerClicked = async () => {
    if (isAnimating || gameOver) return;

    if (leftArtist.followers.total >= rightArtist.followers.total) {
      setScore(score + 1);
      triggerAnimation('correct');
      setLeftArtist(rightArtist);
      const newArtist = await getRandomArtist();
      setRightArtist(newArtist);
    } else {
      triggerAnimation('wrong');
      setTimeout(() => setGameOver(true), 2000); 
    }
  };

  const triggerAnimation = (result) => {
    setAnimationClass(result);
    setIsAnimating(true);
    setTimeout(() => {
      setAnimationClass('');
      setIsAnimating(false);
    }, 2000);
  };

  const handlePlayAgain = async () => {
    const artist1 = await getRandomArtist();
    const artist2 = await getRandomArtist();
    setLeftArtist(artist1);
    setRightArtist(artist2);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center relative overflow-hidden">
      {gameOver ? (
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          style={{
            backgroundImage: 'url(https://www.icegif.com/wp-content/uploads/2022/09/icegif-1221.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 className="text-6xl font-bold text-red-600 mb-4">Game Over!</h1>
          <p className="text-4xl font-bold text-white text-with-shadow mb-4">Your Score: {score}</p>
          <button
            className="bg-green-500 text-white font-bold text-2xl rounded-full px-4 py-2 hover:bg-green-600"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {leftArtist && (
            <div
              className="w-1/2 h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${leftArtist.images[0].url})` }}
            >
              <div className="z-10 flex flex-col items-center text-white text-center">
                <h2 className="text-7xl font-bold text-with-shadow m-5">{leftArtist.name}</h2>
                <p className="text-with-shadow text-3xl font-bold">Has</p>
                <h3 className="text-7xl m-5 font-bold text-with-shadow">{leftArtist.followers.total}</h3>
                <p className="text-with-shadow text-3xl font-bold">followers</p>
              </div>
            </div>
          )}

          {rightArtist && (
            <div
              className="w-1/2 h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${rightArtist.images[0].url})` }}
            >
              <div className="z-10 flex flex-col items-center text-white text-center relative">
                <h2 className="text-7xl font-bold text-with-shadow m-5">{rightArtist.name}</h2>
                <p className="text-with-shadow text-3xl font-bold">Has</p>
                <button
                  className="bg-transparent border-white border-4 rounded-3xl font-bold text-with-shadow text-4xl border-solid w-64 h-16 relative top-8 mb-3px hover:border-orange-300 hover:text-orange-300"
                  onClick={HigherClicked}
                  disabled={isAnimating}
                >
                  Higher
                </button>
                <button
                  className="bg-transparent border-white border-4 rounded-3xl font-bold text-with-shadow text-4xl border-solid w-64 h-16 mt-3 relative top-8 hover:border-orange-300 hover:text-orange-300"
                  onClick={LowerClicked}
                  disabled={isAnimating}
                >
                  Lower
                </button>
              </div>
            </div>
          )}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <div
              className={`w-full h-full flex items-center justify-center text-2xl font-bold text-black transition-colors duration-500 ${
                animationClass === 'correct' ? 'bg-green-500' : animationClass === 'wrong' ? 'bg-red-500' : 'bg-white'
              }`}
            >
              <span className={`v-s-text ${animationClass}`}>v/s</span>
            </div>
            <div
              className={`absolute bottom-0 left-0 w-full h-full transition-transform duration-500 ${
                animationClass === 'correct' ? 'bg-green-500 transform -translate-y-full' : animationClass === 'wrong' ? 'bg-red-500 transform -translate-y-full' : 'bg-white transform translate-y-full'
              }`}
            ></div>
          </div>

          <div className="fixed bottom-10 right-10 z-10">
            <p className="text-4xl text-white font-bold animate-score">{score}</p>
          </div>
        </>
      )}
    </div>
  );
}
