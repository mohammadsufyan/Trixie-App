import React, { Component } from 'react';
import { View, TouchableOpacity, Image, BackHandler } from 'react-native';
import ProfileEditScreen from './ProfileEditScreen';
import BackgroundImage from './BackgroundImage';

const image = require('../../../Assets/background.png');

let navigation = null;
let onBackPress = null;

class App extends Component {

  static navigationOptions = {
    headerLeft:
      <TouchableOpacity
        onPress={() => {
          onBackPress();
          navigation.goBack();
        }}
        title={'Back'}
      >
        <Image
          source={require('../../../Assets/Icons/Settings/back_pink.png')}
          style={{ height: 20, width: 20, marginLeft: 20 }}
        />
      </TouchableOpacity>
  }

  constructor(props) {
    super(props);
    navigation = props.navigation;
    onBackPress = this.handleBackPress;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackPress();
      return false;
    });
  }

  handleBackPress() {
    console.log('backed');
  }

  render() {
    return (
         <BackgroundImage Image={image}>
         <View style={{ flex: 1 }}>
          <ProfileEditScreen />
        </View>
        </BackgroundImage>
    );
  }
}

export default App;
