import axios from 'axios';
import {useEffect, useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import Loader from './Loader';
import OtpVerify from './OtpVerify';

const Login = ({navigation}: any) => {
  const [emailData, setEmailData] = useState<string>();
  const [passwordData, setPasswordData] = useState<string>();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setEmailData('');
    setPasswordData('');
  }, []);

  const handleChangeEmail = (text: string) => {
    setEmailData(text);
  };

  const handleChangePassword = (text: string) => {
    setPasswordData(text);
  };

  const handleNavigate = async () => {
    if (emailData && passwordData) {
      console.log('Navigate');
      const payload = {
        email: emailData,
        password: passwordData,
      };
      try {
        const response = await axios.post(
          'https://native-app-rzx7.onrender.com/user/login',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          const data = response.data;
          console.log('response', data);
          await navigation.navigate('todo');
        } else {
          console.error('Failed to register:', response.statusText);
          setLoader(false);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setLoader(false);
      }
      await navigation.navigate('signup');
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <View>
      <View
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 20,
          padding: 20,
        }}>
        <View style={{display: 'flex', width: '100%', alignItems: 'center'}}>
          <Text style={{fontSize: 40, color: 'purple'}}>Just Login!!</Text>
        </View>
        <TextInput
          style={{
            borderColor: 'black',
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            fontSize: 18,
          }}
          placeholder="Enter Email"
          value={emailData}
          onChangeText={handleChangeEmail}
        />
        <TextInput
          style={{
            borderColor: 'black',
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            fontSize: 18,
          }}
          value={passwordData}
          textContentType="password"
          onChangeText={handleChangePassword}
          placeholder="Enter Password"
        />
        <View style={{width: '100%'}}>
          <Button title="Press to login" onPress={handleNavigate} />
        </View>
        <View>
          <Text style={{fontSize: 17, color: 'black'}}>
            Create Account ?{' '}
            <Text
              onPress={() => navigation.navigate('signup')}
              style={{fontSize: 20, color: 'purple'}}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
