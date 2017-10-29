import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import {
  ListItem,
  Badge
} from 'native-base';
import DropActivity from '../../../common/DropActivity.js'
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import Drop from '../Drop';
import * as actions from '../../../../actions';
import BackgroundImage from '../../../common/BackgroundImage';

const bg = require('../images/background.png');

const win = Dimensions.get('window');

class ChatListScreen extends Component {

  logout() {
    LoginManager.logOut();
    AccessToken.getCurrentAccessToken().then((data) => {
      if (!data) {
        this.props.setLoginStatus(false);
      }
    });
  }

  render() {
    return (
      <BackgroundImage Image={bg} >
        <View style={{ flex: 1 }}>
          <Image
            source={require('../../../../Assets/Icons/Chats/shadow.png')}
            style={{ height: 12, width: win.width }}
          />
          <ScrollView style={{ marginLeft: 25, marginTop: 8 }}>

            <View style={{ flexDirection: 'row', flex: 1 }}>

              <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                <View
                  style={{
                    borderTopLeftRadius: ((win.width / 1.6) + 60) / 2,
                    borderBottomRightRadius: ((win.width / 1.6) + 60) / 2,
                    borderBottomLeftRadius: ((win.width / 1.6) + 60) / 2,
                    borderColor: 'rgba(0, 0, 0, .35)',
                    borderWidth: win.height/100,
                    marginLeft: win.height/150
                  }}
                >
                  <DropActivity customStyle={styles.dropstyle} mode='uri' imageLink={'https://s-media-cache-ak0.pinimg.com/736x/0e/93/57/0e935712ec115350662ad4c7442cd2fb--fencing-sport-fencer.jpg'}/>
                </View>
              </View>

              <View style={{flex:3, justifyContent: 'center', }}>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ChatScreen'); }}>
                  <View style={styles.chatStyle}>
                    <View style={{flexDirection:'row',flex:1}}>
                      <View style={{ position: 'absolute', top: 0 }}>
                        <Text style={{fontWeight:'500', color: '#fff', fontWeight: 'bold'}}>Ellen Osiier</Text>
                      </View>
                      <View style={{position:'absolute',right:0}}>
                        <Text style={{color: '#fff', fontSize: 13}}> 12:18  </Text>
                      </View>
                    </View>

                    <View style={{flexDirection:'row',flex:1}}>
                      <View style={{width:170}}>
                        <Text style={{color: '#fff'}} numberOfLines={2}>{'Heloo Lorem Ipsum.Heloo Lorem Ipsum.Heloo Lorem Ipsum.Heloo Lorem Ipsum.'}  </Text>
                      </View>

                      <View style={styles.badgeView}>
                        <Text style={{ color: '#ef0043' }}>2</Text>
                      </View>
                    </View>
                  </View>
                  </TouchableOpacity>

              </View>

            </View>
          </ScrollView>
        </View>
      </BackgroundImage>



    );
  }
}

const styles={
  dropstyle: {
      width: win.width/5,
      height: win.width/5,
      borderBottomLeftRadius: win.width/10,
      borderBottomRightRadius: win.width/10,
      borderTopRightRadius: 0,
      borderTopLeftRadius:win.width/10,


  },
  badgeView: {
    position:'absolute',
    right:0,
    flex:1,
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    right: win.width/26,
  },
  chatStyle: {
    height: win.width/3.5,
    flex:1,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: '#A6A6A6',
    padding: 10,
    borderWidth: 1
  }
}

export default connect(null, actions)(ChatListScreen);
