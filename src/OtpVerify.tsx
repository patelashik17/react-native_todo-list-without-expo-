import axios from 'axios';
import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import Loader from './Loader';

const OtpVerify = ({navigation, email}: any) => {
  const [otpData, setOtpData] = useState<string>();
  const [loader, setLoader] = useState(false);

  const handleChangeEmail = (text: string) => {
    setOtpData(text);
  };

  console.log('props', email);
  const handleResend = async () => {
    if (otpData) {
      console.log('Navigate');
      const payload = {
        email: email,
        otp: otpData,
      };
      try {
        const response = await axios.post(
          'https://native-app-rzx7.onrender.com/user/verify-email',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          const data = response.data;
          console.log('response***', data);
          await navigation.navigate('todo');
        } else {
          console.error('Failed to register:', response.statusText);
          setLoader(false);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setLoader(false);
      }
    }
  };

  const handleResendOtp = async () => {
    console.log('Navigate');
    const payload = {
      email: email,
    };
    try {
      const response = await axios.post(
        'https://native-app-rzx7.onrender.com/user/resent-otp',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const data = response.data;
        await navigation.navigate('todo');
      } else {
        console.error('Failed to register:', response.statusText);
        setLoader(false);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setLoader(false);
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
          <Text style={{fontSize: 40, color: 'purple'}}>One step ahead !!</Text>
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
          value={otpData}
          onChangeText={handleChangeEmail}
        />

        <View style={{width: '100%'}}>
          <Button title="Submit" onPress={handleResend} />
        </View>
        <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
          <Text style={{fontSize: 17, color: 'black'}}>
            Otp didn't received
            <Text
              style={{fontSize: 20, color: 'purple'}}
              onPress={handleResendOtp}>
              {' '}
              Resent it ?
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OtpVerify;
