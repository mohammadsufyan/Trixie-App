import React, { Component } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';
import axios from 'axios';
import { Input, Item } from 'native-base';
import Carousel from './Carousel';
import ActivitiesSlide from './ActivitiesSlide';
import CustomText from './CustomText';
import { SERVER_IP_PORT, SERVER_IP } from '../../Assets/Strings';


const win = Dimensions.get('window');

class ActivitiesCarousel extends Component {

  state = {
    activities: [],
    searchActivitiesInput: '',
    searchedActivities: [],
    searchedActivitiesInputPrevious: '',
    selectedActivities: [],
    selectedActivitiesNames: [],
  };

  componentWillMount() {
    let address = SERVER_IP_PORT.concat('/api/trixie/getAllActivities');
    axios.get(address)
    .then((response) => {
      console.log(response);
      this.setState({ activities: response.data });
    })
    .catch(() => {});
  }

  addTagToSelected(tagName) {
    let newArray = [];
    let newArrayNames = [];
    let i = 0;
    const key = this.state.selectedActivities.length;
    for (i = 0; i < key; i++) {
      if (this.state.selectedActivities[i].props.children.props.tagName === tagName) {
        return this.state.selectedActivities;
      }
    }
    newArray = this.state.selectedActivities;
    newArrayNames = this.state.selectedActivitiesNames;
    newArrayNames.push(tagName);
    newArray.push(
      <View key={key + 1} style={{ marginLeft: 10, marginRight: 10 }}>
        <Tags onPress={this.removeFromSelected} selected tagName={tagName} />
      </View>
    );
    this.setState({ selectedActivities: newArray });
    this.setState({ selectedActivitiesNames: newArrayNames });
  }

  removeFromSelected(tagName) {
    const key = this.state.selectedActivities.length;
    let i = 0;
    for (i = 0; i < key; i++) {
      if (this.state.selectedActivities[i].props.children.props.tagName === tagName) {
        break;
      }
    }
    let newArray = [];
    let newArrayNames = [];
    newArray = this.state.selectedActivities;
    newArrayNames = this.state.selectedActivitiesNames;
    newArray.splice(i, 1);
    newArrayNames.splice(i, 1);
    this.setState({ selectedTags: newArray });
    this.setState({ selectedTagsNames: newArrayNames });
  }

  renderSlides() {
    let address = SERVER_IP_PORT.concat('/api/trixie/searchActivities/^');
    if ((this.state.searchActivitiesInput !== '')) {
      address = address.concat(this.state.searchActivitiesInput);
      axios.get(address)
      .then((response) => {
        this.setState({ searchedActivities: response.data });
      })
      .catch((error) => {console.log(error);});
      if (this.state.searchedActivities.length > 0) {
        let i = 0;
        let j = 0;
        let k = 0;
        let key = parseInt(this.state.searchedActivities.length / 4);
        let extra = this.state.searchedActivities.length % 4;
        let slides = [];
        for (i = 0; i < key; i++) {
          let contentArray = [];
          for (k = j; k < (j + 4); k++) {
            contentArray.push(this.state.searchedActivities[k]);
          }
          slides.push(<ActivitiesSlide key={j + 1} contentArray={contentArray} />);
          j += 4;
        }

        let contentArray = [];
        for (k = j; k < (j + extra); k++) {
          contentArray.push(this.state.searchedActivities[k]);
        }
        slides.push(<ActivitiesSlide key={j + 1} contentArray={contentArray} />);
        return slides;
      }
      return <ActivitiesSlide contentArray={[{ name: '' }]} />
    } else if (this.state.activities.length > 0) {
      let i = 0;
      let j = 0;
      let k = 0;
      let key = parseInt(this.state.activities.length / 4);
      let extra = this.state.activities.length % 4;
      let slides = [];
      for (i = 0; i < key; i++) {
        let contentArray = [];
        for (k = j; k < (j + 4); k++) {
          contentArray.push(this.state.activities[k]);
        }
        slides.push(<ActivitiesSlide key={j + 1} contentArray={contentArray} />);
        j += 4;
      }
      let contentArray = [];
      for (k = j; k < (j + extra); k++) {
        contentArray.push(this.state.activities[k]);
      }
      slides.push(<ActivitiesSlide key={j+1} contentArray={contentArray} />);
      return slides;
    } else {
      return <ActivitiesSlide contentArray={[{ name: 'default' }]} />
    }
  }


  render() {
    return (
      <View>
        <View style={{ alignItems: 'center', flex: 1, height: null }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ScrollView horizontal>
            </ScrollView>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Carousel
            style={{ height: (win.height / 1.8), width: win.width / 1.1 }}
            autoplay={false}
            arrows
            chosenBulletStyle={{ backgroundColor: 'white' }}
            bulletStyle={{ backgroundColor: 'rgba(0, 0, 0, .35)', borderWidth: 0 }}
          >
            {this.renderSlides()}
          </Carousel>
        </View>
        <View style={{ marginTop: 15, marginRight: 20, marginLeft: 20 }}>
          <Item
            rounded
            style={{
              backgroundColor: 'rgba(0, 0, 0, .40)',
              borderWidth: 0,
              borderColor: 'transparent',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Input
              placeholder='Type it here...'
              placeholderTextColor='#fff'
              style={{ fontFamily: 'quicksand-regular', paddingLeft: 20, paddingRight: 10, fontSize: 13, alignSelf: 'center', color: '#fff' }}
              onChangeText={text => {
                this.setState({ searchActivitiesInput: text });
              }}
              text={this.state.searchActivitiesInput}
            />
          </Item>
        </View>
      </View>
    );
  }
}

export default ActivitiesCarousel;
