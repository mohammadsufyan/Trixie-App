import React, { Component } from 'react';
import InstagramLogin from 'react-native-instagram-login'
import { View, Text, TouchableOpacity } from 'react-native';
import Cookie from 'react-native-cookie';

export default class InstaLogin extends Component {

  logout() {
   Cookie.clear().then(() => {                     //Logout function not being used right now
     this.setState({ token: null })		   //Token deleted for disabling access to media
   })

 }
  render() {
		return (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

              <TouchableOpacity onPress={()=> this.refs.instagramLogin.show()}>
                <View style={{ backgroundColor: 'steelblue', height: 50, width: 200, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{color: '#000'}}>Login</Text>
                </View>
              </TouchableOpacity>
              <InstagramLogin
                  ref='instagramLogin'
                  clientId='5b31fb0a18364d078fb7edee16e91836'        //Must be the same as your registered application on instagram/developer  
                  scopes={['public_content', 'follower_list']}
                  onLoginSuccess={(token) => this.setState({ token })}
                  redirectUrl={'http://trixietheapp.com/'}           //Must be the same as your registered application on instagram/developer
              />



          <TouchableOpacity onPress={ () => {this.logout()}}>
            <View style={{  backgroundColor: 'steelblue', height: 50, width: 200, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

      );
     };
   }
