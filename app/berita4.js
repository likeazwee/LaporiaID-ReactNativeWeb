import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Navbar from './Navbar';

const Berita4 = () => {
  return (
    <View style={styles.wrapper}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.metaTop}>Laporia · Selasa, 22 April 2025</Text>

        <Image
          source={require('../assets/sampah.jpeg')}
          style={styles.image}
        />

        <Text style={styles.kategori}>LINGKUNGAN</Text>
        <Text style={styles.judul}>
          Sampah Menumpuk di Pinggir Jalan
        </Text>

        <Text style={styles.subjudul}>
          Warga Keluhkan Kebersihan, Pemerintah Janji Tindak Lanjut
        </Text>

        <Text style={styles.isi}>
        Bumi Ayu, Bengkulu – Kondisi sampah yang menumpuk di pinggir jalan utama Desa Bumi Ayu membuat warga setempat merasa resah dan khawatir akan dampak kesehatan dan lingkungan. 
        Tumpukan sampah yang tak segera diangkut telah menimbulkan bau tidak sedap dan menjadi sarang nyamuk, terutama di musim hujan seperti sekarang.
        “Sampah sudah menumpuk lebih dari satu minggu di sini, tapi belum ada yang datang membersihkan. Kami takut penyakit seperti DBD akan menyebar kalau dibiarkan terus,” 
        keluh Sari, warga sekitar. Menurut warga, salah satu penyebab penumpukan sampah adalah jadwal pengangkutan yang tidak teratur serta kurangnya tempat pembuangan sementara yang memadai di desa. 
        Selain itu, tingginya volume sampah rumah tangga yang meningkat juga menjadi tantangan tersendiri. Pemerintah desa Bumi Ayu melalui Kepala Desa, Ahmad Faisal, menyampaikan bahwa pihaknya 
        sudah menginstruksikan petugas kebersihan untuk segera melakukan pengangkutan sampah yang menumpuk. “Kami juga akan menambah tempat sampah dan mengingatkan warga untuk tidak membuang sampah sembarangan,” ujarnya.
        Dinas Lingkungan Hidup Kota Bengkulu juga berjanji akan melakukan pemantauan lebih intensif dan membantu penyediaan fasilitas pengelolaan sampah yang lebih baik di desa-desa pelosok.
        “Sampah memang menjadi masalah serius, tapi kami terus berupaya memperbaiki layanan pengelolaan sampah agar lingkungan tetap bersih dan sehat,” kata Kepala Dinas, Nurul Hidayah.
        Warga berharap pemerintah dapat meningkatkan koordinasi dan perhatian terhadap kebersihan lingkungan agar masalah penumpukan sampah tidak terulang kembali.
        </Text>

        <Text style={styles.penulis}>Ditulis oleh: Salah Naser</Text>

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

export default Berita4;
