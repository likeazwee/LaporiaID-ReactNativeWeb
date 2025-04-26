import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState({
    Nama: 'Budi Santoso',
    Email: 'budi@gmail.com.com',
    Password: '********',
    Alamat: 'Jl. Rambutan 4C, Medan Baru Bengkulu',
    Telepon: '+62 812 3456 7890',
    Jabatan: 'Admin',
    NIP: '1234567890',
  });

  const toggleEdit = () => setEditable(!editable);

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    console.log('Profile Saved:', profile);
    setEditable(false); // optional: auto-exit edit mode
  };

  return (
    <LinearGradient colors={['#fff', '#f0f9ff']} style={styles.profileContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Navigation Bar */}
        <View style={styles.navbarWrapper}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('admin')}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity
              onPress={toggleEdit}
              style={[styles.editBtn, editable && styles.editBtnHover]}
            >
              <Text style={styles.editBtnText}>
                {editable ? 'Cancel' : 'Edit Profile'}
              </Text>
              <Ionicons
                name={editable ? 'close' : 'pencil'}
                size={20}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.card}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              <Image
                source={image ? { uri: image } : require('../assets/admin.png')}
                style={styles.avatar}
              />
              <Text style={styles.uploadText}>Tap to change photo</Text>
            </TouchableOpacity>

            {Object.entries(profile).map(([key, value]) => (
              <View style={styles.fieldGroup} key={key}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(val) => handleChange(key, val)}
                  editable={editable}
                  secureTextEntry={key === 'Password'}
                  keyboardType={key === 'Telepon' ? 'phone-pad' : 'default'}
                />
              </View>
            ))}

            {editable && (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  navbarWrapper: {
    marginTop: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  backButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  content: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  editBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  editBtnHover: {
    backgroundColor: '#2563eb',
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 8,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 999,
  },
  uploadText: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748b',
  },
  fieldGroup: {
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    color: '#444',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
