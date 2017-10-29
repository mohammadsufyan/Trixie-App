import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import DropActivityWithHeart from './DropActivityWithHeart';
import CustomText from './CustomText';

// const { contentArray } = this.props.contentArray;

export default class ActivitiesSlide extends Component {

  render() {
    console.log(this.props.contentArray.length);
    switch (this.props.contentArray.length) {
      case 1:
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
                <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 30 }}>
                  <DropActivityWithHeart
                    imageSrc={this.props.contentArray[0].imageSrc}
                    customStyle={styles.dropstyleLeft}
                  />
                  <CustomText style={{ marginTop: 5, color: '#fff' }} >
                    {this.props.contentArray[0].name}
                  </CustomText>
                </View>
            </View>
          </View>
        );
        break;
      case 2:
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

                <View style={{ flex: 1, alignItems: 'center', marginLeft: 25 }}>
                  <DropActivityWithHeart
                    customStyle={styles.dropstyleLeft}
                    imageSrc={this.props.contentArray[0].imageSrc}
                  />
                  <CustomText style={{ marginTop: 5, color: '#fff' }}>
                    {this.props.contentArray[0].name}
                  </CustomText>
                </View>


                <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                  <DropActivityWithHeart
                    imageSrc={this.props.contentArray[1].imageSrc}
                    customStyle={styles.dropstyleRight}
                  />
                  <CustomText style={{ marginTop: 5, color: '#fff' }}>
                    {this.props.contentArray[1].name}
                  </CustomText>
                </View>

            </View>
          </View>
        );
        break;
      case 3:
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

                <View style={{ flex: 1, alignItems: 'center', marginLeft: 25 }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[0].imageSrc} customStyle={styles.dropstyleLeft} />
                  <CustomText style={{marginTop: 5, color: '#fff'}} >
                    {this.props.contentArray[0].name}
                  </CustomText>
                </View>


                <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[1].imageSrc} customStyle={styles.dropstyleRight} />
                  <CustomText style={{marginTop: 5, color: '#fff'}}>
                    {this.props.contentArray[1].name}
                  </CustomText>
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>

                <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 30 }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[2].imageSrc} customStyle={styles.dropstyleLeft} />
                  <CustomText style={{marginTop: 5, color: '#fff'}}>
                    {this.props.contentArray[2].name}
                  </CustomText>
                </View>

            </View>
          </View>
        );
      case 4:
        return (
          <View
            style={{
              flex: 1,
              marginTop: 10,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row'}}>

                <View style={{ flex: 1, alignItems: 'center', marginLeft: 25 }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[0].imageSrc} customStyle={styles.dropstyleLeft} />
                  <CustomText style={{marginTop: 5, color: '#fff'}} >
                    {this.props.contentArray[0].name}
                  </CustomText>
                </View>


                <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[1].imageSrc} customStyle={styles.dropstyleRight} />
                  <CustomText style={{marginTop: 5, color: '#fff'}}>
                    {this.props.contentArray[1].name}
                  </CustomText>
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>

                <View style={{ flex: 1, alignItems: 'center', marginLeft: 25 }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[2].imageSrc} customStyle={styles.dropstyleLeft} />
                  <CustomText style={{marginTop: 5, color: '#fff'}}>
                    {this.props.contentArray[2].name}
                  </CustomText>
                </View>


                <View style={{ flex: 1, alignItems: 'center', marginRight: 25  }}>
                  <DropActivityWithHeart imageSrc={this.props.contentArray[3].imageSrc} customStyle={styles.dropstyleRight} />
                  <CustomText style={{marginTop: 5, color: '#fff'}}>
                    {this.props.contentArray[3].name}
                  </CustomText>
                </View>

            </View>
          </View>
        );
      default:
        return;
    }
  }
}

const win = Dimensions.get('window');

const styles = {
  dropstyleRight: {
    width: win.width / 3,
    height: win.width / 3,
    borderBottomLeftRadius: win.width / 6,
    borderBottomRightRadius: win.width / 6,
    borderTopRightRadius: win.width / 6,
    // marginRight: 10,
  },
  dropstyleLeft: {
    width: win.width / 3,
    height: win.width / 3,
    borderBottomLeftRadius: win.width / 6,
    borderBottomRightRadius: win.width / 6,
    borderTopRightRadius: win.width / 6,
    // marginLeft: 50
  },
};
