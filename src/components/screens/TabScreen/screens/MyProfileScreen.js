import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';
import DropActivity from '../../../common/DropActivity.js';
import BackgroundImage from '../BackgroundImage';
import { SERVER_IP_PORT } from '../../../../Assets/Strings';


class MyProfileScreen extends Component {

  state = {
    user: {
      name: 'default',
      age: 'default'
    }
  }

  componentWillMount() {
    this.getUserDetails();
    // console.log(this.props.userDetails.profilePicture);
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
    const background = require('../images/background.png');
    return (
      <BackgroundImage Image={background}>
      <Image
        source={require('../../../../Assets/Icons/Chats/shadow.png')}
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

        <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
            {this.state.user.name},{` `}
            {this.state.user.age}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, color: '#fff' }}>
            {this.props.userDetails.bio}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, color: '#fff' }}>Works at {this.props.userDetails.currentWork}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10  }}>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProfileEdit'); }}>
              <Image
                source={require('../../../../Assets/Icons/EditProfile/Edit_pencil.png')}
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 20}}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SettingsScreen'); }}>
              <Image
                source={require('../../../../Assets/Icons/EditProfile/Settings_gear.png')}
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
          </View>
        </View>

          <View style={{ marginTop: 20 }}>
            <Button rounded style={{ backgroundColor: '#fff', alignSelf: 'center' }}  onPress={() => { this.props.navigation.navigate('FreeToMeet'); }}>
              <Text style={{ color: '#DD003D', fontSize: 15 }}>FREE TO MEET?</Text>
            </Button>
          </View>

          <View style={{ flex: 1, alignItems: 'center', marginTop: 15, marginBottom: 5 }}>
            <Text style={{ fontSize: 14, color: '#fff' }}>Send a quick message to friends.</Text>
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

export default connect(mapStateToProps)(MyProfileScreen);
