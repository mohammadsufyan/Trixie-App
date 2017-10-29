import React, { Component } from 'react';
import { View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Input, Item, } from 'native-base';
import XMPP from 'react-native-xmpp';
import BackgroundImage from '../../common/BackgroundImage.js';
import DropActivity from '../../common/DropActivity.js';

const image = require('../../../Assets/background.png');


class ChatScreen extends Component {
  
  render() {
    return (
      <BackgroundImage Image={image}>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 30 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <DropActivity
                customStyle={styles.dropstyle}
                mode='uri'
                imageLink={'https://img.cinemablend.com/cb/7/0/5/3/e/a/7053eac712643384a484598555c3e765c4fd9660676fac31e9ca691a2b3da9e3.jpg'}
              />
            </View>
            <View style={{ flex: 4 }}>
              <DropActivity customStyle={styles.chatstyle} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
             <View style={{ flex: 4 }}>
              <DropActivity customStyle={styles.chatstyle_user} />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <DropActivity
                customStyle={styles.dropstyle_user}
                mode='uri'
                imageLink={'https://s-media-cache-ak0.pinimg.com/736x/0e/93/57/0e935712ec115350662ad4c7442cd2fb--fencing-sport-fencer.jpg'}
              />
            </View>
          </View>
        </ScrollView>
          <View
            style={{
              height: 60,
              width: win.width,
              backgroundColor: '#fff',
              position: 'relative',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                flex: 4,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Item>
                <Input
                  placeholder='Type your message here...'
                  style={{
                    borderBottomWidth: 0,
                    borderRightWidth: 0
                  }}
                />
              </Item>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity>
              <Image
                source={require('../../../Assets/Icons/Chats/Send_button_pink.png')}
                style={{ height: 50, width: 50 }}
              />
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </BackgroundImage>

    );
  }
}

const win = Dimensions.get('window');

const styles = {
  dropstyle: {
      width: win.width / 6,
      height: win.width / 6,
      borderBottomLeftRadius: win.width / 12,
      borderBottomRightRadius: win.width / 12,
      borderTopRightRadius: 0,
      borderTopLeftRadius: win.width / 12,
    },
    chatstyle: {
      width: win.width / 1.4,
      height: win.width / 6,
      borderBottomLeftRadius: win.width / 20,
      borderBottomRightRadius: win.width / 20,
      borderTopRightRadius: win.width / 20,
      borderTopLeftRadius: 0,
      backgroundColor: 'rgba(0, 0, 0, .35)'

    },
    dropstyle_user: {
      width: win.width / 6,
      height: win.width / 6,
      borderBottomLeftRadius: win.width / 12,
      borderBottomRightRadius: win.width / 12,
      borderTopRightRadius: win.width / 12,
      borderTopLeftRadius: 0,
    },
    chatstyle_user: {
      width: win.width / 1.4,
      height: win.width / 6,
      borderBottomLeftRadius: win.width / 20,
      borderBottomRightRadius: win.width / 20,
      borderTopRightRadius: 0,
      borderTopLeftRadius: win.width / 20,
      backgroundColor: 'rgba(0, 0, 0, .35)'
    },
  };

export default ChatScreen;
