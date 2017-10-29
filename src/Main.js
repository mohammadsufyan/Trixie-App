import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AccessToken } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchData } from './actions/index';
import TabMain from './components/screens/TabScreen/TabMain';
import BackgroundImage from './components/common/BackgroundImage';
import IntroCarousel from './components/screens/IntroductionSlider/IntroCarousel';
import InterestsPage from './components/screens/NewUserLandingPage/InterestsPage';
import { SERVER_IP_PORT } from './Assets/Strings';
import Spinner from './components/common/Spinner.js';
import ChatService from './components/ChatService/ChatService';


const splashScreenBg = require('./Assets/Splash/SplashScreen.png');
const bg = require('./Assets/background.png');
// const loading = require('./Assets/loading.gif');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   containerView: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });


export class Main extends Component {

  constructor() {
    super();
    // default state initialisation
    this.state = {
      loggedIn: null,
      newUser: false,
      user: {
        gender: 'default',
      },
    };

    // binding the scope of the following functions
    this.setState = this.setState.bind(this);
    this.checkNewUserFunction = this.checkNewUserFunction.bind(this);
  }

  componentWillMount() {
    // componentWillMount will be called when this component is called.
    // at the very beginning

    // This function gets the access token for the current facebook session logged in.
    // this access token is uniquely used to identify the user in the current session.
    // all the details regarding the current session can be retrieved from facebook using
    // this access token only.
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data) {
        this.props.setLoginStatus('loading');
        const { accessToken } = data;
        this.initUser(accessToken);
      } else {
        this.props.setLoginStatus(false);
      }
    });

  }

  // The below function is used to initialise the user and the details of the user
  // when she logs in the app.
  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=name,work,verified,picture.width(4000).height(4000),gender,birthday,about,email&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      const user = {
        fbID: json.id,
        name: json.name,
        gender: json.gender,
        birthday: json.birthday,
        aboutMe: json.about,
        verified: json.verified,
        profilePicture: json.picture.data.url,
        bio: json.about,
        // currentWork: {
        //   position: json.work[0].position.name,
        //   employer: json.work[0].employer.name
        // },
      };
      console.log("++++++++++++++++++++++0");
      console.log("++++++++++++++++++++++1", user);
      // this function is called to save the states in redux so that is available
      // all over the app in the redux state
      this.props.initialiseUser(user);
      this.checkNewUserFunction();
      // saveID(json.id);
      // AsyncStorage.setItem('FB_ID', json.id); // Json ID
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  
  // async saveID(id) {
  //   try {
  //     await AsyncStorage.setItem('FB_ID', json.id); // Json ID
  //   } catch (error) {
  //     // Error saving data
  //   }
  // }

  logout() {
    LoginManager.logOut();
    AccessToken.getCurrentAccessToken().then((data) => {
      if (!data) {
        this.props.setLoginStatus(false);
      }
    });
  }

  checkNewUserFunction() {
    console.log("++++++++++++++++++++++14 start");
     let address = SERVER_IP_PORT.concat(`/api/trixie/users/${this.props.userDetails.fbID}`);
    // let address = SERVER_IP_PORT.concat(`/api/trixie/users/fb_103`);
    // address = address.concat(this.props.userDetails.fbID);
    axios.get(address)
    .then(response => {
      console.log("++++++++++++++++++++++14 response", response);
      if (response.data.length === 0) {
        this.props.checkNewUser(true);
        this.props.setLoginStatus(true);
        this.setState({ newUser: true});
      } else {
        this.props.checkNewUser(false);
        this.props.setLoginStatus(true);
        this.chatLogin();
        this.setState({ newUser: false});
      }
    })
    .catch((error) => {
      console.log("++++++++++++++++++++++14 error", error);
       console.log(error); });
  }

  render() {
    console.log("++++++++++++++++++++++4", this.props.loginStatus);
    switch (this.props.loginStatus) {
      case true:
      console.log("++++++++++++++++++++++4", this.props.userDetails.gender); 
      console.log("++++++++++++++++++++++4", this.props.newUser); 
        switch (this.props.userDetails.gender) {
          case 'female':
          return (
            <TabMain />
          );
            // if (this.state.newUser === false) {
            //   return (
            //     <TabMain />
            //   );
            // } else if (this.state.newUser === true) {
            //   return (
            //     <InterestsPage />
            //   );
            // }
            break;
          case 'male':
            return (
                <View>
                  <Text>Not a Girl</Text>
                  <TouchableOpacity onPress={() => { this.logout(); }}>
                    <Text>Logout</Text>
                  </TouchableOpacity>
                </View>
            );
          default:
            return (
              <BackgroundImage Image={bg}>
                <Spinner />
              </BackgroundImage>
            );
        }
        break;
      case false:
        return (
            <IntroCarousel />
        );
      case 'loading':
        return (
          <BackgroundImage Image={splashScreenBg} />
        );
      default:
        return (
          <BackgroundImage Image={splashScreenBg} />
        );
    }
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails,
    loginStatus: state.loginStatus,
    newUser: state.newUser
  };
};

export default connect(mapStateToProps, actions)(Main);

// function mapStateToProps (state) {
//   return {
//     appData: state.appData
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     fetchData: () => dispatch(fetchData())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
