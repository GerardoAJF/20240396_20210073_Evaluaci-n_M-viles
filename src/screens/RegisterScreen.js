import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Alert, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db } from '../FirebaseConfig';
import { setDoc } from 'firebase/firestore';

export const Register = ({ Navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bornDate, setBornDate] = useState("")
    const [carnet, setCarnet] = useState("")
    const [image, setImage] = useState("")

    const { register } = useAuth()

    const handleRegister = async () => {
        try {
            const user = await register(email, password)
            const uid = user.uid
            await setDoc(uid, {
                name, bornDate, carnet, image
            })
        } catch (error) {
            Alert.alert("Error al registrar", error)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de sesión</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder='Gerardo'
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Carnet:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setCarnet(text)}
                    value={carnet}
                    placeholder='20240396'
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo electrónico:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder='20240396@ricaldone.edu.sv'
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de nacimiento:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setBornDate(text)}
                    value={bornDate}
                    placeholder='06/10/2007'
                    
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Imagen:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setImage(text)}
                    value={image}
                    keyboardType="url"
                    placeholder='https://imagen.jpg'
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Navigation.navigate("Login")}>
                <Text style={styles.link}>Volver a "iniciar sesión"</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#ff9800'
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%'
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
    link: {
        textAlign: "center",
        color: "#4444FF"
    }
});