import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Navbar from './Navbar';

const Berita3 = () => {
  return (
    <View style={styles.wrapper}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.metaTop}>Laporia · Selasa, 22 April 2025</Text>

        <Image
          source={require('../assets/jalanberlubang.jpg')}
          style={styles.image}
        />

        <Text style={styles.kategori}>INFRASTRUKTUR</Text>
        <Text style={styles.judul}>
        Warga Protes Jalan Rusak Parah
        </Text>

        <Text style={styles.subjudul}>
          Perbaikan Jalan Sudah Berjalan, Namun Warga Minta Percepatan
        </Text>

        <Text style={styles.isi}>
          Jenggalu, Bengkulu – Warga di Desa Jenggalu mengeluhkan kondisi jalan utama yang rusak parah dan menyulitkan aktivitas sehari-hari, terutama bagi pengendara sepeda motor dan kendaraan roda empat. 
          Jalan berlubang dan bergelombang telah dikeluhkan sejak lama, namun perbaikan yang dijanjikan pemerintah baru mulai berjalan beberapa minggu terakhir.
          “Kondisi jalan ini sangat mengkhawatirkan, apalagi saat hujan datang lubang-lubang ini berubah jadi genangan air yang dalam. Banyak warga yang hampir terjatuh karena jalan berlubang,” keluh Rudi, salah seorang warga setempat.
          Meski demikian, pihak pemerintah desa dan Dinas Pekerjaan Umum Bengkulu telah mulai melakukan perbaikan secara bertahap sejak awal bulan ini. 
          Alat berat dan pekerja terlihat aktif di lokasi, memperbaiki sejumlah titik jalan yang paling parah. Kepala Dinas PU Bengkulu, Sri Wahyuni, menyampaikan bahwa proyek perbaikan jalan di 
          Jenggalu masuk dalam prioritas tahun ini. “Kami menyadari kondisi jalan yang buruk sangat mengganggu mobilitas warga. Saat ini perbaikan sudah berjalan dan kami berusaha menyelesaikan secepat mungkin, 
          namun ada proses teknis dan cuaca yang kadang menjadi tantangan,” jelasnya. Namun, warga berharap pemerintah dapat mempercepat pengerjaan dan menyediakan tanda peringatan di titik-titik yang masih rusak agar tidak terjadi kecelakaan.
          “Kalau bisa, segera selesai agar aktivitas warga bisa lancar kembali dan kendaraan tidak cepat rusak,” tambah Rudi.
          Sementara itu, aparat desa juga terus melakukan komunikasi dengan dinas terkait untuk memastikan perbaikan berjalan lancar dan tidak terhambat kendala administrasi.
        </Text>

        <Text style={styles.penulis}>Ditulis oleh: Waridhania As Syifa</Text>

        <Text style={styles.footer}>© 2025 Laporia. Semua hak dilindungi.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 10,
  },
  metaTop: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '90%',
    height: 500,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
  kategori: {
    color: '#1e40af',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  judul: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subjudul: {
    fontSize: 16,
    color: '#475569',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  isi: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 26,
    textAlign: 'justify',
    marginBottom: 30,
  },
  penulis: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'right',
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingTop: 10,
  },
});

export default Berita3;
