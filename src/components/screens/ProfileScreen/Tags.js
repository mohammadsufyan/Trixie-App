import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { Icon } from 'react-native-elements';

class Tags extends Component {
  render() {
    return (
          <Button
            rounded
            onPress={()=>{this.props.onPress(this.props.tagName)}}
            style={{
              backgroundColor: (this.props.selected) ? '#fff' : 'rgba(0, 0, 0, .40)',
              elevation: 0,
              height: 40,
              paddingRight: 10,
              paddingLeft: 10,
              justifyContent: 'center',

            }}
          >
            <Text
              style={{ marginLeft:8,
                color: (this.props.selected) ? '#000' : '#fff',
                fontSize: 15,
              }}
            >
              { this.props.tagName }
            </Text>
              <Icon
                type={'ionicon'}
                name={(this.props.selected) ? 'md-close' : 'md-add'}
                size={30}
                color={(this.props.selected) ? '#EF0043' : '#fff'}
                style={{ marginLeft: 10 }}
              />
          </Button>
    );
  }
}

export default Tags;
