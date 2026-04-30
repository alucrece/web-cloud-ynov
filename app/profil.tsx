import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Profil() {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace('/');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerLeft: () => null, title: "Profil" }} />

      <Text style={styles.text}>Ici s'affichera prochainement votre profil</Text>
      
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});