import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import CustomText from '../../common/CustomText';
import DropActivity from '../../common/DropActivity';

export default class ActivitiesSlide extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 30,
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
              <DropActivity customStyle={styles.dropstyle} />
              <CustomText style={{marginTop: 5, color: '#fff'}} >
                Reading
              </CustomText>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <DropActivity customStyle={styles.dropstyle} />
            <CustomText style={{marginTop: 5, color: '#fff'}}>
              Reading
            </CustomText>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <DropActivity customStyle={styles.dropstyle} />
            <CustomText style={{marginTop: 5, color: '#fff'}}>
              Reading
            </CustomText>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <DropActivity customStyle={styles.dropstyle} />
            <CustomText style={{marginTop: 5, color: '#fff'}}>
              Reading
            </CustomText>
          </View>
        </View>
      </View>
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
}
