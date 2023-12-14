import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
import { useEffect, useState } from 'react';

const client = new KindeSDK(process.env.EXPO_PUBLIC_KINDE_ISSUER_URL, process.env.EXPO_PUBLIC_KINDE_POST_CALLBACK_URL, process.env.EXPO_PUBLIC_KINDE_CLIENT_ID, process.env.EXPO_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticate = async () => {
    // Using `isAuthenticated` to check if the user is authenticated or not
    if (await client.isAuthenticated) {
        setIsAuthenticated(true);
    } else {
        setIsAuthenticated(false);
    }
};

useEffect(() => {
    checkAuthenticate();
}, []);

const handleSignIn = async () => {
    const token = await client.login();

    if (token) {
        console.log(token);
        setIsAuthenticated(true);
    }
};

const handleLogout = async () => {
    // With open web in your apps
    const isLoggedOut = await client.logout();

    if (isLoggedOut) {
      setIsAuthenticated(false);
    }
};


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {isAuthenticated ? (
        <Button onPress={handleLogout} title="Logout" />
      ) : (
        <Button onPress={handleSignIn} title="Login" />
      )}

      <Text>isAuthenticated: {isAuthenticated ? 'true' : 'false'}</Text>
      <StatusBar style="auto" />
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
});
