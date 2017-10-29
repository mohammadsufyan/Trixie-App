import React, { Component } from 'react';
import { View, Image } from 'react-native';

class DropTransparentLeft extends Component {
  render() {
    const {
      width,
      height,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
      borderTopLeftRadius,
      borderColor,
      borderWidth
    } = this.props.customStyle;
    return (
        <View
            style={{
              width,
              height,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderTopLeftRadius,
              borderWidth,
              borderColor,
              flexDirection: 'row',
              alignItems: 'stretch'
            }}
        >
          <Image
            source={require('./images/intro_image.jpg')}
            style={{
              flex: 1,
              height: null,
              width: null,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderTopLeftRadius,
              borderBottomLeftRadius,
            }}
          />
        </View>
    );
  }
}

export default DropTransparentLeft;
