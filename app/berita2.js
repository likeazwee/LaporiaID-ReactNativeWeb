import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Navbar from './Navbar';

const Berita2 = () => {
  return (
    <View style={styles.wrapper}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.metaTop}>Laporia · Selasa, 22 April 2025</Text>

        <Image
          source={require('../assets/banjir.jpg')}
          style={styles.image}
        />

        <Text style={styles.kategori}>BENCANA</Text>
        <Text style={styles.judul}>
          Banjir Surut, Warga Kembali ke Rumah
        </Text>

        <Text style={styles.subjudul}>
          Air Mulai Surut di Tanjung Agung, Pemerintah dan Warga Bersinergi dalam Pemulihan
        </Text>

        <Text style={styles.isi}>
        Tanjung Agung, Bengkulu – Setelah tiga hari dilanda banjir akibat hujan deras yang mengguyur wilayah Bengkulu, kondisi di Desa Tanjung Agung mulai berangsur pulih. 
        Air yang sebelumnya merendam rumah warga dengan ketinggian hingga 80 cm kini telah surut. 
        Warga pun mulai kembali ke rumah masing-masing untuk membersihkan sisa lumpur dan menata kembali barang-barang mereka.
        Menurut Kepala Desa Tanjung Agung, Arman Saputra, banjir mulai surut sejak Kamis pagi (24/4), setelah intensitas hujan menurun dan debit air sungai yang melintasi desa kembali normal.
        “Alhamdulillah, kondisi mulai membaik. Warga yang sebelumnya mengungsi ke balai desa dan rumah kerabat, sekarang mulai pulang ke rumah masing-masing,” ujarnya.
        Sebanyak 73 kepala keluarga terdampak banjir yang terjadi sejak Selasa malam. Selain merendam rumah, banjir juga sempat memutus akses jalan desa dan merusak beberapa fasilitas umum seperti mushola dan posyandu.
        Dalam proses penanganan banjir, pemerintah daerah turut mengambil peran penting. Melalui BPBD Provinsi Bengkulu dan Dinas Sosial, pemerintah mengirimkan bantuan logistik darurat seperti makanan siap saji, air bersih, selimut, serta obat-obatan. 
        Selain itu, tim gabungan dari TNI, Polri, dan relawan juga diterjunkan untuk membantu evakuasi dan membersihkan puing-puing pasca banjir.
        “Kami sangat terbantu dengan respons cepat dari pemerintah dan semua pihak. Bantuan datang tepat waktu, dan warga merasa tidak sendiri dalam menghadapi musibah ini,” kata Arman.
        Saat ini, warga bersama relawan dan perangkat desa tengah bergotong royong membersihkan lingkungan dari sisa lumpur dan sampah. Pemerintah desa juga menghimbau masyarakat untuk tetap waspada, mengingat curah hujan di wilayah Bengkulu masih cukup tinggi.
        “Kami berharap ke depan ada solusi jangka panjang seperti perbaikan saluran air dan normalisasi sungai, agar kejadian seperti ini tidak terulang setiap tahun,” pungkas Arman.
        </Text>

        <Text style={styles.penulis}>Ditulis oleh: Agyl Wendy</Text>

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

export default Berita2;
