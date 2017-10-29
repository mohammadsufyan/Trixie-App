import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { Button, Input, Item } from 'native-base';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import InstagramLogin from 'react-native-instagram-login';
import ImagePicker from 'react-native-image-picker';
import DropActivity from '../../common/DropActivity';
import Tags from './Tags';
import { SERVER_IP_PORT } from '../../../Assets/Strings';
import ActivitiesCarousel from '../../common/ActivitiesCarousel';
import Cookie from 'react-native-cookie';
import InstantFeed from '../TabScreen/screens/InstantFeed.js';
import * as actions from '../../../actions';

const image = require('../../../Assets/Icons/EditProfile/ProfilePic.png');


class MyProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.addTagToSelected = this.addTagToSelected.bind(this);
    this.removeFromSelected = this.removeFromSelected.bind(this);
    // navigation = props.navigation;
    // onBackPress = this.handleBackPress;
  }

  state = {
      searchTagsInput: '',
      tags: [],
      newTag: null,
      selectedTags: [],
      selectedTagsNames: [],
      isModalVisible: false,
      user: {
        name: 'default',
        age: 'default',
        interests: { length: 0 }
      },
      avatarSource: null,
      token: null
  }

  logout() {
    Cookie.clear().then(() => {
      this.setState({ token: null })
    })
  }

  componentWillMount() {
    this.getUserDetails();
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   this.handleBackPress();
    //   return false;
    // });
  }

  getUserDetails() {
    let address = SERVER_IP_PORT.concat(`/api/trixie/users/${this.props.userDetails.fbID}`);
    // address = address.concat(this.props.userDetails.fbID);
    axios.get(address)
    .then(response => {
      this.setState({user: response.data[0]});
    })
    .catch(() => {});
  }

  getUserPhotos() {
    let options = {
      title: 'Select Avatar',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      allowsEditing: true,
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
        console.log(source);
      }
    });
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
            <View key={this.state.tags[i]._id} style={{ flexDirection: 'row', marginTop: 10, }}>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[j].name} />
              </View>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[++j].name} />
              </View>
            </View>
          );
          j++;
        }
      } else if (this.state.tags.length === 1) {
        tag.push(
          <View key={this.state.tags[0]._id} style={{ flexDirection: 'row', marginTop: 10, }}>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Tags onPress={this.addTagToSelected} tagName={this.state.tags[0].name} />
            </View>
          </View>
        );
      } else if (this.state.tags.length % 2 !== 0) {
        const rows = (this.state.tags.length - 1) / 2;
        let j = 0;
        for (i = 0; i < rows; i++) {
          tag.push(
            <View key={this.state.tags[i]._id} style={{ flexDirection: 'row', marginTop: 10, }}>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[j].name} />
              </View>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Tags onPress={this.addTagToSelected} tagName={this.state.tags[++j].name} />
              </View>
            </View>
          );
          j++;
        }
        tag.push(
          <View key={this.state.tags[j]._id} style={{ flexDirection: 'row', marginTop: 10, }}>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Tags onPress={this.addTagToSelected} tagName={this.state.tags[j].name} />
            </View>
          </View>
        );
      }
    } else {
      tag.push(
        <View key={'1'} style={{ flexDirection: 'row', marginTop: 10, }}>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected}  tagName={'smart'} />
          </View>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected} tagName={'experimentative'} />
          </View>
        </View>
      );
      tag.push(
        <View key={'2'} style={{ flexDirection: 'row', marginTop: 10, }}>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Tags onPress={this.addTagToSelected} tagName={'cheerful'} />
          </View>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
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
    return this.state.selectedTags;
  }


  getAccessToken(){
    this.props.getToken(this.state.token);
    console.log(this.props.accessToken);
  }

  ifLoggedIn() {

      if(this.state.token === null) {

        return (
          <View style={{  justifyContent: 'space-between',flex:1,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 14, color: '#fff' }}>{'Share your\nInstagram photos'}</Text>
            </View>
            <View>
              <Button onPress={()=> { this.refs.instagramLogin.show()
                                   }} rounded style={{ backgroundColor: '#fff', alignSelf: 'center', borderColor: 'transparent', height: 40, width: 130 }}>
                <Image
                style={{ height: 24, width: 24, position: 'absolute', left: 15 }}
                  source={ require('./instagram_logo.png') }
                />
                <InstagramLogin
                  ref='instagramLogin'
                  clientId='5b31fb0a18364d078fb7edee16e91836'
                  scopes={['public_content', 'follower_list']}
                  onLoginSuccess={(token) => this.setState({ token })}
                  redirectUrl={'http://trixietheapp.com/'}
                />
                <View style={{ position: 'absolute', backgroundColor: 'transparent', right: 20 }}>
                  <Text style={{ color: '#ef0043', fontSize: 13, fontWeight: 'bold' }}>CONNECT</Text>
                </View>
              </Button>
            </View>
          </View>
        );
      }
      else {


        return (

          <View style={{ flex: 1 }}>
          <InstantFeed />
          </View>
        );
      }

  }

  render() {
    return (
      <ScrollView>
      <StatusBar
         backgroundColor="#9A1137"
         barStyle="light-content"
       />
        <View style={{ flex: 1, alignItems: 'center', marginTop: 15, flexDirection: 'row' }}>
            <View style={{ marginLeft: 24, alignItems: 'flex-end' }}>
              <View>
                <DropActivity customStyle={styles.dropstyle} imageLink={image}/>
              </View>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  borderWidth: 1,
                  borderRadius: 30,
                  height: 30,
                  width: 30,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'transparent',
                  marginTop: 8,
                  right: 8
                }}
              >
                <TouchableOpacity>
                <Icon
                  type={'ionicon'}
                  name={'md-close'}
                  size={27}
                  color={'#ef0043'}
                />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'column', flex: 1, width: win.width / 1.8, height: win.width / 1.8 }}>
              <View style={styles.profileFirstStyle}>
                <Image
                  style={styles.imageStyle}
                  source={{uri: 'https://pbs.twimg.com/profile_images/591235840652619776/7Y6spghi.jpg'}}
                />
                <View style={{ position: 'absolute', borderWidth: 1, borderRadius: 30, height: 30, width: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderColor: 'transparent', right: 8, top: 8 }}>
                  <TouchableOpacity>
                  <Icon
                    type={'ionicon'}
                    name={'md-close'}
                    size={27}
                    color={'#ef0043'}
                  />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileSecondStyle}>
              <Image
                style={styles.imageStyle}
                source={this.state.avatarSource}
              />
              <View style={{ flex: 1, position: 'absolute', borderWidth: 1, borderRadius: 30, height: 30, width: 30, backgroundColor: '#ef0043', justifyContent: 'center', alignItems: 'center', borderColor: 'transparent', right: 8, top: 8 }}>
                <TouchableOpacity
                  onPress={()=>{this.getUserPhotos();}}
                >
                <Icon
                  type={'ionicon'}
                  name={'md-add'}
                  size={27}
                  color={'#fff'}
                />
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, marginTop: 10, marginLeft: 25  }}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
              {this.state.user.name},{` `}
              {this.state.user.age}
            </Text>
          </View>

          <View style={{ flex: 1, marginTop: 5, marginLeft: 25  }}>
            <Text style={{ fontSize: 16, color: '#fff' }}>
              {this.props.userDetails.bio}{`\n`}
              Works at{` `}{this.props.userDetails.currentWork}
            </Text>
          </View>

          <View style={styles.footView} />
          <View style={{ flex: 1, marginTop: 10, marginLeft: 25  }}>
            <Text style={{ fontSize: 14, color: '#fff' }}>{'Choose/type keywords that define you'}</Text>
          </View>

          <View style={{marginLeft:win.width/22,flex: 1, height: null }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,

                flex: 1,
                justifyContent: 'center'
              }}
            >
              <ScrollView horizontal>
                {this.renderSelectedTags()}
              </ScrollView>
            </View>
            <View style={{flex: 1, height: 107, justifyContent: 'center'}}>
              {this.renderTags()}
              {this.renderNewTag()}
            </View>
          </View>

          <View style={{ marginTop: 15, marginLeft: win.width/14, marginRight: win.width/14, justifyContent: 'center' }}>
            <Item
              rounded
              style={{
                backgroundColor: '#881534',
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
                style={{  marginLeft:10,fontSize: 15, alignSelf: 'center', color: '#fff',padding: 10 }}
                onChangeText={text => {
                  this.setState({ searchTagsInput: text });
                }}
                text={this.state.searchTagsInput}
              />
            </Item>
          </View>

          <View style={{ marginTop: 15, marginLeft: win.width/14, marginRight: win.width/14 }}>
            <Item
              rounded
              style={{
                backgroundColor: '#881534',
                borderWidth: 0,
                borderColor: 'transparent',
                padding: 5
              }}
            >
              <Input
              placeholderSt
                placeholder={'Say something about yourself...200 characters'}
                multiline={true}
                numberOfLines={6}
                maxLength={200}
                clearButtonMode='while-editing'
                placeholderTextColor='#fff'
                returnKeyLabel='Save'
                style={{ marginLeft:5,textAlignVertical: 'top',flex: 1, fontSize: 15, alignSelf: 'flex-start', color: '#fff',  height: win.height/4 }}
              />
            </Item>
          </View>

          <View style={styles.footView} />
          <View style={{ flex: 1, marginTop: 10, marginLeft: 25  }}>
            <Text style={{ fontSize: 14, color: '#fff' }}>{'Choose/type activities you love.'}</Text>
          </View>
          <View style={{flex: 1}}>
            <ActivitiesCarousel />
          </View>


          <View style={styles.footView} />
          <View style={{ marginTop: 20, marginBottom: win.width/15 }}>
            <View style={{ flexDirection: 'row', paddingLeft: 20,paddingRight: 20,paddingBottom: 20, justifyContent: 'space-between' }}>

               {this.ifLoggedIn()}


                {console.log('Token=', this.state.token)}

              {/*<Button onPress={()=> this.logout()} rounded style={{ backgroundColor: '#fff', alignSelf: 'center', borderColor: 'transparent', height: 40, width: 130 }}>
                <Text>Logout</Text>
              </Button>*/}

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
              <View>
              <Text style={{ fontSize: 14, color: '#fff' }}>{'Share your\nPinterest photos'}</Text>
            </View>
            <View>
              <Button rounded style={{ backgroundColor: '#fff', alignSelf: 'center', borderColor: 'transparent', height: 40, width: 130, marginBottom:20 }}>
                <Image
                  style={{ height: 24, width: 24, position: 'absolute', left: 15 }}
                  source={ require('./pinterest_logo.png') }
                />
                <View style={{ position: 'absolute', backgroundColor: 'transparent', right: 20 }}>
                <Text style={{ color: '#ef0043', fontSize: 13, fontWeight: 'bold' }}>CONNECT</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const win = Dimensions.get('window');

const styles = {
  dropstyle: {
      width: win.width / 1.8,
      height: win.width / 1.8,
      borderBottomLeftRadius: win.width / 3.6,
      borderBottomRightRadius: win.width / 3.6,
      borderTopRightRadius: 0,
      borderTopLeftRadius: win.width / 3.6
    },
    profileFirstStyle: {
      height: win.height / 6.5,
      width: win.height / 6.5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 8,
      marginBottom:5 ,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    profileSecondStyle: {
      height: win.height / 6.5,
      width: win.height / 6.5,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: 'transparent',
      marginLeft: 8,
    },
    imageStyle: {
      height: win.height / 6.5,
      width: win.height / 6.5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      borderWidth: 0.4,
      borderTopColor: '#A6A6A6',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent'
    }
};


const mapStateToProps = state => {
  return {
    userDetails: state.userDetails,
    accessToken: state.accessToken,
  };
};

export default connect(mapStateToProps, actions)(MyProfileScreen);
