import React, { Component } from "react";
import {
StyleSheet,
View,
ListView,
ActivityIndicator,
Image,
Text
} from "react-native";
import redux from 'react-redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import instagram from './instagram'
import Row from './row'
import Icon from 'react-native-vector-icons/Ionicons';
import RNInstagramOAuth  from 'react-native-instagram-oauth';

let INSTAGRAM_TOKEN = null;  // when kept null works (hardcoded reducer value)

class InstantFeed extends Component {
  constructor(props){
  super(props)

   const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      isReady : false,
      userInfo:{data:null}
    };
  }
  getInstagramByMyself (access_token) {
    fetch('https://api.instagram.com/v1/users/self/?access_token='+access_token)
        .then((response) => response.json()).then((responseData) => {
            console.log(responseData);
        });
  }

  componentWillMount(){

    INSTAGRAM_TOKEN = this.props.accessToken;
    console.log(this.props.accessToken);
    let self = this;
    instagram.getSelfInfo(INSTAGRAM_TOKEN,function(err,userData){
      if(err){
        alert('something went wrong!')
        return;
      }
        instagram.login(INSTAGRAM_TOKEN,function(err,data){
          if(err){
            alert(err);
            return;
          }
          console.log('data-> ',data)
          const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });
          self.setState({dataSource: dataSource.cloneWithRows(data.data),isReady:true,userInfo:userData});
        });
    });
  }
  render() {

      return (
        <View style={styles.container}>
          { this.renderListView() }
        </View>
      );
    }


  renderListView(){
    return(
      <View style={styles.listViewContainer}>

        <ListView style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          horizontal={true}
          pageSize={2}

        />
      </View>
    )
  }
  renderRow(rowData){
    if(rowData.hasOwnProperty('images')){
      return(

        <Row data = {rowData}/>

      )
    }
    else{
      return(<Text>Yükleniyor!</Text>)
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',

  },
  listViewContainer:{
    flex:1,
    alignSelf:'stretch',
    backgroundColor: 'transparent',
  },
  navigation:{
    height:60,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',

    alignSelf:'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text:{
    marginTop:10
  },
  iconImage:{
    marginHorizontal:15,
    marginTop:10,
  },
  loadingActivityContainer:{
    alignSelf:'stretch',
    flex:1,
    justifyContent:'center'
  },

})

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken,

  };
};

// export default InstantFeed;
export default connect(mapStateToProps,actions)(InstantFeed);
