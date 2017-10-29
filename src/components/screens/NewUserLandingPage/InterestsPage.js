import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import { Item, Input, Button } from 'native-base';
import axios from 'axios';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import CustomText from '../../common/CustomText';
import * as actions from '../../../actions';
import Tags from './Tags';
// import Carousel from './Carousel';
import { SERVER_IP_PORT } from '../../../Assets/Strings';
// import ActivitiesSlide from './ActivitiesSlide';
import BackgroundImage from '../../common/BackgroundImage';
import ActivitiesCarousel from '../../common/ActivitiesCarousel';

const bg = require('../../../Assets/background.png');

class InterestsPage extends Component {

  constructor() {
    super();
    this.addTagToSelected = this.addTagToSelected.bind(this);
    this.removeFromSelected = this.removeFromSelected.bind(this);
  }

  state = {
      searchTagsInput: '',
      tags: [],
      newTag: null,
      selectedTags: [],
      selectedTagsNames: [],
      isModalVisible: false,
  }

  addTagToSelected(tagName) {
    let newArray = [];
    let newArrayNames = [];
    let i = 0;
    const key = this.state.selectedTags.length;
    for (i = 0; i < key; i++) {
      if (this.state.selectedTags[i].props.children.props.tagName === tagName) {
        return this.state.selectedTags;
      }
    }
    newArray = this.state.selectedTags;
    newArrayNames = this.state.selectedTagsNames;
    newArrayNames.push(tagName);
    newArray.push(
      <View key={key + 1} style={{ marginLeft: 10, marginRight: 10 }}>
        <Tags onPress={this.removeFromSelected} selected tagName={tagName} />
      </View>
    );
    this.setState({ selectedTags: newArray });
    this.setState({ selectedTagsNames: newArrayNames });
  }

  removeFromSelected(tagName) {
    const key = this.state.selectedTags.length;
    let i = 0;
    for (i = 0; i < key; i++) {
      if (this.state.selectedTags[i].props.children.props.tagName === tagName) {
        break;
      }
    }
    let newArray = [];
    let newArrayNames = [];
    newArray = this.state.selectedTags;
    newArrayNames = this.state.selectedTagsNames;
    newArray.splice(i, 1);
    newArrayNames.splice(i, 1);
    this.setState({ selectedTags: newArray });
    this.setState({ selectedTagsNames: newArrayNames });
  }

  renderTags() {
    let address = SERVER_IP_PORT.concat('/api/trixie/searchInterests/^');
    let i = 0;
    const tag = [];
    if (this.state.searchTagsInput !== '') {
      address = address.concat(this.state.searchTagsInput);
      axios.get(address)
      .then((response) => {

        this.setState({ tags: response.data });
      })
      .catch(() => {});

      if (this.state.tags.length % 2 === 0) {
        const rows = this.state.tags.length / 2;
        let j = 0;
        for (i = 0; i < rows; i++) {
          tag.push(
            <View key={this.state.tags[i]._id} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
              <View style={{ marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[j].name} />
              </View>
              <View style={{ marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[++j].name} />
              </View>
            </View>
          );
          j++;
        }
      } else if (this.state.tags.length === 1) {
        tag.push(
          <View key={this.state.tags[0]._id} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
            <View style={{ marginRight: 10 }}>
              <Tags onPress={this.addTagToSelected} tagName={this.state.tags[0].name} />
            </View>
          </View>
        );
      } else if (this.state.tags.length % 2 !== 0) {
        const rows = (this.state.tags.length - 1) / 2;
        let j = 0;
        for (i = 0; i < rows; i++) {
          tag.push(
            <View key={this.state.tags[i]._id} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
              <View style={{ marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[j].name} />
              </View>
              <View style={{ marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[++j].name} />
              </View>
            </View>
          );
          j++;
        }
        tag.push(
          <View key={this.state.tags[j]._id} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
            <View style={{ marginRight: 10 }}>
              <Tags onPress={this.addTagToSelected} tagName={this.state.tags[j].name} />
            </View>
          </View>
        );
      }
    } else {
      tag.push(
        <View key={'1'} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
          <View style={{ marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected} tagName={'smart'} />
          </View>
          <View style={{ marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected} tagName={'experimentative'} />
          </View>
        </View>
      );
      tag.push(
        <View key={'2'} style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
          <View style={{ marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected} tagName={'cheerful'} />
          </View>
          <View style={{ marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected} tagName={'motivator'} />
          </View>
        </View>
      );
    }
    return tag;
  }

  renderNewTag() {
    if (this.state.searchTagsInput !== '') {
      let address = SERVER_IP_PORT.concat('/api/trixie/searchInterests/^');
      address = address.concat(this.state.searchTagsInput);
      axios.get(address)
      .then(response => {
        if (response.data.length === 0) {
          this.newTag = true;
        } else {
          this.newTag = false;
        }
      })
      .catch(() => {});
    } else {
      this.newTag = false;
    }
    if (this.newTag) {
      return (
        <View
          key={'0'}
          style={{
            flexDirection: 'row',
            marginTop: 10,
            flex: 1,
            alignItems: 'center',
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Tags
              tagName={this.state.searchTagsInput}
              onPress={this.addTagToSelected}
            />
          </View>
        </View>
      );
    }
  }

  renderSelectedTags() {
    return (
      <View style={{paddingLeft: 15, paddingRight: 15, flexDirection: 'row'}}>
        {this.state.selectedTags}
      </View>
    );
  }

  newSetupDone() {
    const curentDay = new Date();
    const userBirthday = new Date(this.props.userDetails.birthday);
    let age = curentDay.getFullYear() - userBirthday.getFullYear() - 1;
    if (curentDay.getMonth() > userBirthday.getMonth()) {
      age++;
    } else if (curentDay.getMonth() === userBirthday.getMonth()) {
      if (curentDay.getDate() > userBirthday.getDate()) {
        age++;
      }
    }
    let address = SERVER_IP_PORT.concat('/api/trixie/postNewUser/');
    if (this.state.selectedTags.length >= 3) {
      axios.post(address, {
        name: this.props.userDetails.name,
        fbID: this.props.userDetails.fbID,
        age,
        interests: this.state.selectedTagsNames,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      address = 'https://api.trixietheapp.com/api/trixie/registerUserForChat/'.concat(this.props.userDetails.fbID);
      // console.log(address);
      axios.get(address).then((response) => {
        console.log(response);
      });
      this.props.newUserState(false);
    } else {
      this._showModal();
    }
  }

  _showModal = () => {
    this.setState({ isModalVisible: true });
  };

  _hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  renderAlertModal() {
    return (
      <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.AlertModalViewStyle}>
            <View
              style={{
                flex: 1,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 17,
                  color: '#EF0043'
                }}
              >
                Please select atleast 3 qualities / activities.
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                onPress={() => { this._hideModal('alert'); }}
                light
                rounded
                style={styles.buttonModalStyle}
              >
                <Text style={{ color: '#fff' }}>Close</Text>
              </Button>
            </View>
          </View>
        </Modal>
    );
  }

  render() {
    return (

      <BackgroundImage Image={bg}>
        {this.renderAlertModal()}
        <View style={styles.containerStyle}>
          <ScrollView
            style={{ marginTop: 20, flex: 1, width: win.width }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
              <CustomText style={styles.textStyle}>
                {`JUST 2 MORE STEPS BEFORE YOU\nSTART DISCOVERING\nNEW FRIENDS!`}
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.stepStyle}>
                <CustomText style={{ fontSize: 12, color: '#DD003D', fontFamily: 'quicksand-medium' }}>1</CustomText>
              </View>
            </View>
            <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingLeft: 10 }}>
              <CustomText
                style={{
                  fontSize: 14,
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'quicksand-medium'
                }}
              >
                {`Choose/type at least 3 words that define\n`}
                {`you. Dont worry you can edit them later.`}
              </CustomText>
            </View>
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
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {this.renderSelectedTags()}
                </ScrollView>
              </View>
              <View style={{ marginRight: 35, flex: 1, height: 107, justifyContent: 'center'}}>
                {this.renderTags()}
                {this.renderNewTag()}
              </View>
            </View>
            <View style={{ marginTop: 15, marginLeft: 20, marginRight: 20 }}>
              <Item
                rounded
                style={{
                  backgroundColor: 'rgba(40, 40, 40, .40)',
                  borderWidth: 0,
                  borderColor: 'transparent',
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Input
                  placeholder='Type it here...'
                  placeholderTextColor='#fff'
                  style={{ paddingLeft: 20, paddingRight: 20, fontFamily: 'quicksand-regular', fontSize: 13, alignSelf: 'center', color: '#fff' }}
                  onChangeText={text => {
                    this.setState({ searchTagsInput: text });
                  }}
                  text={this.state.searchTagsInput}
                />
              </Item>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  marginTop: 15,
                  height: 20,
                  width: 20,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: 15, color: '#DD003D' }}>2</Text>
              </View>
            </View>

            <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
              <CustomText
                style={{
                  fontSize: 14,
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'quicksand-medium'
                }}
              >
                Choose/type at least 1 activity you love.{`\n`}
                Dont worry you can change them later.
              </CustomText>
            </View>

            <ActivitiesCarousel />


            <View style={{ marginTop: 35, marginBottom: 35 }}>
              <Button
                onPress={() => {
                  this.newSetupDone();
                }}
                rounded
                style={{ backgroundColor: '#fff', alignSelf: 'center', width: win.width / 2.8, height: 36 }}
              >
                <Text style={{ flex: 1, color: '#DD003D', fontSize: 13, textAlign: 'center' }}>DONE</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </BackgroundImage>
    );
  }
}

const win = Dimensions.get('window');

const styles = {
  dropstyle: {
    width: win.width / 3,
    height: win.width / 3,
    borderBottomLeftRadius: win.width / 6,
    borderBottomRightRadius: win.width / 6,
    borderTopRightRadius: win.width / 6,
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'quicksand-medium'
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepStyle: {
    marginTop: 15,
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  AlertModalViewStyle: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20
  },
  buttonModalStyle: {
    backgroundColor: '#EF0043',
    borderColor: null,
    elevation: 0,
    alignItems: 'center',
    alignSelf: 'center',
    height: 30,
  },
};

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, actions)(InterestsPage);
