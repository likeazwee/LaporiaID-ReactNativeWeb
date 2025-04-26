import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Admin = () => {
  const navigation = useNavigation();
  const [dataCounts, setDataCounts] = useState({
    'Menunggu Respon': 0,
    'Verifikasi': 0,
    'Dalam Proses': 0,
    'Selesai': 0,
  });
  const [homeVisitCount, setHomeVisitCount] = useState(0); 
  
  const menuItems = [
    { name: 'Dashboard', route: 'Dashboard' },
    { name: 'Data Pengaduan', route: 'DataPengaduan' },
    { name: 'Data Masyarakat', route: 'DataMasyarakat' },
    { name: 'Data Petugas', route: 'DataPetugas' },
  ];

  const handleProfileClick = (route) => {
    navigation.navigate(route);
  };

  const catatKunjunganHome = async () => {
    try {
      const existing = await AsyncStorage.getItem('HOME_VISIT_COUNT');
      const count = existing ? parseInt(existing) + 1 : 1;
      await AsyncStorage.setItem('HOME_VISIT_COUNT', count.toString());
      setHomeVisitCount(count); 
    } catch (err) {
      console.log('Gagal mencatat kunjungan Home:', err);
    }
  };

  const catatKunjungan = async () => {
    const hariIni = moment().format('dddd');
    try {
      const existing = await AsyncStorage.getItem('KUNJUNGAN-' + hariIni);
      const count = existing ? parseInt(existing) + 1 : 1;
      await AsyncStorage.setItem('KUNJUNGAN-' + hariIni, count.toString());
    } catch (err) {
      console.log('Gagal menyimpan kunjungan:', err);
    }
  };

  useEffect(() => {
    catatKunjunganHome(); // Catat kunjungan Home
    catatKunjungan(); // Catat kunjungan per hari
  }, []);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const pengaduanKeys = keys.filter(key => key.startsWith('PENGADUAN-'));
        const entries = await AsyncStorage.multiGet(pengaduanKeys);
        const parsedData = entries.map(([key, value]) => JSON.parse(value));
        const counts = {
          'Menunggu Respon': 0,
          'Verifikasi': 0,
          'Dalam Proses': 0,
          'Selesai': 0,
        };
        parsedData.forEach(item => {
          if (counts[item.status] !== undefined) {
            counts[item.status]++;
          }
        });
        setDataCounts(counts);
      } catch (error) {
        console.log('Gagal memuat data pengaduan:', error);
      }
    };

    const loadKunjungan = async () => {
      const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
      try {
        const kunjunganPromises = hariList.map(hari => AsyncStorage.getItem('KUNJUNGAN-' + hari));
        const hasil = await Promise.all(kunjunganPromises);
        const data = hasil.map(val => parseInt(val) || 0);
        setKunjunganData(data);
      } catch (error) {
        console.log('Gagal load kunjungan:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadCounts();
      loadKunjungan();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#818cf8', '#93c5fd']} style={styles.sidebar}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => handleProfileClick('profiladmin')}>
            <Image source={require('../assets/admin.png')} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.username}>admin</Text>
          <Text style={styles.status}>● Online</Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>MENU</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: 'index' }] });
            }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.mainContent}>
        <LinearGradient colors={['#f8fafc', '#f1f5f9']} style={styles.dashboard}>
          <Text style={styles.header}>Dashboard Admin</Text>

          <View style={styles.cardContainer}>
            {Object.keys(dataCounts).map((label, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardNumber}>{dataCounts[label]}</Text>
                <Text style={styles.cardLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.chartBox}>
            <Text style={styles.chartTitle}>Grafik Laporan</Text>
            <BarChart
              data={{ labels: ['Total'], datasets: [{ data: [Object.values(dataCounts).reduce((a, b) => a + b, 0)] }] }}
              width={Dimensions.get('window').width - 260}
              height={220}
              fromZero
              showValuesOnTopOfBars
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                fillShadowGradient: '#60a5fa',
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                propsForBackgroundLines: { stroke: '#cbd5e1' },
              }}
              style={{ borderRadius: 10 }}
            />
          </View>

          <View style={styles.chartBox}>
            <Text style={styles.chartTitle}>Statistik Kunjungan</Text>
            <BarChart
              data={{
                labels: ['Home'],
                datasets: [{ data: [homeVisitCount] }],
              }}
              width={Dimensions.get('window').width - 260}
              height={220}
              fromZero
              showValuesOnTopOfBars
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                fillShadowGradient: '#2563eb',
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                propsForBackgroundLines: { stroke: '#e2e8f0' },
              }}
              style={{ borderRadius: 10 }}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1, backgroundColor: '#fff' },
  sidebar: {
    width: 220,
    paddingTop: 40,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  status: { color: 'lime', fontSize: 12 },
  menuSection: { flex: 1 },
  menuTitle: { color: '#e0e7ff', fontSize: 13, marginBottom: 10 },
  menuItem: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuText: { color: '#fff', fontSize: 14 },
  logoutContainer: {
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#2563eb',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  mainContent: { flex: 1 },
  dashboard: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#e2e8f0',
    width: '48%',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardNumber: { fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1e40af' 
  },
  cardLabel: { 
    marginTop: 8, 
    fontSize: 14, 
    color: '#334155', 
    textAlign: 'center' },
  chartBox: {
    marginTop: 25,
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 10,
  },
  chartTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10 },
});

export default Admin;