import React, { Component } from 'react';
import { View, Image } from 'react-native';

class DropTransparentLeft extends Component {
  render() {
    const { image } = this.props;
    const {
      width,
      height,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
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
              borderWidth,
              borderColor,
              flexDirection: 'row',
              alignItems: 'stretch'
            }}
        >
          <Image
            source={image}
            style={{
              flex: 1,
              height: null,
              width: null,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
            }}
          />
        </View>
    );
  }
}

export default DropTransparentLeft;
