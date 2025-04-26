import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';

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

const CardItem = ({ item, navigation }) => {
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
      onPress={() => navigation.navigate(item.screen)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [styles.cardWrapper, pressed && { opacity: 0.9 }]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image source={item.gambar} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.kategori}>{item.kategori}</Text>
          <Text style={styles.judul}>{item.judul}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const Berita = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const numColumns = width < 500 ? 1 : 2;

  return (
    <View style={styles.wrapper}>
      <Navbar />

      <Text style={styles.title}>Berita Terbaru</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        key={numColumns.toString()} // SOLUSI agar FlatList re-render jika numColumns berubah
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 && { justifyContent: 'space-between', paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <CardItem item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.list}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Laporia. Semua hak dilindungi.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginVertical: 16,
  },
  list: {
    paddingBottom: 0,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 20,
    marginHorizontal: '1%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContainer: {
    padding: 12,
  },
  kategori: {
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
  },
});

export default Berita;
