import { StackNavigator } from "react-navigation";
import SettingsScreen from '../SettingsScreen';

export const SettingsNavigator = StackNavigator(
  {
    SettingsScreenHome: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null,
      },
      cardStyle: {
        backgroundColor: 'red',
      },
    },
  },

);
