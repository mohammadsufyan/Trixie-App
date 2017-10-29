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
      borderWidth,
      backgroundColor,
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
              justifyContent: 'center',
              alignItems: 'center',
              alignItems: 'stretch',
              overflow: 'hidden',
              backgroundColor,
            }}
        >
          <View
            style={{
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderTopLeftRadius,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1
            }}
          >
            <Image
              source={(this.props.mode === 'uri') ? { uri: this.props.imageLink } : this.props.imageLink }
              style={{
                width,
                height,
                borderTopRightRadius,
                borderBottomRightRadius,
                borderBottomLeftRadius,
                borderTopLeftRadius
              }}
            />
          </View>
        </View>
    );
  }
}

export default DropTransparentLeft;
