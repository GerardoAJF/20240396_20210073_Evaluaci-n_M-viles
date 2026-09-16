import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import TextInputField from '../components/TextInputField';
import InfoRow from '../components/InfoRow';
 
const Dashboard = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ nombre: '', fechaNacimiento: '', carnet: '' });
 
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigation.replace('Login');
        return;
      }
      
      // Obtener datos del usuario desde Cloud Firestore
      try {
        const docRef = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          const data = snap.data();
          setUsuario(data);
          setForm({
            nombre: data.nombre || '',
            fechaNacimiento: data.bornDate || '',
            carnet: data.carnet || '',
          });
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    });
 
    return () => unsubscribeAuth();
  }, []);
 
  const handleSave = async () => {
    try {
      if (!auth.currentUser) return;
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      
      // Actualizar en Firestore
      await updateDoc(docRef, form);
      
      // Actualizar estado local
      setUsuario(form);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };
 
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // El listener onAuthStateChanged redirige automáticamente a Login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
 
  if (!usuario) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0288d1" />
        <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
      </View>
    );
  }
 
  // Generar iniciales para el Avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };
 
  return (
    <View style={styles.container}>
      {/* Avatar con iniciales */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(usuario.nombre)}</Text>
        </View>
      </View>
 
      <Text style={styles.title}>{usuario.nombre}</Text>
 
      {isEditing ? (
        <>
          <TextInputField
            label="Nombre completo"
            value={form.nombre}
            onChangeText={(text) => setForm({ ...form, nombre: text })}
          />
          <TextInputField
            label="Fecha de nacimiento"
            value={form.bornDate}
            onChangeText={(text) => setForm({ ...form, fechaNacimiento: text })}
          />
          <TextInputField
            label="Carnet"
            value={form.carnet}
            onChangeText={(text) => setForm({ ...form, carnet: text })}
          />
 
          <TouchableOpacity style={styles.Button} onPress={handleSave}>
            <Text style={styles.ButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <InfoRow label="Fecha de nacimiento" value={usuario.bornDate} />
          <InfoRow label="Carnet" value={usuario.carnet} />
 
          <TouchableOpacity style={styles.Button} onPress={() => setIsEditing(true)}>
            <Text style={styles.ButtonText}>Editar</Text>
          </TouchableOpacity>
        </>
      )}
 
      <TouchableOpacity style={[styles.Button, styles.logout]} onPress={handleLogout}>
        <Text style={styles.ButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default Dashboard;
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FEFEFE', padding: 20 },
  center: { justifyContent: 'center', alignItems: 'center' },
  avatarContainer: { alignItems: 'center', marginVertical: 15 },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0288d1',
    justify: 'center',
    alignItems: 'center',
  },
  avatarText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  Button: { backgroundColor: '#0288d1', padding: 10, borderRadius: 5, marginTop: 20, paddingVertical: 15 },
  logout: { backgroundColor: '#d32f2f' },
  ButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
 