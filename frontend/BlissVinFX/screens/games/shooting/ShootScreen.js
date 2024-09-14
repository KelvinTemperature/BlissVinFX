import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ShootScreen = () => {
  const [score, setScore] = useState(0);
  const [terroristPos, setTerroristPos] = useState({ top: 100, left: 100 });
  const [bloodSpot, setBloodSpot] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  // Function to handle random movement of terrorist
  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        const randTop = Math.random() * (screenHeight - 100);
        const randLeft = Math.random() * (screenWidth - 100);
        setTerroristPos({ top: randTop, left: randLeft });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setScore(0); // Reset score when game starts
  };

  // Handle shooting and scoring
  const handleShoot = (e) => {
    const bloodSpotSize = 50;

    setBloodSpot({
        x: e.nativeEvent.pageX - bloodSpotSize / 2,
        y: e.nativeEvent.pageY - bloodSpotSize / 2
    });
    
    // Check if the user clicked on the terrorist
    const { pageX, pageY } = e.nativeEvent;
    if (
      pageX >= terroristPos.left &&
      pageX <= terroristPos.left + 100 &&
      pageY >= terroristPos.top &&
      pageY <= terroristPos.top + 100
    ) {
      setScore(score + 1);
    }
  };

   // Update cursor position on touch
   const handleCursorMove = (e) => {
    setCursorPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
  };

  return (
    <TouchableWithoutFeedback onPress={handleShoot}>
      <View style={styles.container}>
      <ImageBackground
          source={require('./assets/wall.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
        
        {!gameStarted ? (
          <TouchableOpacity onPress={startGame} style={styles.startBtn}>
            <Text style={styles.startBtnText}>START GAME</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.score}>SCORE: {score}</Text>
        )}

        {gameStarted && (
          <Image
            source={require('./assets/terrorist.png')}
            style={[styles.terrorist, { top: terroristPos.top, left: terroristPos.left }]}
          />
        )}

        {bloodSpot && (
          <Image
            source={require('./assets/blood-spot.png')}
            style={[styles.bloodSpot, { top: bloodSpot.y, left: bloodSpot.x }]}
          />
        )}

        {/* Crosshair Cursor */}
            <Image
            source={require('./assets/crosshair.png')}
            style={[styles.cursor, { top: cursorPos.y, left: cursorPos.x }]}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },
  startBtn: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  startBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  score: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    top: 50,
  },
  terrorist: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  bloodSpot: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  cursor: {
    position: 'absolute',
    width: 70,
    height: 70,
    zIndex: 2,
    transform: [{ translateX: -35 }, { translateY: -35 }], // Center the cursor on the touch point
  },
});

export default ShootScreen;
