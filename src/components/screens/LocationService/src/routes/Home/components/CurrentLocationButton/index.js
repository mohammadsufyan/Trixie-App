import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import styles from './CurrentLocationButtonStyles.js';

export const CurrentLocationButton = ({
	getCurrentLocation
}) => {
		return (
      <TouchableOpacity style={styles.curloc} onPress={() => getCurrentLocation()}>
      <View >
        <Image
          source={require('../../../../Assets/Icons/Settings/crosshair.png')}
          style={{ height: 20, width: 20 }}
        />
      </View>
    </TouchableOpacity>

		);
};

export default CurrentLocationButton;
