import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Platform
} from 'react-native';

//const loginImage = require('../../images/login.png');

class BackgroundImage extends Component  {
    render() {
        return (
            <Image
              source={this.props.Image}
              style={styles.backgroundImage}
            >
              {this.props.children}
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
      resizeMode: 'cover',
      width: null,
      height: null,
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'column',
      //paddingTop: (Platform.OS === 'ios') ? 20 : 0

    },
});

export default BackgroundImage;
