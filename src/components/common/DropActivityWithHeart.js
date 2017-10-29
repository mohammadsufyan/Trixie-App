import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SERVER_IP } from '../../Assets/Strings';

class DropTransparentLeft extends Component {
  render() {
    let source = SERVER_IP.concat('/Trixie/TrixieImages/')
                          .concat(this.props.imageSrc);
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
              justifyContent: 'center',
              alignItems: 'center',
              alignItems: 'stretch',
              overflow: 'hidden'
            }}
        >
          <View
            style={{
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1
            }}
          >
            <Image
              source={{ uri: source }}
              style={{
                width,
                height,
                borderTopRightRadius,
                borderBottomRightRadius,
                borderBottomLeftRadius,
                borderTopLeftRadius,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,1)',
                height: 40,
                width: 40,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                alignItems: 'stretch',
                overflow: 'hidden'
              }}
            >
              <Image
                source={require('../../Assets/Icons/Interests/blackPeach.png')}
                style={{
                  height: 40,
                  width: 40,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              />
            </View>

          </View>
        </View>
    );
  }
}

export default DropTransparentLeft;
