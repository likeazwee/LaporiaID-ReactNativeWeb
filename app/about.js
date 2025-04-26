import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Navbar from './Navbar';
import { LinearGradient } from 'expo-linear-gradient';

const developers = [
  {
    name: 'Najwa Nabilah',
    role: 'G1A023065',
    image: require('../assets/najwa.jpg'),
    instagram: 'https://www.instagram.com/peonyc4m/',
    whatsapp: 'https://wa.me/+6281369650675',
    youtube: 'https://najwanaa16@gmail.com',
  },
  {
    name: 'Waridhania As Syifa',
    role: 'G1A023075',
    image: require('../assets/syifa.jpg'),
    instagram: 'https://www.instagram.com/nndwee_/',
    whatsapp: 'https://wa.me/+628123456789',
    youtube: 'https://youtu.be/pFWu6oPs-HM?si=2jTjWq0l-rZkCC95',
  },
  {
    name: 'Salah Nasser Hasan Meqdamr',
    role: 'G1A023095',
    image: require('../assets/salah.jpg'),
    instagram: 'https://www.instagram.com/salahnasserhm/',
    whatsapp: 'https://wa.me/+628123456789',
    youtube: 'https://youtu.be/pFWu6oPs-HM?si=2jTjWq0l-rZkCC95',
  },
  {
    name: 'Agyl Wendi Pratama',
    role: 'G1A023087',
    image: require('../assets/agyl.jpg'),
    instagram: 'https://www.instagram.com/',
    whatsapp: 'https://wa.me/+628123456789',
    youtube: 'https://youtu.be/pFWu6oPs-HM?si=2jTjWq0l-rZkCC95',
  },
];

export default function About() {
  return (
    <LinearGradient colors={['#f0f9ff', '#fff']} style={styles.container}>
    <ScrollView style={styles.container}>
      <Navbar />

      {/* HEADER */}
      <View style={styles.headerSection}>
        <Text style={styles.aboutTitle}>ABOUT US</Text>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.section}>
        <Text style={styles.text}>
          LAPORIA adalah platform digital yang menghubungkan masyarakat dengan instansi pemerintah secara cepat, aman, dan transparan. Kami percaya bahwa setiap laporan memiliki kekuatan untuk memicu perubahan.
        </Text>
        <Text style={styles.text}>
          Dengan pendekatan kolaboratif, kami membangun jembatan antara suara rakyat dan tindakan nyata. Bersama LAPORIA, aspirasi Anda tak lagi hanya terdengar—tetapi ditindaklanjuti.
        </Text>
      </View>

      {/* QUOTE */}
      <View style={styles.quoteBlock}>
        <Text style={styles.bigQuote}>"</Text>
        <Text style={styles.quoteText}>
          Our work only makes sense if it faithfully reflects the voice of the people.
        </Text>
        <Text style={styles.quoteAuthor}>Tim LAPORIA</Text>
      </View>

      {/* TEAM */}
      <View style={styles.teamContainer}>
        {developers.map((dev, index) => (
          <View key={index} style={styles.card}>
            <Image source={dev.image} style={styles.cardImage} />
            <Text style={styles.cardName}>{dev.name}</Text>
            <Text style={styles.cardRole}>{dev.role}</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => Linking.openURL(dev.youtube)}>
                <Image source={require('../assets/email.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(dev.instagram)}>
                <Image source={require('../assets/ig.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(dev.whatsapp)}>
                <Image source={require('../assets/wa.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textShadowColor: 'rgba(136, 125, 125, 0.52)',
    textShadowOffset: { width: 3, height:3},
    textShadowRadius: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#334155',
    marginBottom: 16,
  },
  quoteBlock: {
    paddingHorizontal: 32,
    paddingVertical: 40,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
  },
  bigQuote: {
    fontSize: 48,
    color: '#94a3b8',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#334155',
    lineHeight: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#64748b',
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 12,
    margin: 10,
    width: 240,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 220,
    height: 280,
    borderRadius: 18,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  cardRole: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
  },
});
