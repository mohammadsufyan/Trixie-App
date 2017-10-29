import React, { Component } from 'react';
import { Root } from 'native-base';
import { MainScreenTabs } from '../../../config/router';
import BackgroundImage from './BackgroundImage';
import {StatusBar,View } from 'react-native'

const image = require('./images/kaushik.jpg');

class TabMain extends Component {
  render() {
    return (

      <BackgroundImage Image={image}>
      <StatusBar
         backgroundColor="#9A1137"
         barStyle="light-content"
       />
        <Root>
          <MainScreenTabs />
        </Root>
      </BackgroundImage>

    );
  }
}

export default TabMain;
