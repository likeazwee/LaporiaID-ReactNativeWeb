import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    ScrollView, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function DataPetugas() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [form, setForm] = useState({
        nama: '', jk: '', alamat: '', telp: '', email: '', username: '',
    });

    useEffect(() => {
        const loadData = async () => {
            // Misal data inisialisasi seperti ini (atau dari AsyncStorage)
            const initialData = [
                { id: '1', nama: 'Siti Aminah', jk: 'Perempuan', alamat: 'Gading Cempaka', telp: '081234567890', email: 'siti@gmail.com', username: 'siti123' },
                { id: '2', nama: 'Budi Santoso', jk: 'Laki-laki', alamat: 'Medan Baru', telp: '082345678901', email: 'budi@gmail.com', username: 'budi456' },
                { id: '3', nama: 'Rahmawati', jk: 'Perempuan', alamat: 'Padang Harapan', telp: '083456789012', email: 'rahma@gmail.com', username: 'rahma789' },
            ];
            setData(initialData);
            setFilteredData(initialData);
        };
        loadData();
    }, []);

    useEffect(() => {
        filterData(searchText, data);
    }, [data]);

    const filterData = (text, baseData = data) => {
        const filtered = baseData.filter(item =>
            item.nama.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
        filterData(text);
    };

    const handleAddPress = () => {
        setShowForm(!showForm);
        setForm({ nama: '', jk: '', alamat: '', telp: '', email: '', username: '' });
        setEditId(null);
    };

    const handleInputChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = () => {
        if (!form.nama || !form.jk || !form.alamat || !form.telp || !form.email || !form.username) {
            Alert.alert('Peringatan', 'Semua field harus diisi!');
            return;
        }

        if (editId) {
            const updatedData = data.map(item =>
                item.id === editId ? { ...form, id: editId } : item
            );
            setData(updatedData);
            setEditId(null);
        } else {
            const newEntry = {
                ...form,
                id: (data.length + 1).toString(),
            };
            setData([...data, newEntry]);
        }

        setForm({ nama: '', jk: '', alamat: '', telp: '', email: '', username: '' });
        setShowForm(false);
        setSearchText('');
    };

    const handleDelete = (id) => {
        Alert.alert(
            "Konfirmasi",
            "Apakah Anda yakin ingin menghapus data ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: () => {
                        const newData = data.filter(item => item.id !== id);
                        setData(newData);
                        setSearchText('');
                    }
                }
            ]
        );
    };

    const handleUpdate = (id) => {
        const entryToEdit = data.find(item => item.id === id);
        setForm(entryToEdit);
        setEditId(id);
        setShowForm(true);
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('admin')}
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={28} color="#2563eb" />
            </TouchableOpacity>

            <Text style={styles.title}>Data Petugas</Text>

            <View style={styles.searchAddContainer}>
                <TextInput
                    placeholder="Cari nama petugas..."
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={handleSearchChange}
                    clearButtonMode="while-editing"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddPress} activeOpacity={0.7}>
                    <Text style={styles.addButtonText}>{showForm ? 'TUTUP' : '+ TAMBAH'}</Text>
                </TouchableOpacity>
            </View>

            {showForm && (
                <View style={styles.formContainer}>
                    {['nama', 'jenis kelamin', 'alamat', 'telp', 'email', 'username'].map((key) => (
                        <TextInput
                            key={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={form[key]}
                            onChangeText={(value) => handleInputChange(key, value)}
                            style={styles.input}
                            autoCapitalize={key === 'email' || key === 'username' ? 'none' : 'sentences'}
                            keyboardType={
                                key === 'telp' ? 'phone-pad' :
                                key === 'email' ? 'email-address' : 'default'
                            }
                            placeholderTextColor= '#64748b80'
                        />
                    ))}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
                        <Text style={styles.submitButtonText}>{editId ? 'UPDATE' : 'SIMPAN'}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>No</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>NAMA</Text>
                <Text style={styles.tableHeaderCell}>JK</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>ALAMAT</Text>
                <Text style={styles.tableHeaderCell}>TELP</Text>
                <Text style={styles.tableHeaderCell}>EMAIL</Text>
                <Text style={styles.tableHeaderCell}>USERNAME</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>OPSI</Text>
            </View>

            {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <View key={item.id} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                        <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.nama}</Text>
                        <Text style={styles.tableCell}>{item.jk}</Text>
                        <Text style={[styles.tableCell, { flex: 1.2 }]}>{item.alamat}</Text>
                        <Text style={styles.tableCell}>{item.telp}</Text>
                        <Text style={styles.tableCell}>{item.email}</Text>
                        <Text style={styles.tableCell}>{item.username}</Text>
                        <View style={[styles.optionsCell, { flex: 1 }]}>
                            <TouchableOpacity onPress={() => handleUpdate(item.id)} style={styles.iconBtn}>
                                <Ionicons name="create-outline" size={20} color="#374151" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
                                <Ionicons name="trash-outline" size={20} color="#374151" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>Data tidak ditemukan</Text>
            )}

            <Text style={styles.entriesInfo}>Menampilkan {filteredData.length} dari {data.length} data</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f7fa',
        flex: 1,
    },
    backButton: {
        marginBottom: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1E3A8A',
        textAlign: 'center',
        textShadowColor: 'rgba(136, 125, 125, 0.52)',
        textShadowOffset: { width: 3, height:3},
        textShadowRadius: 1,
    },
    searchAddContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#94a3b8',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginRight: 12,
    },
    addButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 12,
        justifyContent: 'center',
        shadowColor: '#2563eb',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    formContainer: {
        marginBottom: 24,
        padding: 20,
        backgroundColor: '#e0e7ff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#c7d2fe',
        shadowColor: '#7c3aed',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#a5b4fc',
        shadowColor: '#7c3aed',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    submitButton: {
        backgroundColor: '#4f46e5',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#4338ca',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 5 },
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#c7d2fe',
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#3730a3',
        textAlign: 'center',
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#f9fafb',
        marginBottom: 2,
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db',
        borderRadius: 12,
    },
    tableCell: {
        fontSize: 14,
        color: '#334155',
        textAlign: 'center',
        flex: 1,
    },
    optionsCell: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#64748b',
        fontSize: 16,
    },
    entriesInfo: {
        textAlign: 'center',
        marginVertical: 14,
        color: '#64748b',
        fontSize: 13,
        fontStyle: 'italic',
    },
});