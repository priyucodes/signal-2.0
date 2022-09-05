import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // https://rnfirebase.io/reference/auth/updateprofile
  // https://stackoverflow.com/questions/45309430/how-can-i-replace-screen-with-react-navigation-for-react-native
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    // cleanup function for performance optimization.
    // return () => {
    //   unsubscribe();
    // };
    return unsubscribe;
  }, []);
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          navigation.replace('Home');
        }
      })
      .catch(err => alert(err));
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: 'https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png',
          // uri: 'https://seeklogo.com/images/S/signal-logo-899FCAD070-seeklogo.com.png',
        }}
        style={{ height: 200, width: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          keyboardAppearance="dark"
          keyboardType="email-address"
          leftIcon={<Icon name="chevron-right" size={20} color="#2C6BED" />}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          keyboardType="default"
          leftIcon={<Icon name="chevron-right" size={20} color="#2C6BED" />}
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate('Register')}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
