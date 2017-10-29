import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
//import { connect } from 'react-redux';
import DropActivity from '../../common/DropActivity.js';
import BackgroundImage from '../../common/BackgroundImage';
import { SERVER_IP_PORT } from '../../../Assets/Strings';
import axios from 'axios';


class FTMConfirm extends Component {

  state = {
    user: {
      name: 'default',
      age: 'default'
    }
  }

  componentWillMount() {
    this.getUserDetails();
    console.log(this.props.userDetails.profilePicture);
  }

  getUserDetails() {
    let address = SERVER_IP_PORT.concat('/api/trixie/getUserByFBID/');
    axios.get(address)
    .then(response => {
      this.setState({user: response.data[0]});
    })
    .catch(() => {});
  }

  render() {
    const background = require('../../../Assets/background.png');
    return (
      <BackgroundImage Image={background}>
      <Image
        source={require('../../../Assets/Icons/Chats/shadow.png')}
        style={{ height: 12, width: win.width }}
      />
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 7 }}>
          <View
            style={{
             borderTopLeftRadius: ((win.width / 1.6) + 60) / 2,
             borderBottomRightRadius: ((win.width / 1.6) + 60) / 2,
             borderBottomLeftRadius: ((win.width / 1.6) + 60) / 2,
             borderColor: 'rgba(40, 40, 40, .40)',
             borderWidth: 25
           }}
          >
            <DropActivity customStyle={styles.dropstyle} mode='uri' imageLink={this.props.userDetails.profilePicture} />
          </View>
        </View>

      
      </ScrollView>
      </BackgroundImage>


    );
  }
}

const win=Dimensions.get('window');

const styles=  {
  dropstyle: {
      width:win.width/1.7,
      height:win.width/1.7,
      borderBottomLeftRadius: win.width / 3.4,
      borderBottomRightRadius: win.width / 3.4,
      borderTopRightRadius: 0,
      borderTopLeftRadius: win.width / 3.4
  }
};

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails,
  };
};

export default FTMConfirm;
//export default connect(mapStateToProps)(FTMConfirm);
