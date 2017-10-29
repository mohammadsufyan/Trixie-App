import React,{Component} from 'react';
import {ScrollView,Text,Dimensions,View,Image} from 'react-native';
import BackgroundImage from '../BackgroundImage';
import Carousel from '../CarouselIndex';
import ImageSlides from './ImageSlides';
import {Footer,FooterTab,Button as Btn} from 'native-base';
//import Tags from '../Tags';
import InstantFeed from './InstantFeed';

const { width, height } = Dimensions.get('window');
const win = Dimensions.get('window');
class CardDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      size: { width, height },
    };
  }
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height/2 } });
  }

  render()
  {
    const image = require('../images/background.png');
    return(
        <BackgroundImage Image={image}>

        <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        <ScrollView>
          <Carousel
            delay={2000}
            style={this.state.size}
            autoplay={false}
            bullets
            chosenBulletStyle={{ backgroundColor: 'white' }}
            bulletStyle={{ backgroundColor: 'rgba(0, 0, 0, .35)', borderWidth: 0 }}
            onAnimateNextPage={(p) => console.log(p)}
          >
              <View style={this.state.size}>
                <ImageSlides slideNumber='1' styler={this.state.size}/>
              </View>
              <View style={this.state.size}>
                <ImageSlides slideNumber='2' styler={this.state.size}/>
              </View>
              <View style={this.state.size}>
                <ImageSlides slideNumber='3' styler={this.state.size}/>
              </View>
          </Carousel>
          <View>
              <Text style={{color: '#fff'}}>{'Heloo Lorem Ipsum.Heloo Lorem Ipsum.Heloo Lorem Ipsum. '}  </Text>
          </View>

          <View style={{ backgroundColor: '#fff', flex: 1, height: win.height/2.5, padding: 10 }}>
            <Text style={{ fontSize: 14, fontFamily: 'quicksand-bold', color: '#EF0043' }}>Instagram/Pinterest</Text>

            <InstantFeed />
            
          </View>
          </ScrollView>
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
                <Btn style={{height: win.height/6}}>
                  <Image source={require('../images/Tick.png')} style={{ height: 60, width: 60 }} />
                </Btn>
              </FooterTab>
            </Footer>
          </View>
          </View>


        </BackgroundImage>
    );
  }
}

export default CardDetails;
