import {useEffect} from 'react';
import {Image, View} from 'react-native';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('./images--1.png')}
        height={100}
        width={100}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </View>
  );
};

export default Splash;
