import React ,{ Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, navigator } from 'react-native';
import DropActivity from '../../common/DropActivity.js';    //Reusable drop component
import { Button, Item, Input } from 'native-base';
import BackgroundImage from './BackgroundImage';
import Slider from 'react-native-slider';                   //Customizable slider for setting the radius
import Switch from 'react-native-customisable-switch';      //Customizable switch for toggling Current Location
import { baseURL, fbId } from '../../../utils/constants';

const pinkCross = require('../../../Assets/Icons/FreetoMeet/pink_cross.png');
const walk = require('../../../Assets/Icons/FreetoMeet/kids.png');
const drinks = require('../../../Assets/Icons/FreetoMeet/drinks.png');
const movie = require('../../../Assets/Icons/FreetoMeet/movie.png');
const coffee = require('../../../Assets/Icons/FreetoMeet/coffee.png');
const fpoon = require('../../../Assets/Icons/FreetoMeet/fpoon.png');
const kids = require('../../../Assets/Icons/FreetoMeet/kids.png');
let region = {};

class FreeToMeet extends Component{
  constructor(props) {
    super(props);
    this.state = {
      trueSwitchIsOn: true,               //States for handling the Switch used
      falseSwitchIsOn: false,
      valueSlide: 0,
      matches: [],
      fbToken: '',
      isWalk: false,
      isDrink: false,
      isMovie: false,
      isCoffee: false,
      isMeal: false,
      isKidsPlay: false,
    };
  }

  componentDidMount() {
    this.fetchFBToken();
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   // Create the object to update this.state.mapRegion through the onRegionChange function
    //   region = {
    //     latitude:       position.coords.latitude,
    //     longitude:      position.coords.longitude,
    //   }
    // });
  }

  async fetchFBToken() {
    await AsyncStorage.getItem('FB_ID', (err, fbID) => {
      if(fbID && fbID.length() > 0) {
        this.setState({
          fbToken: fbID,
        }, console.log("+++++++++++++++++", fbToken));
      }
    });
  }

  ftmApiCall(token, body) {
    fetch(`${baseURL}/users/${token}/matches`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("+++++++++++++++++++++++++fb",json);
      this.setState({
        matches: json,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
  }

  // JSON.stringify({
  //   firstParam: 'yourValue',
  //   secondParam: 'yourOtherValue',
  // })

  render()
  {

     const background = require('../../../Assets/background.png');

    return(
      <BackgroundImage Image={background}>

      <ScrollView>
        <View style={{ alignItems: 'center' }}>

        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>{'FREE TO MEET FOR?'}</Text>
        </View>

        <View style={{ width: win.width/1.15, marginTop: win.height/25 }}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress= {() => this.setState({ isWalk: !this.state.isWalk })}
            >
            <View style={{ justifyContent: 'center' }}>

              <DropActivity customStyle={styles.dropstyle} />

              <Image
                source= {require('../../../Assets/Icons/FreetoMeet/black_drop.png')}
                style={{ height: win.width/8, width: win.width/8, position: 'absolute' }}
              />

              <Image
                source= {this.state.isWalk ? pinkCross : walk}
                style={{ height: win.width/20, width: win.width/20, position: 'absolute', left: 13 }}
              />

              <Text style={{ position: 'absolute', color: '#fff', alignSelf: 'center',fontSize: 13  }}>Walk</Text>

            </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress= {() => this.setState({ isDrink: !this.state.isDrink })}
            >
            <View style={{ justifyContent: 'center' }}>
                <DropActivity customStyle={styles.dropstyle} />
                <Image
                  source= {require('../../../Assets/Icons/FreetoMeet/black_drop.png')}
                  style={{ height: win.width/8, width: win.width/8, position: 'absolute' }}
                />
                <Image
                  source= {this.state.isDrink ? pinkCross : drinks}
                  style={{ height: win.width/15, width: win.width/15, position: 'absolute', left: win.width/35 }}
                />
                  <Text style={{ position: 'absolute', color: '#fff', alignSelf: 'center',fontSize: 13  }}>Drink</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: win.height/25 }}>
            <TouchableOpacity
              onPress= {() => this.setState({ isMovie: !this.state.isMovie })}
            >
              <View style={{ justifyContent: 'center' }}>
                <DropActivity customStyle={styles.dropstyle} />
                <Image
                  source= {require('../../../Assets/Icons/FreetoMeet/black_drop.png')}
                  style={{ height: win.width/8, width: win.width/8, position: 'absolute' }}
                />
                <Image
                  source= {this.state.isMovie ? pinkCross : movie}
                  style={{ height: win.width/15, width: win.width/15, position: 'absolute', left: win.width/35 }}
                />
                  <Text style={{ position: 'absolute', color: '#fff', alignSelf: 'center',fontSize: 13  }}>Movie</Text>
              </View>
            </TouchableOpacity>

              <TouchableOpacity
                onPress= {() => this.setState({ isCoffee: !this.state.isCoffee })}
              >
              <View style={{ justifyContent: 'center' }}>
                  <DropActivity customStyle={styles.dropstyle} />
                  <Image
                    source= {require('../../../Assets/Icons/FreetoMeet/black_drop.png')}
                    style={{ height: win.width/8, width: win.width/8, position: 'absolute' }}
                  />
                  <Image
                    source= {this.state.isCoffee ? pinkCross : coffee}
                    style={{ height: win.width/15, width: win.width/15, position: 'absolute', left: win.width/35 }}
                  />

                    <Text style={{ position: 'absolute', color: '#fff', alignSelf: 'center', fontSize: 13  }}>Coffee</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: win.height/25  }}>
            
          <TouchableOpacity
            onPress= {() => this.setState({ isMeal: !this.state.isMeal })}
          >
              <View style={{ justifyContent: 'center' }}>
                <DropActivity customStyle={styles.dropstyle} />
                <Image
                  source= {require('../../../Assets/Icons/FreetoMeet/black_drop.png')}
                  style={{ height: win.width/8, width: win.width/8, position: 'absolute' }}
                />
                <Image
                    source= {this.state.isMeal ? pinkCross : fpoon}
                  style={{ height: win.width/15, width: win.width/15, position: 'absolute', left: win.width/35 }}
                />
                  <Text style={{ position: 'absolute', color: '#fff', alignSelf: 'center', fontSize: 13  }}>Meal</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress= {() => this.setState({ isKidsPlay: !this.state.isKidsPlay })}
            >
              <View style={{ justifyContent: 'center' }}>
                  <DropActivity customStyle={styles.dropstyle} />
                  <Image
                    source= {require('../../../Assets/Icons/FreetoMeet/black_drop.png')}
                    style={{ height: win.width/8, width: win.width/8, position: 'absolute' }}
                  />
                  <Image
                    source= {this.state.isKidsPlay ? pinkCross : kids}
                    style={{ height: win.width/15, width: win.width/15, position: 'absolute', left: win.width/35 }}
                  />
                    <Text style={{ position: 'absolute', color: '#fff', alignSelf: 'center', fontSize: 13,  }}>Kids Play</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: win.width/1.15, marginTop: win.height/25}}>
        <Item
          rounded
          style={{
            backgroundColor: 'rgba(40, 40, 40, .40)',
            borderWidth: 0,
            borderColor: 'transparent',
            height: win.width/8,
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <Input
            placeholder={'I\'m free for...'}
            placeholderTextColor='#A6A6A6'
            style={{ fontSize: 15, alignSelf: 'center' }}

          />
        </Item>
        </View>
          <View style={{ marginTop: 20, width: win.width/1.2, left: 0 }}>
            <Text style={{ color: '#fff' }}>Location</Text>
          </View>

        <Button rounded style={{ backgroundColor: '#fff', height: win.width/10, width: win.width/1.15, alignSelf: 'center', marginTop: 5  }}>
          <View style={{ flexDirection: 'row',  alignSelf: 'center', flex: 1  }}>
            <View style={{ flex: 0.8, justifyContent: 'center' }}>
              <Image
                source={require('../../../Assets/Icons/Settings/crosshair.png')}
                style={{ height: win.width/20, width: win.width/20, left: 0, marginRight: 10  }}
              />
            </View >
            <View style={{ flex: 2, justifyContent: 'center', right: 40 }}>
            <Text style={{ color: '#ef0043', }}>Current Location</Text>
            </View>
            <View style={{  flex:0.5, justifyContent: 'center'  }}>
            <Switch
              switchWidth={50}
              switchHeight={10}
              inactiveBackgroundColor={'#A6A6A6'}
              activeBackgroundColor={'#A6A6A6'}
              inactiveButtonBackgroundColor={'#fff'}
              activeButtonBackgroundColor={'#ef0043'}
              padding={false}
              buttonBorderColor={'#A6A6A6'}
              buttonBorderWidth={1}
              animationTime={100}

            />

            </View>


          </View>


        </Button>

        <View style={{ marginTop: 20, width: win.width/1.2, left: 0 }}>
          <Text style={{ color: '#fff' }}>Within the radius</Text>
        </View>

        <View style={{  width: win.width/1.2, alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{this.state.valueSlide} kms</Text>
        </View>

        <View style={styles.container}>
          <Slider
            value={this.state.valueSlide}
            onValueChange={(valueSlide) => this.setState({valueSlide})}
            minimumValue={0}
            maximumValue={50}
            style={{ width: win.width/1.2 }}
            trackStyle={{ backgroundColor: '#A6A6A6', height: 3 }}
            thumbStyle={{ backgroundColor: '#fff' }}
            step={1}
          />

        </View>

        <View style={{ flexDirection: 'row', marginTop: 35, width: win.width/1.15  }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
            <View style={{ backgroundColor: 'rgba(0,0,0,0)', height: win.width/10, width: win.width/3, alignSelf: 'center', borderWidth: 1, borderColor: '#fff', justifyContent: 'center', borderRadius: 20 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>CANCEL</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity>
            <View style={{ backgroundColor: '#fff', height: win.width/10, width: win.width/2.2, alignSelf: 'center', borderRadius: 20, justifyContent: 'center' }}>
              <Text style={{ color: '#ef0043', alignSelf: 'center' }}>SEND MESSAGE</Text>
            </View>
            </TouchableOpacity>
          </View>


        </View>


        </View>



      </ScrollView>
      </BackgroundImage>


    );
  }
}

const win=Dimensions.get('window');

const styles=  {
  dropstyle: {                                 // Drop modified according to design
    width: win.width / 2.5,
    height: win.width / 8,
    borderBottomLeftRadius: win.width / 15,
    borderBottomRightRadius: win.width / 15,
    borderTopRightRadius: win.width / 15,
    borderTopLeftRadius: 0,
    backgroundColor: 'rgba(40, 40, 40, .40)'
  },
  container: {
    flex: 1,

    alignItems: 'stretch',
    justifyContent: 'center',
  },
};

export default FreeToMeet;
