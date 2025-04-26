import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    judul: 'Pemerintah Bangun Jembatan Baru',
    kategori: 'INFRASTRUKTUR',
    gambar: require('../assets/jembatan.jpeg'),
    screen: 'berita1',
  },
  {
    id: '2',
    judul: 'Banjir Surut, Warga Kembali ke Rumah',
    kategori: 'BENCANA',
    gambar: require('../assets/banjir.jpg'),
    screen: 'berita2',
  },
  {
    id: '3',
    judul: 'Warga Protes Jalan Rusak Parah',
    kategori: 'KELUHAN',
    gambar: require('../assets/jalanberlubang.jpg'),
    screen: 'berita3',
  },
  {
    id: '4',
    judul: 'Sampah Menumpuk di Pinggir Jalan',
    kategori: 'LINGKUNGAN',
    gambar: require('../assets/sampah.jpeg'),
    screen: 'berita4',
  },
];

const NewsCard = ({ item, navigation }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => navigation.navigate(item.screen)}
      style={{ marginBottom: 16 }}
    >
      <Animated.View style={[styles.cardContent, { transform: [{ scale }] }]}>
        <View style={styles.imageWrapper}>
          <Image source={item.gambar} style={styles.imageSquare} />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{item.kategori}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.judul}>{item.judul}</Text>
          <Text style={styles.deskripsi}>© 2025 Laporia. Semua hak dilindungi</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        const count = await AsyncStorage.getItem('homeVisits');
        const newCount = count ? parseInt(count) + 1 : 1;
        await AsyncStorage.setItem('homeVisits', newCount.toString());
      } catch (e) {
        console.log('Error updating visit count:', e);
      }
    };

    incrementVisitCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Navbar />
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.heroSection}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.heroImage}
              />
              <Text style={styles.heroTitle}>Laporkan Masalah Sekitarmu!</Text>
              <Text style={styles.heroSubtitle}>
                Bersama kita wujudkan perubahan.
              </Text>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => navigation.navigate('FormPengaduan')}
              >
                <Text style={styles.contactButtonText}>LAPOR SEKARANG</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryWrapper}>
              <Text style={styles.sectionTitle}>Berita Terbaru</Text>
              <View style={styles.categoriesContainer}>
                {data.map((item, index) => (
                  <NewsCard key={index} item={item} navigation={navigation} />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 140,
    paddingHorizontal: 24,
  },
  heroImage: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 26,
    color: '#eee',
    marginTop: 6,
    marginBottom: 30,
    textAlign: 'center',
  },
  contactButton: {
    backgroundColor: '#FFD93D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 6,
  },
  contactButtonText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
  },
  categoryWrapper: {
    marginTop: 100,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContent: {
    width: 330,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  imageSquare: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  textContainer: {
    padding: 12,
  },
  judul: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  deskripsi: {
    fontSize: 11,
    color: '#6b7280',
  },
});
