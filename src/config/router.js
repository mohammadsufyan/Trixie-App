import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Dimensions, Image, Platform } from 'react-native';
import CardScreen from '../components/screens/TabScreen/screens/CardScreen';
import ChatListScreen from '../components/screens/TabScreen/screens/ChatListScreen';
import MyProfileScreen from '../components/screens/TabScreen/screens/MyProfileScreen';
import SettingsScreen from '../components/screens/SettingsScreen/SettingsScreen';
import ProfileEdit from '../components/screens/ProfileScreen/ProfileEdit';
import FreeToMeet from '../components/screens/ProfileScreen/FreeToMeet';
import ChatScreen from '../components/screens/ChatScreen/ChatScreen';
import MainApp from '../components/screens/LocationService/MainApp';

const win = Dimensions.get('window');

export const ChatScreenStack = StackNavigator({
  ChatListScreen: {
    screen: ChatListScreen,
    navigationOptions: {
      tabBarVisible: true,
      header: null
    },
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

export const SettingsScreenStack = StackNavigator({
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
  MapScreen: {
    screen: MainApp,
    navigationOptions: {
      header: null,
      tabBarVisible: false,

    },
  },
},
{
  headerMode: 'screen',
});

export const ProfileScreenStack = StackNavigator({
  MyProfileHome: {
    screen: MyProfileScreen,
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
    screen: SettingsScreenStack,
    navigationOptions: {
    header: null,
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


export const MainScreenTabs = TabNavigator({

  TabHomeScreen: {
      screen: CardScreen,
      navigationOptions: {
        tabBarLabel: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../Assets/Icons/NavigatorIcons/EclipseBody.png')}
            style={[styles.icon, { tintColor }]}
          />
        ),
      },
  },

  ChatScreen: {
      screen: ChatScreenStack,
      navigationOptions: {
        tabBarLabel: null,
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../Assets/Icons/NavigatorIcons/Chat.png')}
            style={[styles.icon, { tintColor }]}
          />
        ),
      },
    },

  MyProfileScreen: {
    screen: ProfileScreenStack,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../Assets/Icons/NavigatorIcons/profile.png')}
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


const styles = {
  icon: {
    height: 30,
    width: 30
  }
};
