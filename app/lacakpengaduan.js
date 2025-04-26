import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import { LinearGradient } from 'expo-linear-gradient';

export default function LacakPengaduan() {
  const [nomorPengaduan, setNomorPengaduan] = useState('');
  const [pengaduan, setPengaduan] = useState(null);

  const handleLacak = async () => {
    try {
      const data = await AsyncStorage.getItem(nomorPengaduan);
      if (data) {
        setPengaduan(JSON.parse(data));
      } else {
        Alert.alert("Tidak Ditemukan", "Nomor pengaduan tidak ditemukan.");
        setPengaduan(null);
      }
    } catch (error) {
      Alert.alert("Terjadi Kesalahan", "Gagal memuat pengaduan.");
    }
  };

  return (
    <LinearGradient colors={['#e0ecf8', '#cce0f5']} style={styles.wrapper}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Lacak Pengaduan</Text>

          <TextInput
            style={styles.input}
            placeholder="Masukkan Nomor Pengaduan"
            placeholderTextColor="#555"
            value={nomorPengaduan}
            onChangeText={setNomorPengaduan}
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleLacak}
          >
            <Text style={styles.submitText}>Lacak</Text>
          </TouchableOpacity>

          {pengaduan ? (
            <View style={styles.pengaduanDetails}>
              <Text style={styles.detailTitle}>Detail Pengaduan:</Text>
              <Text style={styles.detailText}><strong>Judul:</strong> {pengaduan.judul}</Text>
              <Text style={styles.detailText}><strong>Isi Laporan:</strong> {pengaduan.isi}</Text>
              <Text style={styles.detailText}><strong>Instansi Tujuan:</strong> {pengaduan.instansi}</Text>
              <Text style={styles.detailText}><strong>Kategori:</strong> {pengaduan.kategori}</Text>
              <Text style={styles.detailText}><strong>Status:</strong> {pengaduan.status}</Text>
              <Text style={styles.detailText}><strong>File:</strong> {pengaduan.file ? pengaduan.file : "Tidak ada file"}</Text>
              <Text style={styles.detailText}><strong>Lokasi:</strong> {pengaduan.lokasi ? `Lat: ${pengaduan.lokasi.lat}, Lng: ${pengaduan.lokasi.lng}` : "Tidak ada lokasi"}</Text>
              <Text style={styles.detailText}><strong>Tanggal Pengaduan:</strong> {new Date(pengaduan.createdAt).toLocaleString()}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  formWrapper: {
    maxWidth: 700,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  submitBtn: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pengaduanDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003366',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});
