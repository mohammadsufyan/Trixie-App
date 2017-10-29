import React from 'react';
import { View, Text } from 'react-native';

const CustomText = (props) => {
  return (
      <Text
        style={{ ...{ fontFamily: 'quicksand-regular' }, ...props.style, }}
      >
        {props.children}
      </Text>
  );
};

export default CustomText;
