import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert, ToastAndroid, Platform } from 'react-native';
import { signin } from '../firebase/auth_signin_password';
import { validateForm } from '../utils/validation';
import { router, useRouter} from 'expo-router';

export default function Signin() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} />
      
      <Text>Password</Text>
      <TextInput style={styles.input} onChangeText={onChangePassword} value={password} secureTextEntry={true} />
      
      <Button
        title="Sign In !"
        onPress={() => {
          if (validateForm(email, password, false)) {
            signin(email, password)
              .then(() => {
                if (Platform.OS === 'android') {
                  ToastAndroid.show("Login successful !", ToastAndroid.LONG);
                } else {
                  Alert.alert("Login successful !", "well done");
                }
                router.replace('/profil')
              })
              .catch((error) => {
                if (Platform.OS === 'android') {
                  ToastAndroid.show("Login failed. email or password incorrect", ToastAndroid.LONG);
                } else {
                  alert("Login failed. email or password incorrect");
                }
                error.message
              });
          }
        }}
      />
      {/* <TouchableOpacity onPress={() => router.push('/phone')} style={{ marginTop: 15 }}>
        <Text style={{ color: '#007bff', fontWeight: 'bold' }}>
          Se connecter avec un numéro de téléphone
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { height: 40, width: 250, margin: 12, borderWidth: 1, padding: 10, borderRadius: 5 },
});