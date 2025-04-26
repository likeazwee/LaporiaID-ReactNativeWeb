import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Picker
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function DataPengaduan() {
  const [data, setData] = useState([]); // Menyimpan semua data pengaduan
  const [filteredData, setFilteredData] = useState([]); // Menyimpan data hasil pencarian
  const [searchText, setSearchText] = useState(''); // Menyimpan teks pencarian
  const navigation = useNavigation();

  const statusOptions = ['Menunggu Respon', 'Verifikasi', 'Dalam Proses', 'Selesai'];
  useEffect(() => {
    const loadData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const pengaduanKeys = keys.filter(key => key.startsWith('PENGADUAN-'));
        const entries = await AsyncStorage.multiGet(pengaduanKeys);
        const parsedData = entries.map(([key, value]) => {
          const parsed = JSON.parse(value);
          return { id: key, ...parsed };
        });
        setData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.log('Gagal memuat data pengaduan', error);
      }
    };
    loadData();
  }, []);

  // Memfilter data pengaduan sesuai teks pencarian
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter(item =>
      item.judul.toLowerCase().includes(text.toLowerCase()) ||
      item.instansi.toLowerCase().includes(text.toLowerCase()) ||
      item.kategori.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Menyimpan perubahan status ke AsyncStorage
  const handleUpdateStatus = async (item, newStatus) => {
    const updatedItem = { ...item, status: newStatus };
    try {
      await AsyncStorage.setItem(item.id, JSON.stringify(updatedItem));
      const updatedData = data.map(d => d.id === item.id ? updatedItem : d);
      setData(updatedData);
      const updatedFiltered = filteredData.map(d => d.id === item.id ? updatedItem : d);
      setFilteredData(updatedFiltered);
    } catch (error) {
      Alert.alert('Gagal mengubah status');
    }
  };

  // Menghapus data pengaduan dari AsyncStorage
  const handleDelete = async (item) => {
    try {
      await AsyncStorage.removeItem(item.id);
      const newData = data.filter(d => d.id !== item.id);
      const newFilteredData = filteredData.filter(d => d.id !== item.id);
      setData(newData);
      setFilteredData(newFilteredData);
    } catch (error) {
      console.log('Gagal menghapus data', error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#2563eb" />
      </TouchableOpacity>

      {/* Judul halaman */}
      <Text style={styles.title}>Data Pengaduan</Text>

      {/* Input pencarian */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
        <TextInput
          placeholder="Cari berdasarkan judul, instansi, atau kategori"
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Header tabel */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 0.7 }]}>No</Text>
        <Text style={styles.tableHeaderCell}>Judul</Text>
        <Text style={styles.tableHeaderCell}>Instansi</Text>
        <Text style={styles.tableHeaderCell}>Kategori</Text>
        <Text style={styles.tableHeaderCell}>Status</Text>
        <Text style={styles.tableHeaderCell}>Aksi</Text>
      </View>

      {/* Daftar data */}
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.7 }]}>{index + 1}</Text>
            <Text style={styles.tableCell}>{item.judul}</Text>
            <Text style={styles.tableCell}>{item.instansi}</Text>
            <Text style={styles.tableCell}>{item.kategori}</Text>
            <View style={[styles.tableCell, { paddingHorizontal: 4 }]}>
              {/* Dropdown untuk memilih status */}
              <Picker
                selectedValue={item.status}
                style={{ height: 40, width: 140 }}
                onValueChange={(value) => handleUpdateStatus(item, value)}
              >
                {statusOptions.map(status => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Belum ada data pengaduan</Text>
      )}
      <Text style={styles.entriesInfo}>Menampilkan {filteredData.length} data</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(136, 125, 125, 0.52)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    width: 350,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#60A5FA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF95',
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#c7d2fe',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center'
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    color: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  noDataText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#94a3b8',
    marginTop: 12,
  },
  entriesInfo: {
    marginTop: 12,
    fontSize: 12,
    textAlign: 'center',
    color: '#64748b',
  },
});
