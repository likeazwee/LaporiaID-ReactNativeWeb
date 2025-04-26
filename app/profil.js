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
import Navbar from './Navbar';
import Admin from './admin'; 
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const [profile, setProfile] = useState({
    name: 'Najwa Nabilah',
    email: 'najwanaa16@gmail.com',
    password: '********',
    location: 'Jl. Mawar 13, Bumi Ayu, Bengkulu',
    phone: '+62 812 3456 7890',
  });

  const toggleEdit = () => setEditable(!editable);

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogin = () => {
    if (emailLogin === 'admin' && passwordLogin === 'admin123') {
      setRole('admin');
      setIsLoggedIn(true);
    } else if (emailLogin === 'user' && passwordLogin === 'user123') {
      setRole('user');
      setIsLoggedIn(true);
    } else {
      alert('Username atau password salah');
    }
  };

  if (isLoggedIn && role === 'admin') {
    return <Admin />;
  }

  if (isLoggedIn && role === 'user') {
    return (
      <LinearGradient colors={['#fff', '#f0f9ff']} style={styles.profileContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.navbarWrapper}>
            <Navbar />
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity
                onPress={toggleEdit}
                style={[styles.editBtn, isPressed && styles.editBtnHover]}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
              >
                <Text style={styles.editBtnText}>
                  {editable ? 'Cancel' : 'Edit Profile'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
                <Image
                  source={
                    image ? { uri: image } : require('../assets/orangnelpon.png')
                  }
                  style={styles.avatar}
                />
                <Text style={styles.uploadText}>Tap to change photo</Text>
              </TouchableOpacity>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>User Name</Text>
                <TextInput
                  style={styles.input}
                  value={profile.name}
                  onChangeText={(val) => handleChange('name', val)}
                  editable={editable}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={profile.email}
                  onChangeText={(val) => handleChange('email', val)}
                  editable={editable}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  value={profile.password}
                  onChangeText={(val) => handleChange('password', val)}
                  editable={editable}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={profile.location}
                  onChangeText={(val) => handleChange('location', val)}
                  editable={editable}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={profile.phone}
                  onChangeText={(val) => handleChange('phone', val)}
                  editable={editable}
                  keyboardType="phone-pad"
                />
              </View>

              {editable && (
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ✅ Login Screen (default if not logged in)
  return (
    <LinearGradient colors={['#f7f8ff', '#eaefff']} style={styles.loginContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign in</Text>

        <Text style={styles.label}>Username or email address</Text>
        <TextInput
          style={styles.input}
          placeholder="example@mail.com"
          placeholderTextColor="#94a3b8"
          value={emailLogin}
          onChangeText={setEmailLogin}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          secureTextEntry
          value={passwordLogin}
          placeholderTextColor="#94a3b8"
          onChangeText={setPasswordLogin}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </View>

      <Image
        source={require('../assets/logo.png')}
        style={styles.illustration}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  profileContainer: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
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
  forgot: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  signupLink: {
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  navbarWrapper: {
    marginTop: 10,
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
  editBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  editBtnHover: {
    backgroundColor: '#2563eb',
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
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
});
