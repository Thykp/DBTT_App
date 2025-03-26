import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const GAME_DURATION = 30; // seconds
const BUBBLE_SIZE = 50;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);

  const translateX = useSharedValue(Math.random() * (SCREEN_WIDTH - BUBBLE_SIZE));
  const translateY = useSharedValue(Math.random() * (SCREEN_HEIGHT - BUBBLE_SIZE - 200));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const handlePress = () => {
    setScore((prev) => prev + 1);
    translateX.value = withSpring(Math.random() * (SCREEN_WIDTH - BUBBLE_SIZE));
    translateY.value = withSpring(Math.random() * (SCREEN_HEIGHT - BUBBLE_SIZE - 200));
  };

  const handleGameOver = () => {
    if (score >= 15) {
      router.push('/rewards');
    } else {
      router.back();
    }
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOverText}>Game Over!</Text>
        <Text style={styles.scoreText}>Final Score: {score}</Text>
        <Text style={styles.resultText}>
          {score >= 15 ? 'Congratulations! You won a reward!' : 'Try again to win a reward!'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGameOver}>
          <Text style={styles.buttonText}>
            {score >= 15 ? 'Claim Reward' : 'Try Again'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.timeText}>Time: {timeLeft}s</Text>
      </View>
      <Animated.View style={[styles.target, animatedStyle]}>
        <TouchableOpacity style={styles.bubble} onPress={handlePress} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  scoreText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  timeText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  target: {
    position: 'absolute',
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    backgroundColor: '#FF4785',
    borderRadius: BUBBLE_SIZE / 2,
  },
  gameOverText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF4785',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});