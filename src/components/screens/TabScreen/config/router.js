import React from 'react';
import { TabNavigator, NavigateActions, StackNavigator, TabBarBottom } from 'react-navigation';
import { Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import CardScreen from '../screens/CardScreen';
import ChatListScreen from '../screens/ChatListScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SettingsScreen from '../../SettingsScreen/SettingsScreen';
import ProfileEdit from '../../ProfileScreen/ProfileEdit';
import FreeToMeet from '../../ProfileScreen/FreeToMeet';
import ChatScreen from '../../ChatScreen/ChatScreen';


const win = Dimensions.get('window');

export const MainScreenTabs = TabNavigator({

  TabHomeScreen: {
      screen: CardScreen,
      navigationOptions: {
        tabBarLabel: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../../Assets/Icons/NavigatorIcons/EclipseBody.png')}
            style={[styles.icon, { tintColor }]}
          />
        ),
      },

  },

  ChatScreen: {
      screen: ChatListScreen,
      navigationOptions: {
        tabBarLabel: null,
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../../Assets/Icons/NavigatorIcons/Chat.png')}
            style={[styles.icon, { tintColor }]}
          />
        ),
      },
    },

  MyProfileScreen: {
    screen: MyProfileScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../../../Assets/Icons/NavigatorIcons/profile.png')}
          style={[{ height: 28.5714285714, width: 19.64 }, { tintColor }]}
        />
      ),
    },
  }
},
{
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'top',
  initialRouteName: 'TabHomeScreen',
  backBehavior: 'initialRoute',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },

    tabStyle: {
      width: win.width / 3,
      

    },

    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: 'white',
      borderWidth: 0,
      borderTopColor: 'transparent',
      height: win.height / 8,
      elevation: 7,
      marginTop: (Platform.OS === 'ios') ? 20 : 0
    },

    activeTintColor: 'white',
    activeBackgroundColor: '#DD003D',
    inactiveTintColor: '#EF0043'
  },
});

export const ProfileScreenStack = StackNavigator({
  MyProfileHome: {
    screen: MainScreenTabs,
    navigationOptions: {
      header: null,
    }
  },

  ProfileEdit: {
    screen: ProfileEdit,
    navigationOptions: {
      title: 'Edit Profile',
      tabBarVisible: false,
      headerStyle: { backgroundColor: '#fff', elevation: null },
      headerTitleStyle: { color: '#ef0043' },
      headerBackTitleStyle: { color: '#ef0043' },
    },
  },

  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      tabBarVisible: false,
      headerStyle: { backgroundColor: '#fff', elevation: null },
      headerTitleStyle: { color: '#ef0043' },
      headerBackTitleStyle: { color: '#ef0043' },
    },
  },

  FreeToMeet: {
    screen: FreeToMeet,
    navigationOptions: {
      title: '',
      tabBarVisible: false,
      headerStyle: { backgroundColor: '#fff', elevation: null },
      headerTitleStyle: { color: '#ef0043' },
      headerBackTitleStyle: { color: '#ef0043' },
    },
  },


},
{
  headerMode: 'screen',
});

export const ChatScreenStack = StackNavigator({
  MyChatsHome: {
    screen: MainScreenTabs,
    navigationOptions: {
      header: null,
    }
  },

  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      title: 'Lyna Doe',
      tabBarVisible: false,
      headerStyle: { backgroundColor: '#fff', elevation: null },
      headerTitleStyle: { color: '#ef0043' },
      headerBackTitleStyle: { color: '#ef0043' },
    },
  },
},
{
  headerMode: 'screen',
});

const styles = {
  icon: {
    height: 30,
    width: 30
  }
};
