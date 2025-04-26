import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';

export default function Kontak() {
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (typeof window === 'undefined' || mapRef.current) return;

    import('leaflet').then((L) => {
      require('leaflet/dist/leaflet.css');

      const map = L.map('kontakMap').setView([-3.821464, 102.283711], 17);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([-3.821464, 102.283711])
        .addTo(map)
        .bindPopup('Find Us Here')
        .openPopup();
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/background.png')} style={styles.background} />

        <View style={styles.contentWrapper}>
          {/* Gambar clickable */}
          <TouchableOpacity style={styles.leftBox} onPress={() => navigation.navigate('FormPengaduan')}>
            <Image source={require('../assets/orangnelpon.png')} style={styles.image} />
            <Text style={styles.caption}>
              Jangan ragu untuk menghubungi kami jika ada yang ingin ditanyakan!
            </Text>
          </TouchableOpacity>

          <View style={styles.rightBox}>
            <Text style={styles.title}>Hubungi Kami</Text>

            <View style={styles.contactRow}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => Linking.openURL('https://wa.me/+6281369650675')}
              >
                <Image source={require('../assets/wa.png')} style={styles.icon} />
                <Text style={[styles.contactText, { color: '#2196f3' }]}>081568729892</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactRow}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => Linking.openURL('mailto:najwanaa16@gmail.com')}
              >
                <Image source={require('../assets/email.png')} style={styles.icon} />
                <Text style={[styles.contactText, { color: '#2196f3' }]}>laporia@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.mapWrapper}>
          <div id="kontakMap" style={styles.mapStyle} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© Laporia 2025</Text>
      </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    paddingVertical: 60,
  },
  background: {
    position: 'absolute',
    width,
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
    zIndex: -1,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    maxWidth: 1400,
    gap: 80,
    flexWrap: 'wrap',
  },
  leftBox: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    width: 450,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: 320,
    height: 430,
    borderRadius: 14,
    resizeMode: 'cover',
    marginBottom: 25,
  },
  caption: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
  rightBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: 420,
    gap: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#111',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 14,
    resizeMode: 'contain',
  },
  contactText: {
    fontSize: 20,
    color: '#111',
  },
  mapWrapper: {
    marginTop: 30,
    width: '70%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2196f3',
    backgroundColor: '#e0f7fa',
  },
  mapStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  footer: {
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  footerText: {
    color: '#003366',
    fontSize: 16,
    fontWeight: '600',
  },
});
