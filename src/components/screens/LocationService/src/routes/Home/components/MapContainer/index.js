import React from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import { Alert } from 'react-native';

import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import CurrentLocationButton from '../CurrentLocationButton';

import styles from './MapContainerStyles.js';

export const MapContainer = ({
  region,
  getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress
	}) => {
	const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  //console.log('selpick',selectedPickUp);

	return (
		<View style={styles.container}>

			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
        showsUserLocation

			>

      <MapView.Marker
      coordinate={region}
      pinColor="#ef0043"
      onDragEnd={() => Alert.alert('SearchLocationChanged')}

      draggable
      />




			</MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModal={toggleSearchResultModal}
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}
      />
      <CurrentLocationButton getCurrentLocation={getCurrentLocation} />
      { (resultTypes.pickUp) &&
			<SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress} />
			}

		</View>

    // { selectedPickUp &&
    //   <MapView.Marker
    //     coordinate={{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude}}
    //     pinColor='green'
    //
    //   />
    // }
    // { selectedDropOff &&
    //   <MapView.Marker
    //     coordinate={{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}}
    //     pinColor='blue'
    //
    //   />
    // }
    //
    // {
    //   nearByDrivers && nearByDrivers.map((marker, index)=>
    //     <MapView.Marker
    //       key={index}
    //       coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
    //       image={carMarker}
    //     />
    //   )
    // }


	);
};

export default MapContainer;
