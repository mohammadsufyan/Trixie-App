'use strict';

import React,{Component} from 'react';

import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

export class CustomMarker extends Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={require('../../../Assets/Icons/Settings/Balloon_white.png')}
        resizeMode='contain'
      >
      <View><Text>18</Text></View>
      </Image>

    );
  }
}

export class CustomMarker1 extends Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={require('../../../Assets/Icons/Settings/Balloon_white.png')}
        resizeMode='contain'
      >
      <View><Text>18</Text></View>
      </Image>

    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    alignItems:'center',
    justifyContent:'center'
  }
});
