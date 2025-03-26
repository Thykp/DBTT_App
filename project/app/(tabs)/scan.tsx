import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { router } from 'expo-router';
import { Camera, Loader as Loader2 } from 'lucide-react-native';

export default function ScanScreen() {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const scanLineAnim = new Animated.Value(0);

  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [scanning]);

  const handleScan = () => {
    setScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScanComplete(true);
      setTimeout(() => {
        router.push('/game');
      }, 500);
    }, 2000);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Camera size={64} color="#FF4785" style={styles.icon} />
          <Text style={styles.title}>Scan Your POPMART Toy</Text>
          <Text style={styles.description}>
            To scan your toy's barcode, please use the POPMART mobile app on your iOS or Android device.
          </Text>
          
          <TouchableOpacity style={styles.demoButton} onPress={handleScan}>
            <Text style={styles.demoButtonText}>Demo: Simulate Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <View style={styles.container}>
      <View style={styles.cameraPreview}>
        {scanning && (
          <Animated.View 
            style={[
              styles.scanLine,
              {
                transform: [{ translateY }],
              },
            ]} 
          />
        )}
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </View>

      <View style={styles.bottomContent}>
        {scanComplete ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>POPMART Figure Detected!</Text>
            <Loader2 size={24} color="#FF4785" style={styles.loadingIcon} />
          </View>
        ) : (
          <>
            <Text style={styles.instructions}>
              Position the barcode within the frame
            </Text>
            <TouchableOpacity 
              style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
              onPress={handleScan}
              disabled={scanning}
            >
              <Text style={styles.scanButtonText}>
                {scanning ? 'Scanning...' : 'Start Scan'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cameraPreview: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1a1a1a',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FF4785',
    backgroundColor: 'transparent',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FF4785',
    zIndex: 1,
  },
  bottomContent: {
    padding: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  instructions: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#FF4785',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  scanButtonDisabled: {
    backgroundColor: '#FF4785',
    opacity: 0.5,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  successText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  loadingIcon: {
    transform: [{ rotate: '360deg' }],
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: 32,
  },
  demoButton: {
    backgroundColor: '#FF4785',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});