import React, { Component } from 'react';
import { Image, Dimensions, PixelRatio, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { Footer, FooterTab, Button as Btn } from 'native-base';
import CardSwiper from './CardSwiper';
import CardDetails from './CardDetails';
import { baseURL, fbID } from '../../../../utils/constants';

export default class CardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
  }

  componentDidMount() {
    this.getAccessTokenAndCallMetchApi();
  }

  async getAccessTokenAndCallMetchApi() {
    this.fetchMetchesList('fb_103');
    alert("working2 "+this.props.userDetails.fbID);
  }

  fetchMetchesList(token) {
    fetch(`http://139.59.76.14:4001/api/trixie/users/${token}/matches`)
    .then((response) => 
    response.json())
    .then((json) => {
      this.setState({
        matches: json,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
  }


  getDistance(distanceInMeter) {
    const num = distanceInMeter/1000;
    // return parseFloat(Math.round(num * 100) / 100).toFixed(2);
    return Math.round(num * 100) / 100;
  }

  getProfilePicSource(picUrl) {
    return { uri: picUrl };
  }

  removeIdFromState(fbID) {
    let matches = this.state.matches;
    for (var i=0; i<matches.length;) {
      if(matches[i].fbID === fbID) {
        matches.splice(i, 1);
        this.setState({
          matches
        })
      }
      ++i;
    }
  }

  updateLikeStatus(id, isLike) {
    let api;
    if(isLike){
      // api = `http://139.59.76.14:4001/api/trixie/users/${this.props.userDetails.fbID}/likes`
      api = `http://139.59.76.14:4001/api/trixie/users/fb_103/likes`
    } else {
      // api = `http://139.59.76.14:4001/api/trixie/users/${this.props.userDetails.fbID}/dislikes`
      api = `http://139.59.76.14:4001/api/trixie/users/fb_103/dislikes`
    }
    fetch(api, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"userId": id})
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("+++++++++++++++++ like json", json);
      this.removeIdFromState(id);
    })
    .catch((error) => {
      console.log("+++++++++++++++++ like error", error);
      console.log('error', error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {/*<Image
            source={require('../../../../Assets/Icons/Chats/shadow.png')}
            style={{ height: 12, width: win.width }}
          />*/}
          <CardSwiper
            cards={this.state.matches}
            renderCard={(card) => {
              if(card && Object.keys(card).length > 0){
                return (
                  <View
                    style={{
                      height: ((win.height * 17) / 24) - 20,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={{
                        height: ((win.height * 17) / 24) + 60,
                        width: win.width,
                      }}
                      source={this.getProfilePicSource(card.profilePic)}
                    />
                    <View style={styles.ageCard}>
                      <Text style={styles.text}>{`${card.name}, ${card.age}`}</Text>
                    </View>
                    <View style={styles.descriptionCard}>
                      <Text
                        style={styles.cardDescriptionTextUpper}
                      >
                        {`${card.currentWork.position} at ${card.currentWork.employer}`}
                      </Text>
                      <Text
                        style={styles.cardDescriptionTextLower}
                      >
                        {`Last activity: ${this.getDistance(card.distance)} kms away`}
                      </Text>
                    </View>
                  </View>
                )
              } else {
                return (
                  <View />
                )
              }
            }}
            jumpToCardIndex={5}
            overlayLabels={{
            left: {
              title: 'NOPE',
              swipeColor: '#FF6C6C',
              backgroundOpacity: '0.75',
              fontColor: '#FFF'
            },
            right: {
              title: 'LIKE',
              swipeColor: '#4CCC93',
              backgroundOpacity: '0.75',
              fontColor: '#FFF'
            },
            }}
            swipeAnimationDuration={500}
            animateCardOpacity
            animateOverlayLabelsOpacity
            verticalSwipe={false}
            onSwiped={(cardIndex) => { console.log(cardIndex); }}
            onSwipedLeft={(cardIndex) => { this.updateLikeStatus(this.state.matches[cardIndex].fbID, false) }}
            onSwipedRight={(cardIndex) => { this.updateLikeStatus(this.state.matches[cardIndex].fbID, true) }}
            onSwipedAll={() => { console.log('onSwipedAll'); }}
            cardIndex={0}
            infinite
            backgroundColor={'red'}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', height: win.height / 6}}>
          <Footer style={{ borderTopWidth: 0.2, elevation: 2, height: win.height / 6, position: 'absolute', bottom: 0}}>
            <FooterTab style={{ backgroundColor: '#EF0043', height: win.height / 6 }}>
              <Btn style={{height: win.height / 6}}>
                <Image source={require('../images/Cross.png')} style={{ height: 60, width: 60 }} />
              </Btn>
              <View style={{ justifyContent: 'center' }}>
                <Image
                  source={require('../../../../Assets/Icons/MatchCardHome/SEPARATER.png')}
                  style={{ height: 30, width: 0.8 }}
                />
              </View>
            </FooterTab>
            <FooterTab style={{backgroundColor: '#EF0043',height: win.height / 6}}>
              <Btn 
                style={{height: win.height/6}}
              >
                <Image source={require('../images/Tick.png')} style={{ height: 60, width: 60 }} />
              </Btn>
            </FooterTab>
          </Footer>
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');
const sizeRatio = win.height / win.width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(145,0,41, 0.9)',
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: win.width/20,
    color: '#fff',
    marginLeft: win.width/7,
    marginRight: win.width/7

  },
  ageCard: {
    position: 'absolute',
    backgroundColor: 'rgba(239,0,67,0.6)',
    borderRadius: 15 * sizeRatio,
    height: 30 * sizeRatio,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    width: null,
    justifyContent: 'center',
    bottom: (win.height / 7.5) + 10,

  },
  descriptionCard: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(145,0,41, 0.9)',
    height: ((win.height * 4) / 6) / 5,
    padding: 10,
    width: win.width,
    borderTopColor: '#fff',
    borderWidth: 1,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    bottom: 0
  },
  cardDescriptionTextLower: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'quicksand-light',
      letterSpacing: win.width/350
  },
  cardDescriptionTextUpper: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'quicksand-bold',
    letterSpacing: win.width/350
  },
});
