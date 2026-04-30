import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// On importe Link pour la navigation
import { Link } from 'expo-router';

export default function Index() {
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
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Pour éviter l'encoche (notch) du téléphone
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});