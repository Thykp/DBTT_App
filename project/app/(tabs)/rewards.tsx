import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function RewardsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Rewards</Text>
      </View>

      <View style={styles.rewardCard}>
        <Text style={styles.rewardTitle}>Game Winner!</Text>
        <Text style={styles.rewardCode}>POPMART2024</Text>
        <Text style={styles.rewardDescription}>
          Use this code to get 10% off your next POPMART purchase!
        </Text>
        <Text style={styles.validUntil}>Valid until: December 31, 2024</Text>
      </View>

      <View style={styles.upcomingRewards}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <View style={styles.rewardItem}>
          <Text style={styles.rewardItemTitle}>Win 20% Off</Text>
          <Text style={styles.rewardItemDescription}>
            Score 20 points in the bubble game
          </Text>
        </View>
        <View style={styles.rewardItem}>
          <Text style={styles.rewardItemTitle}>Free DIMOO Figure</Text>
          <Text style={styles.rewardItemDescription}>
            Collect 5 different DIMOO figures
          </Text>
        </View>
        <View style={styles.rewardItem}>
          <Text style={styles.rewardItemTitle}>Limited Edition LABUBU</Text>
          <Text style={styles.rewardItemDescription}>
            Win 10 games in a row
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF4785',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 40,
  },
  rewardCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF4785',
  },
  rewardTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  rewardCode: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FF4785',
    marginBottom: 10,
  },
  rewardDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 10,
  },
  validUntil: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  upcomingRewards: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  rewardItem: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rewardItemTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  rewardItemDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});