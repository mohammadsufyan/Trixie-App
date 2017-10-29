import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';

//const loginImage = require('../../images/login.png');

class BackgroundImage extends Component {
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        backgroundColor: 'rgba(0,0,0,0)',
        resizeMode: 'cover',
    },
});

export default BackgroundImage;
