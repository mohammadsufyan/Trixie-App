import React, { Component } from 'react';
import { View, ScrollView, Dimensions,Text,StatusBar } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import IntroSlide from './IntroSlides';
import BackgroundImage from './BackgroundImage';
import axios from 'axios';
import { SERVER_IP_PORT } from '../../../Assets/Strings';
import FacebookLoginButton from './FacebookLoginButton.js'

const { width, height } = Dimensions.get('window');

class IntroCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: { width, height },
      user: null,
    };
    this.setState = this.setState.bind(this);
    this._fbAuth = this._fbAuth.bind(this);
  }
  _fbAuth(initUser, initialiseUser, checkNewUserFunction, checkNewUserAction, setLoginStatus) {
    LoginManager.logInWithReadPermissions([
      'public_profile',
      'user_about_me',
      'email',
      'user_birthday',
      'user_work_history',
      'user_photos'
    ]).then((result) => {
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        // console.log('Login was succesful', result.grantedPermissions.toString());
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data;
          this.props.setLoginStatus(true);
          initUser(accessToken, initialiseUser, checkNewUserFunction, checkNewUserAction, setLoginStatus);
        });
      }
    }, (error) => {
      console.log('An error occured', error);
    });
  }

  initUser(token, initialiseUser, checkNewUserFunction, checkNewUserAction, setLoginStatus) {
    fetch('https://graph.facebook.com/v2.5/me?fields=name,work,verified,picture.width(4000).height(4000),gender,birthday,about,email&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const user = {
        fbID: json.id,
        name: json.name,
        gender: json.gender,
        birthday: json.birthday,
        aboutMe: json.about,
        verified: json.verified,
        profilePicture: json.picture.data.url,
        bio: json.about,
        // currentWork: json.work[0].employer.name,
      };
      initialiseUser(user);
      checkNewUserFunction(user.fbID, checkNewUserAction, setLoginStatus);
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  checkNewUserFunction(fbID, checkNewUserAction, setLoginStatus) {
    let address = SERVER_IP_PORT.concat(`/api/trixie/users/${fbID}`);
    // address = address.concat(fbID);
    axios.get(address)
    .then(response => {
      console.log(response);
      if (response.data.length === 0) {
        checkNewUserAction(true);
        setLoginStatus(true);
      } else {
        checkNewUserAction(false);
        setLoginStatus(true);
      }
    })
    .catch((error) => { console.log(error); });
  }

  render() {
    const image = require('./images/background.png')

    return (

      <BackgroundImage Image={image}>

      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>

      <StatusBar
         backgroundColor="#9A1137"
         barStyle="light-content"
       />
        <Carousel
          delay={500}
          style={{height:(this.state.size.height*75)/100,width:this.state.size.width}}
          autoplay={false}
          bullets
          chosenBulletStyle={{ backgroundColor: 'white' }}
          bulletStyle={{ backgroundColor: 'rgba(0, 0, 0, .35)', borderWidth: 0 }}
        >
          <ScrollView style={{height:(this.state.size.height*75)/100,width:this.state.size.width}}>
            <IntroSlide
              slideNumber='1'
              loginMethod={() => {
                this._fbAuth(this.initUser, this.props.initialiseUser, this.checkNewUserFunction, this.props.checkNewUser, this.props.setLoginStatus);
              }}
            />
          </ScrollView>

          <ScrollView style={{height:(this.state.size.height*75)/100,width:this.state.size.width}}>
            <IntroSlide
              slideNumber='2'
              loginMethod={() => {
                this._fbAuth(this.initUser, this.props.initialiseUser, this.checkNewUserFunction, this.props.checkNewUser, this.props.setLoginStatus);
              }}
            />
          </ScrollView>
          <ScrollView style={{height:(this.state.size.height*75)/100,width:this.state.size.width}}>
          <IntroSlide
            slideNumber='3'
            loginMethod={() => {
              this._fbAuth(this.initUser, this.props.initialiseUser, this.checkNewUserFunction, this.props.checkNewUser, this.props.setLoginStatus);
            }}
          />

          </ScrollView>
        </Carousel>
        <FacebookLoginButton
        loginMethod={() => {
          this._fbAuth(this.initUser, this.props.initialiseUser, this.checkNewUserFunction, this.props.checkNewUser, this.props.setLoginStatus);
        }}/>
      </View>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails,
    // loginStatus: state.loginStatus,
    // newUserStatus: state.newUserStatus
  };
};

export default connect(mapStateToProps, actions)(IntroCarousel);
