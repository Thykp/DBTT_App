import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sarah Parker</Text>
        <Text style={styles.status}>POPMART Collector</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Figures</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Rewards</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Games Won</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Collection</Text>
        <View style={styles.collectionGrid}>
          <View style={styles.collectionItem}>
            <Text style={styles.itemTitle}>LABUBU</Text>
            <Text style={styles.itemCount}>5 figures</Text>
          </View>
          <View style={styles.collectionItem}>
            <Text style={styles.itemTitle}>DIMOO</Text>
            <Text style={styles.itemCount}>3 figures</Text>
          </View>
          <View style={styles.collectionItem}>
            <Text style={styles.itemTitle}>MOLLY</Text>
            <Text style={styles.itemCount}>2 figures</Text>
          </View>
          <View style={styles.collectionItem}>
            <Text style={styles.itemTitle}>SKULLPANDA</Text>
            <Text style={styles.itemCount}>2 figures</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF4785',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: -20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  collectionItem: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  itemCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EF4444',
  },
});