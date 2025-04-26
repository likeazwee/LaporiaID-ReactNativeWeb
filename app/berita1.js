import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Navbar from './Navbar';

const Berita1 = () => {
  return (
    <View style={styles.wrapper}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.metaTop}>Laporia · Selasa, 22 April 2025</Text>

        <Image
          source={require('../assets/jembatan.jpeg')}
          style={styles.image}
        />

        <Text style={styles.kategori}>INFRASTRUKTUR</Text>
        <Text style={styles.judul}>
          Pemerintah Bangun Jembatan Baru
        </Text>

        <Text style={styles.subjudul}>
          Proyek pembangunan jembatan baru dimulai untuk mendukung konektivitas warga antar desa.
        </Text>

        <Text style={styles.isi}>
        Rejang Lebong, Bengkulu – Pemerintah Kabupaten Rejang Lebong meresmikan pembangunan jembatan baru di Desa Lubuk Belimbing I dan II, Kecamatan Sindang Beliti Ilir. Jembatan sepanjang 50 meter dengan konstruksi rangka baja ini 
        menggantikan jembatan gantung yang sudah ada sejak 1961 dan sering kali tidak dapat dilalui saat musim hujan. Bupati Rejang Lebong, Syamsul Effendi, menyatakan bahwa pembangunan jembatan ini merupakan bagian dari upaya pemerintah untuk meningkatkan infrastruktur di daerah pelosok. 
        “Jembatan ini sangat vital untuk mendukung mobilitas warga, terutama petani, dalam mengangkut hasil kebun dan beraktivitas sehari-hari,” ujarnya saat peresmian. Proyek ini menelan anggaran sebesar Rp12 miliar yang dialokasikan dalam dua tahun anggaran, yakni 2022 dan 2023. 
        Kepala Dinas Pekerjaan Umum dan Penataan Ruang (PUPR) Rejang Lebong, Samsul Maarif, menjelaskan bahwa jembatan ini memiliki lebar 3,5 meter dan dirancang untuk dilalui kendaraan roda dua hingga roda empat. Selain pembangunan jembatan, pemerintah juga merencanakan pembangunan 
        jalan penghubung UPT Kota Padang dengan Kota Padang Baru dan Lubuk Belimbing II sepanjang 5.140 meter yang akan diaspal hotmix. Proyek ini diharapkan dapat meningkatkan konektivitas antarwilayah dan memperlancar distribusi barang serta akses layanan publik bagi masyarakat di daerah tersebut.
        Warga setempat menyambut baik pembangunan jembatan ini. “Kami sangat bersyukur karena selama ini akses ke desa kami sangat terbatas, terutama saat musim hujan. Dengan adanya jembatan baru ini, mobilitas kami akan lebih lancar,” kata Sudarti, Kepala Desa Lubuk Belimbing II.
        Pemerintah Kabupaten Rejang Lebong berkomitmen untuk terus meningkatkan pembangunan infrastruktur di daerah pelosok guna mendorong pertumbuhan ekonomi dan kesejahteraan masyarakat.
        </Text>

        <Text style={styles.penulis}>Ditulis oleh: Najwa Nabilah</Text>

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

export default Berita1;
