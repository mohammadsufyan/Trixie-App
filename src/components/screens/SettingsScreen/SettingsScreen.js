import React, { Component } from 'react';
import {
  Animated,
  BackHandler,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import Switch from 'react-native-customisable-switch';  //Switch component installed from a npm package, for go invisible feature
import { ActionSheet, Button, Root } from 'native-base';
import { connect } from 'react-redux'; //For connecting actions with reducers
import Slider from 'react-native-slider'; //Slider component installed from a npm package to select distance
import RNGooglePlaces from 'react-native-google-places';  //To get the current location of the user
import Permissions from 'react-native-permissions'; //To explicitly ask users for necessarry permissions
import { LoginManager, AccessToken } from 'react-native-fbsdk'; //For the logout functionality
import MultiSlider from '@ptomasroos/react-native-multi-slider'; //Range Slider for age
import BackgroundImage from '../TabScreen/BackgroundImage';
import { CustomMarker } from './CustomMarker'; //To be passed into MultiSlider component, to change the type of slider button
import RenderChildDetails from './RenderChildDetails'; //Component created to show child info, if user has kids
import RelationshipToggle from './RelationshipToggle'; //Component to render the relationship preferences selected by the user
import * as actions from '../../../actions'; //Import the actions from src/actions, to manipulate states in the app

const BUTTONS = ['0', '1', '2', '3', '4', '5']; //Value for no. of kids on clicking 'yes' for Do you have kids
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

let navigation = null;
let onBackPress = null;

class SettingsScreen extends Component {

/*Custom Header for page */
  static navigationOptions = {

    headerLeft:
        <TouchableOpacity
          onPress={() => {
            onBackPress();
            navigation.goBack();
          }}
          title={'Back'}
        >
          <Image
            source={require('../../../Assets/Icons/Settings/back_pink.png')}
            style={{ height: 20, width: 20, marginLeft: 20 }}
          />
        </TouchableOpacity>
  }

  constructor(props) {
    super(props);
    navigation = props.navigation;
    onBackPress = this.handleBackPress;  //Call function when the back button is pressed in the page header.
  }

  state = {
   sliderOneChanging: false,
   sliderOneValue: [5],
   sliderTwoChanging: false, //state of the first slider of range slider for age preferences(moving/not moving)
   sliderThreeChanging: false, //state of the second slider of range slider for age preferences(moving/not moving)
   sliderTwoValue: 18, //intital age value indicated by the first age slider
   sliderThreeValue: 27, //initial age value indicated by the second slider
   toggleyes: true, //state to keep track of do you have kids toggle
   toggleno: false,  //state to keep track of do you have kids toggle
   noOfKids: 0,    //state to keep track of no. of kids selected by the user
   addKidsDetails: false, //if no kids then no need for kids details, so initialized to false
   fadeAnim: new Animated.Value(0),
   kidsAge: 0, //Initial kids age of all kids set to 0
   trueSwitchIsOn: true, //state to keep track of go invisible switch
   falseSwitchIsOn: false, //state to keep track of go invisible switch
   valueSlide: 0, //initial value of select age slider
   location: 'Auto detect Location', //initial value of user location
 }

componentWillMount() {
	/*When the page will load, call function that listens to wether the back button is pressed */
  BackHandler.addEventListener('hardwareBackPress', () => {
    this.handleBackPress();
    return false;
  });
}


componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();

/*Ask for user permissions for location, on page load */
    Permissions.request('location')
     .then(response => {
       //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
       // this.setState({ photoPermission: response })
       console.log('Locaton');
     })
 }

  handleBackPress() {
    console.log('backed');
  }

  logout() {
	  /*Logout functionality on pressing the logout button */
    LoginManager.logOut();
    AccessToken.getCurrentAccessToken().then((data) => {
      if (!data) {
        this.props.setLoginStatus(false);
      }
    });
  }

  getLocation()
  {
	  /*get the current location of the user */
    RNGooglePlaces.getCurrentPlace()
    .then((results) =>
    {
      this.setState({location: results[0].address,
                     latitude: results[0].latitude,
                     longitude: results[0].longitude});
      console.log('res',results);})
    .catch((error) => console.log(error.message));

  }

renderKidsDetails(totalkids) {
	/*If user selects 'yes' for kids, then this function is called 'n' times; n = no. of kids */
  const kids = [];
  if (this.state.addKidsDetails === true) {
    for (let i = 0; i < totalkids; i++) {
      console.log('i', i);
      kids.push(
         <RenderChildDetails key={i} ivalue={i + 1} />
      );
    }
  }
  return (
        <View style={{ marginLeft: 20 }}>
         {kids}
        </View>
  );
}

 renderKids() {
	 /*Will call renderKidsDetail based on the state of the do you have kids 'toggle' */
   console.log('Kids', this.state.toggleyes);
    if (this.state.toggleno === true) {

      return (
        <View>
              <View style={styles.howmanykidscontainer}>
                  <View style={{flex:3}}>
                    <Text style={styles.doyouhavekidstext}>How many?</Text>
                  </View>

                  <View style={{flex:1}}>
                    <Button rounded style={styles.childcountbuttonstyle} onPress={() =>
                                            ActionSheet.show(
                                              {
                                                options: BUTTONS,
                                                cancelButtonIndex: CANCEL_INDEX,
                                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                title: "Select No. of kids"
                                              },
                                              buttonIndex => {
                                                this.setState({ noOfKids: BUTTONS[buttonIndex] });
                                              }
                                            )}>
                      <Text style={styles.yesnotext}>{this.state.noOfKids}</Text>


                      <Image
                        source={require('../../../Assets/Icons/Settings/Black_updown.png')}
                        style={{height:16,width:16,marginLeft:10,marginRight:20}}
                      />


                    </Button>
                  </View>
              </View>

              <View style={styles.kiddetailscontainer}>
                <Text style={styles.addmoredetailstext} onPress={()=>{this.setState({addKidsDetails:true})}}>Add more details</Text>
                {this.renderKidsDetails(this.state.noOfKids)}
              </View>
        </View>
      );
    }
 }

 /*Functions to change values of the range slider*/
 sliderOneValuesChangeStart = () => {
   this.setState({
     sliderOneChanging: true,
   });
 }

 sliderOneValuesChange = (values) => {
   let newValues = [0];
   newValues[0] = values[0];
   this.setState({
     sliderOneValue: newValues,
   });
 }

 sliderOneValuesChangeFinish = () => {
   this.setState({
     sliderOneChanging: false,
   });


 }

 sliderTwoValuesChange = (values) => {
		let newValuesO = values[0];
		let newValuesT = values[1];
		this.setState({
			sliderTwoValue: newValuesO,
			sliderThreeValue: newValuesT,
		});
	}

  _onPress(){

    const newState=!this.state.toggleyes;
    this.setState({toggleyes:newState,toggleno:!newState});
    console.log(this.state.toggleyes);
  }

  onClick() {
    Share.share({
      message: 'Let me recommend you Trixie application \n\n ' +
                'https://play.google.com/store/apps/details?id=com.trixie',
      url: 'https://play.google.com/store/apps/details?id=com.trixie',
      title: 'Wow, did you see Trixie?'
    }, {
      // Android only:
      dialogTitle: 'Share Trixie',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  render()
  {
    const image = require('../TabScreen/images/background.png');
    const{toggleyes,toggleno}=this.state;
    const button1Bg = toggleyes?"#A6A6A6":"#EF0043";
    const button2Bg = toggleno?"#A6A6A6":"#EF0043";

    return(

      <BackgroundImage Image={image}>
      <Root>
      <ScrollView showsVerticalScrollIndicator = {false} style={{ marginLeft: 20, marginRight: 20, paddingTop: 20  }} >

        <View style={{flex:1,width:null,height:null,backgroundColor:'#fff',borderRadius:30}}>

          <View style={styles.kidscontainerstyle}>

              <View style={{flex:4, justifyContent: 'center'}}>
                  <Text style={styles.doyouhavekidstext}>Do you have kids?</Text>
              </View>

              <View style={{flex:3,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                      <View  style={{height:30,
                      width:50,
                      marginLeft:10,
                      justifyContent: 'center',
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'transparent',
                      padding: 5,
                       backgroundColor:button1Bg}} >
                       <TouchableOpacity onPress={()=>{this._onPress()}}>
                          <Text style={styles.yesnotext}>Yes</Text>
                        </TouchableOpacity>
                      </View>
                  </View>

                  <View style={{flex:1}} >
                    <View  style={{height:30,
                        width:50,
                        marginLeft:10,

                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        padding: 5,
                         backgroundColor:button2Bg}}>
                         <TouchableOpacity onPress={()=>{this._onPress()}} >
                          <Text style={styles.yesnotext}>No</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
            </View>
          </View>



        {this.renderKids()}

        </View>

        <View style={{marginTop:20}}>
          <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'quicksand-bold' }}>Discovery Preferences</Text>
        </View>
          <View style={styles.discoverypreferencecontainer}>
              <Text style={styles.relationshipstatusheadtext}>Relationship Status</Text>
              <View style={{ flex: 1 }}>
                  <RelationshipToggle relstatus={'Single'} />
                  <RelationshipToggle relstatus={'In a relationship'} />
                  <RelationshipToggle relstatus={'Engaged'} />
                  <RelationshipToggle relstatus={'Married'} />
                  <RelationshipToggle relstatus={'It\'s complicated'} />
                  <RelationshipToggle relstatus={'Seperated'} />
                  <RelationshipToggle relstatus={'Divorsed'} />
                  <RelationshipToggle relstatus={'Widowed'} />
                  <View style={{height:15, flex:1}} />
              </View>

          </View>

          <View style={{flexDirection:'row',flex:1,marginTop:20}}>
            <View style={{flex:4}}>
                <Text style={{fontSize:18,color:'#fff', fontFamily: 'quicksand-bold'}}>Show ages</Text>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
                <Text style={[styles.subheadingstyle,this.state.sliderTwoChanging&&false]}>{this.state.sliderTwoValue}</Text>
                <Text style={styles.subheadingstyle}>-</Text>
                <Text style={[styles.subheadingstyle,this.state.sliderThreeChanging&&false]}>{this.state.sliderThreeValue}</Text>
            </View>
          </View>



          <View style={{marginLeft:20, marginTop:50}}>
                      <MultiSlider
                  selectedStyle={{
                    backgroundColor: '#000',
                  }}
                  unselectedStyle={{
                    backgroundColor: '#A6A6A6',
                  }}
                  values={[this.state.sliderTwoValue,this.state.sliderThreeValue]}
                  min={18}
                  max={90}
                  containerStyle={{
                    height:40,
                  }}
                  trackStyle={{
                    height:2,
                    marginTop:25,
                    backgroundColor: 'red',
                  }}

                  touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40,
                  }}


                  onValuesChangeStart={this.sliderTwoValuesChangeStart}
                  onValuesChange={this.sliderTwoValuesChange}
		              onValuesChangeFinish={this.sliderTwoValuesChangeFinish}
                  customMarker={CustomMarker}
                  sliderLength={280}
                />
          </View>


          <View style={{marginTop:20}}>
            <Text style={{fontSize:18 ,color:'#fff', fontFamily: 'quicksand-bold' }}>Search Location</Text>
          </View>

          <View style={styles.locationbuttonstyle}>
            <TouchableOpacity style={{flex:3,flexDirection:'row'}} onPress={()=>{this.getLocation()}}>
              <Image
                source={require('../../../Assets/Icons/Settings/crosshair.png')}
                style={{height:20,width:20,marginLeft:10,marginRight:20}}
              />
                <Text style={styles.locationext} numberOfLines={2}>{this.state.location}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end'}}  onPress={()=>{this.props.navigation.navigate('MapScreen',{latitude:this.state.latitude,longitude:this.state.longitude})}}>
                <Image
                  source={require('../../../Assets/Icons/Settings/Down_arrow_pink.png')}
                  style={{height:16,width:16,marginLeft:10,marginRight:20}}
                />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',flex:1,marginTop:20}}>
            <View style={{flex:4}}>
                <Text style={{fontSize:18,color:'#fff', fontFamily: 'quicksand-bold'}}>Search Distance</Text>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
                <Text style={{ fontSize: 18, fontFamily: 'quicksand-bold' }}>{this.state.valueSlide} kms</Text>
            </View>
          </View>
          <View style={{marginTop:5, alignItems: 'center'}}>
          <Slider
            value={this.state.valueSlide}
            onValueChange={(valueSlide) => this.setState({valueSlide})}
            minimumValue={0}
            maximumValue={50}
            style={{ width: win.width/1.2 }}
            trackStyle={{ backgroundColor: '#A6A6A6', height: 3 }}
            thumbStyle={{ backgroundColor: '#fff', height: 25, width: 25, borderRadius: 25 }}
            step={1}
            minimumTrackTintColor={'#A6A6A6'}
            thumbTouchSize={ {height: 30, width: 30} }
          />
          </View>

          <View style={styles.goinvisibleview}>
            <View>
              <Text style={{color: '#EF0043',fontSize:18, fontFamily: 'quicksand-bold', marginLeft: win.width/30,marginTop: win.width/25 }}>Go Invisible</Text>
            </View>

            <View style={{  justifyContent: 'center', position: 'absolute', right: win.width/15, top: win.width/15  }}>
              <Switch
                switchWidth={50}
                switchHeight={10}
                inactiveBackgroundColor={'#A6A6A6'}
                activeBackgroundColor={'#A6A6A6'}
                inactiveButtonBackgroundColor={'#000'}
                activeButtonBackgroundColor={'#ef0043'}
                padding={false}
              />

              </View>
            <View>
              <Text style={{ color: '#EF0043',fontSize:15,margin: 10, fontFamily: 'quicksand-light' }}>
              {'Turning this on will prevent your profile from being shown to others. Your existing contacts can still message you.'}
              </Text>
            </View>
          </View>

          <View style={styles.contactus}>
              <Text style={{color:'#fff', fontSize: 18, fontFamily: 'quicksand-bold'}}>Contact Us</Text>

                <Button rounded style={styles.contactusbuttonstyle}>
                  <Text style={styles.contactustexttext}>Help & Support</Text>
                </Button>
                <Button
                  onPress={() => { this.onClick(); }}
                  rounded style={styles.contactusbuttonstyle}
                >
                  <Text style={styles.contactustexttext}>Share Trixie</Text>
                </Button>

          </View>
          <Text style={{color:'#fff', fontSize: 18, fontFamily: 'quicksand-bold', marginTop: 20}}>Legal</Text>
          <View style={styles.legalview}>
            <View style={{marginTop:15, marginLeft: 15, marginRight: 15, marginBottom: 10}}>
            <TouchableOpacity style={{ marginBottom: 5 }}><Text style={styles.legalviewtext}>Licenses</Text></TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 5 }}><Text style={styles.legalviewtext}>Privacy Policy</Text></TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 5 }}><Text style={styles.legalviewtext}>Terms & Conditions</Text></TouchableOpacity>
            </View>
          </View>

                <Button onPress={()=>{this.logout();}} rounded style={styles.logoutbuttonstyle}>
                  <Text style={styles.logoutbuttontext}>Logout</Text>
                </Button>

          <Image
            source={require('../../../Assets/Icons/NavigatorIcons/EclipseBody.png')}
            style={{width:50,height:50,alignSelf:'center',margin:20}} />

          <Text style={{ alignSelf:'center', marginBottom:20, color:'#fff', fontFamily: 'quicksand-light' }}>Version 1.0 [android] Build 0002</Text>

          <Button rounded style={styles.logoutbuttonstyle}>
            <Text style={styles.logoutbuttontext}>Delete Account</Text>
          </Button>

          <View style={{ paddingBottom: 60 }} />

        </ScrollView>
        </Root>
        </BackgroundImage>
    );
  }
}
const win =Dimensions.get('window');
const styles={
  kidscontainerstyle: {
    flex:1,
    flexDirection:'row',
    margin:15,

    justifyContent: 'center'
  },
  doyouhavekidstext : {
    fontSize:15,
    letterSpacing: win.width/350,
    color:'#EF0043',
    fontFamily: 'quicksand-bold'


  },
  yesnobuttonstyle : {
    height:30,
    width:60,
    marginLeft:10,
  },
  yesnotext: {
    fontSize:15,
    color:'#fff',
    textAlign:'center',
    fontFamily: 'quicksand-bold',
    letterSpacing: win.width/350,

  },


  howmanykidscontainer: {
    flex:1,
    flexDirection:'row',
    margin:10
  },
  childcountbuttonstyle : {

    height:30,
    width:70,
    marginLeft:0,
    backgroundColor:'#EF0043',


  },


  addmoredetailscontainer: {
    flex: 1,
    margin:20,
  },
  addmoredetailsbutton : {
    height:30,
    width: 160,
    marginLeft:0,
    backgroundColor:'#A6A6A6',

  },
  addmoredetailstext: {
    fontSize:15,
    color:'white',
    margin:7,
    fontFamily: 'quicksand-light',
    letterSpacing: win.width/350,
  },


  kiddetailscontainer: {
    height:null,
    width:null,
    flex:1,
    backgroundColor:'#A6A6A6',
    margin:15,
    borderRadius:20
  },

  discoverypreferencecontainer: {
    height: null ,
    flex:1,
    backgroundColor:'white',
    marginTop:20,
    borderRadius:20,
    padding: 5,
  },
  relationshipstatusheadtext: {
    color: '#EF0043',
    marginTop:10,
    marginLeft:10,
    fontFamily: 'quicksand-bold',
    fontSize: 18,
    letterSpacing: win.width/350,

  },
  relationshipstatusbutton: {
    height:30,
    borderRadius:30,
    borderWidth: 0.2,
    marginLeft:30,
    marginRight:30,
    marginTop:15,
    backgroundColor:'white',
    justifyContent: 'center',
    padding: 5


  },
  relationshipstatuslastbutton :
  {
    height:30,
    borderRadius:30,
    borderWidth: 0.2,
    marginLeft:30,
    marginRight:30,
    marginTop:15,
    marginBottom:15,
    backgroundColor:'white',
    justifyContent: 'center',
    padding: 5



  },
  relationshipstatustext: {
    color: '#EF0043',
    fontSize: 15,
    marginLeft: 15,
    fontFamily: 'quicksand-medium',
    letterSpacing: win.width/350,

  },
  emptyViewStyle : {
    marginTop:15,
    height:30
  },

  subheadingstyle: {
    fontSize:18,
    color:'#000',
    fontFamily: 'quicksand-bold',
  },

  goinvisibleview : {
    flex:1,
    marginTop: 40,
    height: null,
    width: null,
    backgroundColor: '#fff',
    borderRadius:20,
    padding: 15,
    paddingTop: 10
  },
  legalview : {
    flex:1,
    marginTop:20,
    height: null,
    width: null,
    backgroundColor: '#fff',
    borderRadius:20,


  },

  locationext: {
    fontSize:15,
    fontFamily: 'quicksand-medium',
    color:'#EF0043',
    letterSpacing: win.width/350,
    flex:1
  },

  contactus: {
    marginTop:20
  },
  contactusbuttonstyle: {
    flex:1,
    flexDirection:'row',
    height: win.width/8,
    marginTop:20,
    backgroundColor:'#fff',

  },
  contactustexttext: {
    fontSize:16,
    fontFamily: 'quicksand-bold',
    color:'#EF0043',
    textAlign:'center',
    flex:1,
    letterSpacing: win.width/350,
  },
  logoutbuttonstyle : {
    height:50,
    marginTop: 20,
    backgroundColor:'#000',
    marginBottom: 20,

  },
  logoutbuttontext : {
    fontSize:16,
    fontFamily: 'quicksand-bold',
    color:'#fff',
    textAlign:'center',
    flex:1,
    letterSpacing: win.width/350,
  },
  legalviewtext: {
    color:'#EF0043',
    fontSize: 16,
    fontFamily: 'quicksand-bold',
    letterSpacing: win.width/350,

  },
  locationbuttonstyle:{
    flex:1,
    height:win.height/15,
    flexDirection:'row',
    margin:10,
    borderRadius:win.height/7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
};


export default connect(null, actions)(SettingsScreen);
// export default SettingsScreen;
