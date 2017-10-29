import React, { Component } from 'react';
//import { View, Text } from 'react-native';
import { Container } from 'native-base';
import MapContainer from './MapContainer';

class Home extends Component {

  componentDidMount()
  {
    this.props.getCurrentLocation();
  }

  render() {
    return (
      <Container>
      {this.props.region.latitude &&
        <MapContainer
          getCurrentLocation={this.props.getCurrentLocation}
          region={this.props.region}
          getInputData={this.props.getInputData}
          toggleSearchResultModal={this.props.toggleSearchResultModal}
          getAddressPredictions={this.props.getAddressPredictions}
          resultTypes={this.props.resultTypes}
          predictions={this.props.predictions}
          getSelectedAddress={this.props.getSelectedAddress}
          selectedAddress={this.props.selectedAddress}
        />
      }
      </Container>
    );
  }
}
export default Home;
