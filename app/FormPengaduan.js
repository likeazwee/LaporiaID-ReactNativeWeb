import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, Pressable
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import { LinearGradient } from 'expo-linear-gradient';

export default function FormPengaduan() {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [instansi, setInstansi] = useState('');
  const [kategori, setKategori] = useState('');
  const [file, setFile] = useState(null);
  const [nomorPengaduan, setNomorPengaduan] = useState('');
  const [lokasi, setLokasi] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const showAlert = (title, message) => {
    if (typeof window !== 'undefined') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    const generateNomorPengaduan = async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      try {
        const storedNumber = await AsyncStorage.getItem('lastNomorPengaduan');
        let nextNumber = storedNumber ? parseInt(storedNumber) + 1 : 1;
        const nomor = `PENGADUAN-${year}${month}-${String(nextNumber).padStart(3, '0')}`;
        setNomorPengaduan(nomor);
      } catch (error) {
        console.log('Error generate nomor pengaduan', error);
      }
    };
    generateNomorPengaduan();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || mapRef.current) return;

    import('leaflet').then((L) => {
      require('leaflet/dist/leaflet.css');
      const map = L.map('map').setView([-3.7941, 102.2596], 17);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      function onMapClick(e) {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng);
        } else {
          markerRef.current = L.marker(e.latlng).addTo(map);
        }
        setLokasi({ lat, lng });
      }

      map.on("click", onMapClick);
    });
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      showAlert("Gagal", "Gagal mengunggah file.");
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];
    if (!judul) missingFields.push('Judul');
    if (!isi) missingFields.push('Isi Laporan');
    if (!instansi) missingFields.push('Instansi Tujuan');
    if (!kategori) missingFields.push('Kategori Laporan');

    if (missingFields.length > 0) {
      showAlert("Form Tidak Lengkap", `Harap lengkapi kolom berikut: ${missingFields.join(', ')}`);
      return;
    }

    const dataPengaduan = {
      judul,
      isi,
      instansi,
      kategori,
      status: 'Diproses',
      file: file ? file.name : null,
      lokasi,
      createdAt: new Date().toISOString()
    };

    try {
      const currentNum = nomorPengaduan.split('-')[2];
      await AsyncStorage.setItem(nomorPengaduan, JSON.stringify(dataPengaduan));
      await AsyncStorage.setItem('lastNomorPengaduan', parseInt(currentNum).toString());
      showAlert("Berhasil", `Pengaduan berhasil dikirim! Nomor: ${nomorPengaduan}`);
    } catch (e) {
      showAlert("Gagal", "Gagal menyimpan pengaduan.");
      return;
    }

    // Reset form
    setJudul('');
    setIsi('');
    setInstansi('');
    setKategori('');
    setFile(null);
    setLokasi(null);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const storedNumber = await AsyncStorage.getItem('lastNomorPengaduan');
    let nextNumber = storedNumber ? parseInt(storedNumber) + 1 : 1;
    const nomor = `PENGADUAN-${year}${month}-${String(nextNumber).padStart(3, '0')}`;
    setNomorPengaduan(nomor);
  };

  return (
    <LinearGradient colors={['#e0ecf8', '#cce0f5']} style={styles.wrapper}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Formulir Pengaduan</Text>

          <TextInput style={styles.input} placeholder="Nomor Pengaduan" placeholderTextColor="#555" value={nomorPengaduan} editable={false} />
          <TextInput style={styles.input} placeholder="Ketik Judul Laporan Anda *" placeholderTextColor="#555" value={judul} onChangeText={setJudul} />
          <TextInput style={[styles.input, styles.textArea]} placeholder="Ketik Isi Laporan Anda *" placeholderTextColor="#555" value={isi} onChangeText={setIsi} multiline />

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={instansi} onValueChange={(itemValue) => setInstansi(itemValue)} style={styles.picker} dropdownIconColor="#555">
              <Picker.Item label="Ketik Instansi Tujuan *" value="" />
              <Picker.Item label="Dinas PUPR" value="PUPR" />
              <Picker.Item label="PLN" value="pln" />
              <Picker.Item label="Dinas Kesehatan" value="dinkes" />
              <Picker.Item label="BPJS" value="bpjs" />
              <Picker.Item label="Dinas Lingkungan Hidup" value="lh" />
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={kategori} onValueChange={(itemValue) => setKategori(itemValue)} style={styles.picker} dropdownIconColor="#555">
              <Picker.Item label="Pilih Kategori Laporan Anda *" value="" />
              <Picker.Item label="Infrastruktur" value="infra" />
              <Picker.Item label="Lingkungan" value="lingkungan" />
              <Picker.Item label="Kesehatan" value="kesehatan" />
              <Picker.Item label="Pelayanan" value="pelayanan" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
            <Text style={styles.uploadText}>📎 Upload Lampiran</Text>
          </TouchableOpacity>
          {file && <Text style={styles.fileName}>📄 {file.name}</Text>}

          <Text style={{ fontSize: 16, marginBottom: 5, color: '#003366' }}>
            Pilih Lokasi Kejadian:
          </Text>
          <View id="map" style={{ height: 300, width: "100%", borderRadius: 10, marginBottom: 10, overflow: 'hidden' }} />
          {lokasi && (
            <Text style={{ marginBottom: 10, fontSize: 14 }}>
              Lokasi dipilih: {lokasi.lat.toFixed(6)}, {lokasi.lng.toFixed(6)}
            </Text>
          )}

          <Pressable onPress={handleSubmit} style={({ pressed }) => [styles.submitBtn, pressed && styles.submitBtnHover]}>
            <Text style={styles.submitText}>LAPOR!</Text>
          </Pressable>

          <Text style={styles.footer}>© Laporia 2025</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    height: 50,
  },
  picker: {
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  uploadBtn: {
    backgroundColor: '#0074D9',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#fff',
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnHover: {
    backgroundColor: '#002244',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    color: '#333',
  },
});
