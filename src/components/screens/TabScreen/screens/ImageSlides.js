import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

import Drop from '../Drop';

class ImageSlides extends Component {




  renderSlide() {
    let Slide = null;

    if (this.props.slideNumber === '1') {
      Slide = (
        <Image source={require('../images/kaushik.jpg')} style={this.props.styler}/>
      );
    } else if (this.props.slideNumber === '2') {
      Slide = (
        <Image source={require('../images/kaushik.jpg')} style={this.props.styler}/>
      );
    } else if (this.props.slideNumber === '3') {
      Slide = (
        <Image source={require('../images/uday.jpg')} style={this.props.styler}/>
      );
    }
    return Slide;
  }

  render() {
    return (
      <View>
        {this.renderSlide()}
      </View>
    );
  }

}

const win = Dimensions.get('window');

const styles = {
  dropstyle: {
      width: win.width / 1.8,
      height: win.width / 1.8,
      borderBottomLeftRadius: win.width / 3.6,
      borderBottomRightRadius: win.width / 3.6,
      borderTopRightRadius: win.width / 3.6,
      borderWidth: 20,
      borderColor: 'rgba(0, 0, 0, .25)'
  },
  dropContainerStyle: {
    alignItems: 'center',
    marginTop: 70
  },
  descriptionLogoStyle: {
    alignItems: 'center',
    marginTop: 30
  },
  descriptionTextViewStyle: {
    alignItems: 'center',
    marginTop: 10
  },
  descriptionTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    width: win.width / 1.3,
  },
  HeadTextViewStyle: {
    alignItems: 'center',
    marginTop: 10
  },
  HeadTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    width: win.width / 1.3,
    fontWeight: '600'
  },
  buttonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderColor: null,
    elevation: 0,
    alignItems: 'center',
    alignSelf: 'center'
  },
  agreementTextStyle: {
    fontSize: 12,
    color: '#fff',
  },
  agreementViewStyle: {
    marginTop: 30,
    alignItems: 'center'
  },
  agreementInnerViewStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  checkboxStyle: {
    opacity: 0.6,
    height: 23,
    width: 23
  },
  agreementTextViewStyle: {
    width: win.width / 1.5,
    paddingLeft: 10,
  },
  TCTextStyle: {
    fontSize: 12,
    color: '#fff',
    textDecorationLine: 'underline'
  }
};

export default ImageSlides;
