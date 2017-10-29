import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height;
const styles = {
    curloc: {
      backgroundColor: '#A6A6A6',
      height: width / 10,
      width: width / 10,
      position: 'absolute',
      right: 10,
      top: height / 10,
      opacity: 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    }
};

export default styles;
