import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ToastAndroid, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { signInWithGithub } from '../firebase/auth_github_provider_create';
import { signInAnonymouslyUser } from '../firebase/auth_anonymous';


export default function Index() {
  const router = useRouter();

  const handleGithubLogin = () => {
    signInWithGithub()
      .then(() => {
        if (Platform.OS === 'android') {
          ToastAndroid.show("Welcome with GitHub!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Success", "Logged in with GitHub");
        }
        router.replace('/profil');
      })
      .catch((error) => {
        console.log(error.code);
        Alert.alert("Login Failed", "GitHub authentication was cancelled or failed.");
      });
  };

  const handleAnonymousLogin = () => {
    signInAnonymouslyUser()
      .then(() => {
        if (Platform.OS === 'android') {
          ToastAndroid.show("Welcome with GitHub!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Success", "Logged in with GitHub");
        }
        router.replace('/profil');
      })
      .catch((error) => {
        Alert.alert("Error", "Anonymous login failed.");
      });
  };


  return (
    <View style={styles.container}>
      {/* BARRE DE NAVIGATION */}
      <View style={styles.navBar}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/signin" style={styles.link}>Sign In</Link>
        <Link href="/signup" style={styles.link}>Sign Up</Link>
      </View>

      {/* CONTENU DE LA PAGE */}
      <View style={styles.content}>
        <Text style={styles.title}>TP Web Cloud</Text>
        <Text style={styles.subtitle}>Welcome to the Expo Router app</Text>
        
        {/* BOUTON GITHUB */}
        <TouchableOpacity 
          style={styles.githubButton} 
          onPress={handleGithubLogin}
        >
          <Text style={styles.buttonText}>Continue with GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.githubButton, { marginTop: 15 }]} 
          onPress={handleAnonymousLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/signin')}>
          <Text style={styles.secondaryLink}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 40 : 0, 
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30, 
  },
  githubButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryLink: {
    marginTop: 20,
    color: '#007AFF',
    textDecorationLine: 'underline',
  }
});