import React,{Component} from 'react';
import {TouchableOpacity,Image,View,Text} from 'react-native';

class RelationshipToggle extends Component {
state={
  toggle:false,
}
_onPress()
{
  const newState = !this.state.toggle;
  this.setState({toggle:newState})
}
  render() {
    const{toggle}= this.state;
    const bgColor= toggle?'#EF0043':'#fff'
    const txtcolor = toggle?'#fff':'#EF0043'
    return (
      <TouchableOpacity onPress={()=>{this._onPress()}} >
      <View style={[styles.relationshipstatusbutton,{backgroundColor:bgColor}]}>
        <View style={{flex:5}}>
        <Text style={[styles.relationshipstatustext,{color:txtcolor}]}>{this.props.relstatus}</Text>
        </View>
        <View style={{flex:1,position:'absolute',right:10,top:8}}>
        <Image source={require('../../../Assets/Icons/Settings/Tick.png')} style={{height:15,width:15}} />
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}


const styles ={
  relationshipstatusbutton: {
    height:30,
    borderRadius:30,
    borderWidth: 0.2,
    marginLeft:10,
    marginRight:10,
    marginTop:8,
    backgroundColor:'white',
    justifyContent: 'center',
    flexDirection: 'row',
    padding:5,


  },

  relationshipstatustext: {
    color: '#EF0043',
    fontSize: 15,
    marginLeft: 15,

  }
};

export default RelationshipToggle;
