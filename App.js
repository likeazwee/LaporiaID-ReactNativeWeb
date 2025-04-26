import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './app/index';
import About from './app/about';
import News from './app/berita';
import Kontak from './app/kontak';
import ProfileScreen from './app/profil'; 
import LacakPengaduan from './app/lacakpengaduan';
import FormPengaduan from './app/FormPengaduan';
import Berita1 from './app/berita1';
import Berita2 from './app/berita2';
import Berita3 from './app/berita3';
import Berita4 from './app/berita4';
import Admin from './app/admin';
import ProfilAdmin from './app/profiladmin';
import DataPetugas from './app/DataPetugas';
import DataMasyarakat from './app/DataMasyarakat';
import DataPengaduan from './app/DataPengaduan';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Kontak" component={Kontak} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="LacakPengaduan" component={LacakPengaduan} />
        <Stack.Screen name="FormPengaduan" component={FormPengaduan} />
        <Stack.Screen name="berita1" component={Berita1} />
        <Stack.Screen name="berita2" component={Berita2} />
        <Stack.Screen name="berita3" component={Berita3} />
        <Stack.Screen name="berita4" component={Berita4} />
        <Stack.Screen name="Admin" component={Admin}/>
        <Stack.Screen name="ProfilAdmin" component={ProfilAdmin}/>
        <Stack.Screen name="DataPetugas" component={DataPetugas}/>
        <Stack.Screen name="DataMasyarakat" component={DataMasyarakat}/>
        <Stack.Screen name="DataPengaduan" component={DataPengaduan}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
