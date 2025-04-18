import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import popmartImage from '../../assets/images/popmart.png';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={popmartImage}
          style={styles.banner}
          resizeMode="cover"
          onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}
        />
        <Text style={styles.title}>Welcome to POPMART</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Start Your Adventure</Text>
        <Link href="/scan" asChild>
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>Scan Your Toy</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>LABUBU</Text>
            <Text style={styles.featureDescription}>Scan your LABUBU toy to play</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>DIMOO</Text>
            <Text style={styles.featureDescription}>Play with your DIMOO character</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>MOLLY</Text>
            <Text style={styles.featureDescription}>Join Molly's adventure</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>SKULLPANDA</Text>
            <Text style={styles.featureDescription}>Explore with SKULLPANDA</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    height: 200,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#FF4785',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});