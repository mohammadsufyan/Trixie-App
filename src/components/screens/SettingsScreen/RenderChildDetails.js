import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';
import {ActionSheet} from 'native-base';

var AGE = ["<10","10-20", "20-30", ">30"];
var GENDER = ["Male","Female"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;


class RenderChildDetails extends Component {
  state={
      kidsAge: 0,
      kidsGender: '',
  }
  render()
  {
    return(
      <View style={{flexDirection:'row',flex:1}}>
      <View style={{backgroundColor:'black',height:20,width:20,borderRadius:10,margin:5,alignItems:'center', padding: 1}}>
       <Text style={{color:'white'}}>{this.props.ivalue}</Text>
     </View>
     <TouchableOpacity onPress={() =>
                             ActionSheet.show(
                               {
                                 options: AGE,
                                 cancelButtonIndex: CANCEL_INDEX,
                                 destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                 title: "Select Age"
                               },
                               buttonIndex => {
                                 this.setState({ kidsAge: AGE[buttonIndex] });
                               }
                             )}>

      <View style={{flex:1,margin:5,flexDirection:'row'}} >
        <Text>Age: {this.state.kidsAge}</Text>
        <Image source={require('../../../Assets/Icons/Settings/Black_down.png')}
               style={{height:11,width:11,margin:5}} />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>
          ActionSheet.show(
                            {
                              options: GENDER,
                              cancelButtonIndex: CANCEL_INDEX,
                              destructiveButtonIndex: DESTRUCTIVE_INDEX,
                              title: "Gender"
                            },
                            buttonIndex => {
                                            this.setState({ kidsGender: GENDER[buttonIndex] });
                                          }
                          )}>
      <View style={{flex:1,margin:5,flexDirection:'row'}}>
        <Text>Gender: {this.state.kidsGender}</Text>
        <Image source={require('../../../Assets/Icons/Settings/Black_down.png')}
               style={{height:11,width:11,margin:5}} />
      </View>
      </TouchableOpacity>
     </View>


   );

  }
}

export default RenderChildDetails;
