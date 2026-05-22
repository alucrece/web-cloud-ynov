import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { auth } from '../firebaseConfig'; // On utilise cet "auth" global partout
import { signOut, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from '../storage_upload_file';
import { updateUserPhotoUrl } from '../firebase/auth_update_photo_url'

interface UserProfileState {
  photoUrl: string | undefined;
}

export default function Profil() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfileState>({ 
    photoUrl: auth.currentUser?.photoURL || undefined 
  });
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          photoUrl: firebaseUser.photoURL || undefined
        });
      } else {
        // Si l'utilisateur est déconnecté, on le redirige
        router.replace('/');
      }
    });

    // Nettoyage de l'écouteur quand le composant est détruit
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace('/');
      })
      .catch((error) => console.log(error.message));
  };

  const pickImage = async () => {
    // Logic to pick an image from the device's gallery
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const { uri } = result.assets[0];
      const fileName = uri.split('/').pop();
      const uploadResp = await uploadToFirebase(uri, fileName);
      let res = await updateUserPhotoUrl(uploadResp);
      if (res) {
        console.log(res);
        setUser({ ...user, photoUrl: uploadResp });
      } else {
        console.log("Error updating user profile");
      }
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Connexion</Text>
      <Stack.Screen options={{ headerLeft: () => null, title: "Profil" }} />

      <Text style={styles.text}>Ici s'affichera prochainement votre profil</Text>
      <Image 
        style={styles.image}
        source={{ uri: image || user.photoUrl || 'https://via.placeholder.com/150' }}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={pickImage}>
        <Text style={styles.primaryButtonText}>Choisir une photo de profil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20 
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Fond gris très clair moderne
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70, // Rend l'image parfaitement ronde
    backgroundColor: '#cbd5e1', // Fond gris de secours le temps que l'image charge
    marginBottom: 32,
    borderWidth: 3,
    borderColor: '#ffffff', // Petit contour blanc élégant
    // Effet d'ombre
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#2563eb', // Bleu royal moderne
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10, // Angles bien arrondis
    width: '90%',     // Prend presque toute la largeur
    alignItems: 'center',
    marginBottom: 16, // Écart avec le bouton du dessous
    elevation: 2,     // Légère ombre
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});