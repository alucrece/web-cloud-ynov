import React from "react";
import { router } from "expo-router";
import { Alert, ToastAndroid, Platform } from 'react-native';
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { signup } from "../firebase/auth_signup_password";
import { validateForm } from "../utils/validation";
export default function Signup() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  
  return (
    <View style={styles.container}>
      <Text>Email</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
        />
      <Text>Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
        />
      <Button
          title="Sign Up !"
          onPress={() => {
            if (validateForm(email, password)) {
              signup(email, password)
                .then(() => {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show("Registration successful !", ToastAndroid.LONG);
                  } else {
                    Alert.alert("Registration successful !", "well done");
                  }
                  router.replace('/profil')})
            }
          }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});