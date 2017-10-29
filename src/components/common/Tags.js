import React,{ Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { Button } from 'native-base';
import { Icon } from 'react-native-elements';

class Tags extends Component
{
  render(props) {


    return(

          <Button rounded style={{ backgroundColor: 'rgba(0, 0, 0, .40)', padding: 0 }}>

            <Text style={{ color: '#fff', fontSize: 15 }}>{ this.props.tagName }</Text>
            <TouchableOpacity>
              <Icon
                type={'ionicon'}
                name={'md-add'}
                size={20}
                color={'#fff'}
                style={{ marginLeft: 10 }}

              />
            </TouchableOpacity>
          </Button>





    );

  }
}

const win= Dimensions.get('window');

export default Tags;
