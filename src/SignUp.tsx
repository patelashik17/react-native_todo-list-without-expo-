import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Loader from './Loader';
import OtpVerify from './OtpVerify';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}: any) => {
  const [emailData, setEmailData] = useState<string>();
  const [passwordData, setPasswordData] = useState<string>();
  const [firstName, setFirstName] = useState<string>('');
  const [mobileNumber, setMobilNumber] = useState<string>('');
  const [loader, setLoader] = useState(false);
  const [responseDataEmail, setResponseDataEmail] = useState<string>('');
  const handleChangeEmail = (text: string) => {
    setEmailData(text);
  };

  const handleChangeText = (text: string) => {
    setFirstName(text);
  };

  const handleChangeNumber = (text: string) => {
    setMobilNumber(text);
  };

  const handleChangePassword = (text: string) => {
    setPasswordData(text);
  };

  let responseEmail: string = '';
  const handleNavigate = async () => {
    // if (emailData && passwordData && mobileNumber && firstName) {
    setLoader(true);
    const payload = {
      fullName: firstName,
      email: emailData,
      mobileNumber: mobileNumber,
      password: passwordData,
    };
    try {
      const response = await axios.post(
        'https://native-app-rzx7.onrender.com/user/create',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        setLoader(false);
        const data = response.data;
        console.log('response', data?.data?.email);
        responseEmail = data?.data?.email;
        setResponseDataEmail(data?.data?.email);
        // AsyncStorage.setItem('Email', data);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Hello', ToastAndroid.SHORT);
        } else {
          Alert.alert('Hello');
        }
        await navigation.navigate('otp');
      } else {
        console.error('Failed to register:', response);
        setLoader(false);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Hello', ToastAndroid.SHORT);
        } else {
          Alert.alert('Hello');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Hello', ToastAndroid.SHORT);
      } else {
        Alert.alert('Hello');
      }
      setLoader(false);
      // }
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <>
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
            <Text style={{fontSize: 40, color: 'purple'}}>Create Account</Text>
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
            placeholder="Enter Name"
            value={firstName}
            onChangeText={handleChangeText}
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
            value={mobileNumber}
            onChangeText={handleChangeNumber}
            placeholder="Enter mobile number"
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
            <Button title="Create a account" onPress={handleNavigate} />
          </View>
          <View>
            <Text style={{fontSize: 17, color: 'black'}}>
              Have Account ?{' '}
              <Text
                onPress={() => navigation.navigate('otp')}
                style={{fontSize: 20, color: 'purple'}}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <OtpVerify email={responseDataEmail} />
    </>
  );
};

export default SignUp;
