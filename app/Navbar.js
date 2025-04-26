import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'HOME', route: '/' },
    { label: 'NEWS', route: '/berita' },
    { label: 'PENGADUAN', route: '/FormPengaduan' },
    { label: 'LACAK', route: '/lacakpengaduan' },
    { label: 'ABOUT', route: '/about' },
    { label: 'KONTAK', route: '/kontak' },
  ];

  return (
    <LinearGradient colors={['#fff', '#f0f9ff']} style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>LAPORIA.ID</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navContainer}>
        {menuItems.map((item, index) => (
          <HoverableNavItem
            key={index}
            label={item.label}
            route={item.route}
            isActive={pathname === item.route}
            router={router}
          />
        ))}
      </ScrollView>

      {/* Ikon profil di ujung kanan */}
      <Pressable onPress={() => router.push('/profil')}>
        <View
          style={[
            styles.profileIconContainer,
            pathname === '/profil' && styles.activeProfile,
          ]}
        >
          <Ionicons
            name="person-circle"
            size={28}
            color={pathname === '/profil' ? '#1d4ed8' : '#1e3a8a'}
          />
        </View>
      </Pressable>
    </LinearGradient>
  );
};

const HoverableNavItem = ({ label, route, isActive, router }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isHovered && Platform.OS === 'web') {
      Animated.spring(scaleAnim, {
        toValue: 1.08,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [isHovered]);

  return (
    <Pressable
      onPress={() => router.push(route)}
      onHoverIn={() => Platform.OS === 'web' && setIsHovered(true)}
      onHoverOut={() => Platform.OS === 'web' && setIsHovered(false)}
    >
      <Animated.View
        style={[
          styles.navItem,
          isActive && styles.activeNavItem,
          isHovered && styles.hoveredNavItem,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text
          style={[
            styles.navText,
            isActive && styles.activeNavText,
            isHovered && styles.hoveredNavText,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  logoText: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    fontSize: 18,
  },
  navContainer: {
    flexDirection: 'row',
  },
  navItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: '#e0f2fe',
    transitionDuration: '150ms',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  navText: {
    color: '#1e3a8a',
    fontWeight: '600',
    fontSize: 14,
  },
  activeNavItem: {
    backgroundColor: '#bfdbfe',
    borderColor: '#1d4ed8',
  },
  activeNavText: {
    color: '#1d4ed8',
  },
  hoveredNavItem: {
    backgroundColor: '#93c5fd',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  hoveredNavText: {
    color: '#1e40af',
  },
  profileIconContainer: {
    marginLeft: 12,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#e0f2fe',
  },
  activeProfile: {
    backgroundColor: '#bfdbfe',
  },
});

export default Navbar;
