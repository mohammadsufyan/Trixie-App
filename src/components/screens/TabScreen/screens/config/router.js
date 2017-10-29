import { StackNavigator } from "react-navigation";
import MyProfileScreen from '../MyProfileScreen';
import SettingsScreen from '../../../SettingsScreen/SettingsScreen';


export const MyProfileNavigator = StackNavigator(
  {
      MyProfileHome : {
          screen:MyProfileScreen,
          navigationOptions: {
            header:null,
          }
      },
      SettingsScreen : {
        screen: SettingsScreen,
      }
  }


);
