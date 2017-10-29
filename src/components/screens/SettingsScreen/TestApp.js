//This is the App file for all the testing purposes.
import React,{Component} from 'react';
import {View,Text} from 'react-native';
import SettingsScreen from './SettingsScreen';

import BackgroundImage from '../TabScreen/BackgroundImage';
//import {MyProfileNavigator} from './Uday/TabScreen/screens/config/router'
//import {MainScreenTabs} from './Uday/TabScreen/config/router'
import {Root} from 'native-base';


class TestApp extends Component {
  render()
  {
    const image = require('../TabScreen/images/background.png');
    return(
       <BackgroundImage Image={image}>
       <Root>
                <SettingsScreen />
        </Root>
 </BackgroundImage>
        //  <MyProfileNavigator />
        //<MainScreenTabs />


    );
  }
}

export default TestApp;
