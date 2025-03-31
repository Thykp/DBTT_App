import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Image, 
  Alert,
  Modal,
  ScrollView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: any; // Update type to handle both string and require
  votes: number;
  timestamp: number;
}

// First, add a Comment interface
interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
  likes: number;
}

// Update PostDetail interface to include actual comments
interface PostDetail extends Post {
  description: string;
  comments: Comment[]; // Change this from number to Comment[]
  author: string;
  timePosted: string;
}

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setNewPost('');
    setNewImage(null);
  };

  // Hardcode initial posts themed around POPMART figurines
  useEffect(() => {
    const initialPosts: Post[] = [
      {
        id: '1',
        title: 'My Limited Edition POPMART Figurine!',
        content: 'I just got this limited edition figurine and I am so excited about it. The colors and details are amazing!',
        votes: 8,
        imageUrl: require('../../assets/images/dbtt1.jpg'),
        timestamp: Date.now() - 600000, // 10 minutes ago
      },
      {
        id: '2',
        title: 'Rare POPMART Collection',
        content: 'Check out my rare POPMART collection. Each figurine has a unique style and character.',
        votes: 12,
        imageUrl: require('../../assets/images/dbtt2.jpeg'),
        timestamp: Date.now() - 300000, // 5 minutes ago
      },
      {
        id: '3',
        title: 'Custom POPMART Figurine Setup',
        content: 'I arranged my POPMART figurines in a cool display at home. Love how they brighten up my space!',
        votes: 15,
        imageUrl: require('../../assets/images/dbtt3.jpg'),
        timestamp: Date.now() - 100000, // just now
      },
      {
        id: '4',
        title: 'My DIMOOOOOOO',
        content: 'He is so cute with the clothes!',
        votes: 5,
        imageUrl: require('../../assets/images/dbtt4.webp'),
        timestamp: Date.now() - 100000, // just now
      },
    ];

    setPosts(initialPosts);
  }, []);

  // Opens the image library so the user can pick an image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permissions are needed to select an image.');
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setNewImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Adds a new post if there is text or an image
  const addPost = () => {
    if (newPost.trim().length === 0 && !newImage) {
      Alert.alert('Empty Post', 'Please add text or select an image before posting.');
      return;
    }
    const post: Post = {
      id: Date.now().toString(),
      title: newPost,
      content: newPost,
      votes: 0,
      imageUrl: newImage || undefined,
      timestamp: Date.now(),
    };
    setPosts([post, ...posts]);
    closeModal();
  };

  const handleUpvote = (postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, votes: post.votes + 1 } : post
      )
    );
  };

  const handleDownvote = (postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, votes: post.votes - 1 } : post
      )
    );
  };

  // Add this function to generate sample comments
  const generateComments = (postId: string): Comment[] => {
    const sampleComments: { [key: string]: Comment[] } = {
      '1': [
        {
          id: '1-1',
          author: 'ToyCritic',
          text: 'The paint job on this one is incredible! Which store did you find it in?',
          timestamp: Date.now() - 300000,
          likes: 5,
        },
        {
          id: '1-2',
          author: 'CollectorPro',
          text: 'I have been looking for this edition everywhere! So jealous!',
          timestamp: Date.now() - 200000,
          likes: 3,
        },
      ],
      '2': [
        {
          id: '2-1',
          author: 'POPMARTExpert',
          text: 'That Midnight Dreams series is one of their best releases. Great collection!',
          timestamp: Date.now() - 250000,
          likes: 7,
        },
        {
          id: '2-2',
          author: 'ArtToy_Fan',
          text: 'How long did it take you to complete this collection?',
          timestamp: Date.now() - 150000,
          likes: 4,
        },
      ],
      '3': [
        {
          id: '3-1',
          author: 'DisplayMaster',
          text: 'The lighting setup is perfect! What LED strips are you using?',
          timestamp: Date.now() - 180000,
          likes: 6,
        },
        {
          id: '3-2',
          author: 'ToyPhotographer',
          text: 'Love the arrangement! The depth really shows off each piece.',
          timestamp: Date.now() - 120000,
          likes: 8,
        },
      ],
      '4': [
        {
          id: '4-1',
          author: 'DimooLover',
          text: 'This winter series is absolutely precious! The scarf details are amazing.',
          timestamp: Date.now() - 90000,
          likes: 4,
        },
        {
          id: '4-2',
          author: 'ToyCollector22',
          text: 'I need this for my collection! Is this from the latest release?',
          timestamp: Date.now() - 60000,
          likes: 3,
        },
      ],
    };
    return sampleComments[postId] || [];
  };

  // Update the openDetailModal function
  const openDetailModal = (post: Post) => {
    const detailedPost: PostDetail = {
      ...post,
      description: getPostDescription(post.id),
      comments: generateComments(post.id), // Use the actual comments array
      author: getPostAuthor(post.id),
      timePosted: getTimePosted(post.timestamp),
    };
    setSelectedPost(detailedPost);
    setDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedPost(null);
  };

  // Helper functions for post details
  const getPostDescription = (postId: string) => {
    const descriptions: { [key: string]: string } = {
      '1': "Just received this amazing limited edition POPMART figurine from their latest blind box series! The attention to detail is incredible - from the metallic paint finish to the intricate accessories. This one is from the 'Fantastic World' collection, and it's even more beautiful in person. The translucent parts catch the light perfectly!",
      '2': "Been collecting POPMART figures for over a year now, and these are some of my absolute favorites. Each one tells its own story, and the quality is consistently outstanding. The middle one is from the rare 'Midnight Dreams' series - took me months to find it!",
      '3': "Finally finished setting up my POPMART display corner! Used LED lighting to highlight each figure's unique features. The glass cabinet keeps them dust-free while showing off the collection perfectly. What do you think about the arrangement?",
      '4': "My newest DIMOO addition! The winter outfit series is absolutely adorable. The little scarf and earmuffs are so detailed, and the rosy cheeks add such a cute touch. Definitely one of my favorite designs from this collection!",
    };
    return descriptions[postId] || "No detailed description available.";
  };

  const getPostAuthor = (postId: string) => {
    const authors: { [key: string]: string } = {
      '1': "PopMartLover",
      '2': "CollectorKing",
      '3': "ArtisticDisplay",
      '4': "DimooFanatic",
    };
    return authors[postId] || "Anonymous";
  };

  const getTimePosted = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Add this function to handle adding new comments
  const handleAddComment = (postId: string) => {
    if (newComment.trim().length === 0) {
      Alert.alert('Empty Comment', 'Please write something before posting.');
      return;
    }

    if (selectedPost) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: 'You', // You can change this to the actual user's name when you have authentication
        text: newComment,
        timestamp: Date.now(),
        likes: 0,
      };

      const updatedPost = {
        ...selectedPost,
        comments: [newCommentObj, ...selectedPost.comments],
      };
      setSelectedPost(updatedPost);
      setNewComment(''); // Clear the input
    }
  };

  // Render each individual post with image (if available)
  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity 
      style={styles.postContainer}
      onPress={() => openDetailModal(item)}
    >
      {item.imageUrl && (
        <Image 
          source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl} 
          style={styles.postImage} 
        />
      )}
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.votingContainer}>
        <TouchableOpacity onPress={() => handleUpvote(item.id)}>
          <AntDesign 
            name="caretup" 
            size={24} 
            color={item.votes > 0 ? "#FF4785" : "black"} 
          />
        </TouchableOpacity>
        <Text style={[
          styles.voteCount,
          item.votes > 0 ? styles.positiveVotes : 
          item.votes < 0 ? styles.negativeVotes : {}
        ]}>
          {item.votes}
        </Text>
        <TouchableOpacity onPress={() => handleDownvote(item.id)}>
          <AntDesign 
            name="caretdown" 
            size={24} 
            color={item.votes < 0 ? "#FF4785" : "black"} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Add a comment rendering component
  const CommentItem = ({ comment }: { comment: Comment }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{comment.author}</Text>
        <Text style={styles.commentTime}>{getTimePosted(comment.timestamp)}</Text>
      </View>
      <Text style={styles.commentText}>{comment.text}</Text>
      <View style={styles.commentFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign name="like2" size={16} color="#666" />
          <Text style={styles.likeCount}>{comment.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No posts yet. Create one!</Text>}
      />

      {/* New Post Button fixed at the bottom */}
      <TouchableOpacity style={styles.fab} onPress={openModal}>
        <Text style={styles.fabText}>New Post</Text>
      </TouchableOpacity>

      {/* Modal for creating a new post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TextInput
                style={styles.modalInput}
                value={newPost}
                onChangeText={setNewPost}
                placeholder="Show off your POPMART figurine..."
                multiline
              />
              <TouchableOpacity onPress={pickImage} style={styles.modalImageButton}>
                <Text style={styles.modalImageButtonText}>Upload Image</Text>
              </TouchableOpacity>
              {newImage && (
                <Image source={{ uri: newImage }} style={styles.modalPreviewImage} resizeMode="cover" />
              )}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={addPost} style={styles.modalPostButton}>
                  <Text style={styles.modalPostButtonText}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.modalCancelButton}>
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add the detail modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={closeDetailModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModalContainer}>
            <ScrollView>
              {selectedPost && (
                <>
                  {selectedPost.imageUrl && (
                    <Image 
                      source={typeof selectedPost.imageUrl === 'string' 
                        ? { uri: selectedPost.imageUrl } 
                        : selectedPost.imageUrl
                      } 
                      style={styles.detailImage} 
                    />
                  )}
                  <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{selectedPost.title}</Text>
                    <View style={styles.authorRow}>
                      <Text style={styles.authorText}>Posted by {selectedPost.author}</Text>
                      <Text style={styles.timeText}>{selectedPost.timePosted}</Text>
                    </View>
                    <Text style={styles.detailDescription}>{selectedPost.description}</Text>
                    <View style={styles.statsRow}>
                      <Text style={styles.statsText}>{selectedPost.votes} votes</Text>
                      <Text style={styles.statsText}>{selectedPost.comments.length} comments</Text>
                    </View>
                    
                    {/* Comments section */}
                    <View style={styles.commentsSection}>
                      <Text style={styles.commentsSectionTitle}>Comments</Text>
                      
                      {/* Add comment input section */}
                      <View style={styles.commentInputSection}>
                        <TextInput
                          style={styles.commentInput}
                          value={newComment}
                          onChangeText={setNewComment}
                          placeholder="Write a comment..."
                          multiline
                        />
                        <TouchableOpacity 
                          style={styles.commentButton}
                          onPress={() => handleAddComment(selectedPost.id)}
                        >
                          <Text style={styles.commentButtonText}>Post</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Existing comments */}
                      {selectedPost.comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                      ))}
                    </View>
                  </View>
                </>
              )}
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeDetailModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100, // leave space for the New Post button
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 16,
  },
  postContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  voteCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  positiveVotes: {
    color: '#FF4785', // Match the pink color
  },
  negativeVotes: {
    color: '#FF4785', // Match the pink color
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#FF4785',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  fabText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalInput: {
    height: 100,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  modalImageButton: {
    backgroundColor: '#FF4785',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalImageButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalPreviewImage: {
    width: '100%',
    height: 150,
    borderRadius: 4,
    marginBottom: 12,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  modalPostButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  modalPostButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  modalCancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  detailModalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    maxHeight: '90%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  detailImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailContent: {
    padding: 8,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  authorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  authorText: {
    fontSize: 14,
    color: '#666',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    marginTop: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#FF4785',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  commentsSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  commentContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  commentTime: {
    fontSize: 12,
    color: '#888',
  },
  commentText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  commentFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  commentInputSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F8F8F8',
  },
  commentButton: {
    backgroundColor: '#FF4785',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  commentButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
