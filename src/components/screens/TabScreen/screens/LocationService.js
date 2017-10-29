import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
// import { checkPermission } from 'react-native-android-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';

class LocationService extends Component {
  state={
    latitude: null,
    longitude: null,
    error: null,
  }

  componentDidMount() {
    checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
      console.log("Already Granted!");
      console.log(result);
    }, (result) => {
      console.log("Not Granted!");
      console.log(result);
    });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
          console.log('Yesss', coords);
          const { latitude, longitude } = coords;
          this.setState({
              latitude: coords.latitude,
              longitude: coords.longitude,
              error: null,
            });
      },
      (error) => console.log('Noo', error),
    );
  }

  async locationAction() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Persmission title',
        'message': 'Permission msg'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Do location action")
    } else {
      console.log("Do non-location thing")
    }
  } catch (err) {
    console.warn(err)
  }
}


  render() {
    const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    const placetypes = ['(cities)','accounting' ,'airport', 'amusement_park', 'aquarium', 'art_gallery','atm,bakery','bank','bar','beauty_salon','bicycle_store','book_store','bowling_alley','bus_station','cafe','campground','car_dealer','car_rental','car_repair','car_wash','casino','cemetery','church','city_hall','clothing_store','convenience_store','courthouse','dentist','department_store','doctor,electrician','electronics_store','embassy','fire_station','florist','funeral_home','furniture_store','gas_station','gym','hair_care','hardware_store','hindu_temple','home_goods_store','hospital','insurance_agency','jewelry_store','laundry','lawyer','library','liquor_store','local_government_office','locksmith','lodging','meal_delivery','meal_takeaway','mosque','movie_rental','movie_theater','moving_company','museum','night_club','park','parking','pet_store','pharmacy','physiotherapist','restaurant','school','shoe_store','shopping_mall','spa','stadium','store','taxi_stand','train_station','travel_agency','university','veterinary_care','zoo'];
    const latilng = {latitude: this.state.latitude, longitude: this.state.longitude};
    const CURR = {
  lat: this.state.latitude,
  lng: this.state.longitude
};
Geocoder.geocodePosition(CURR).then(res => {
    console.log('res',res);
})

    console.log('latlng',latilng);
    return (

      <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed='auto'
            fetchDetails
            onPress={(data, details) => {
            }}
            onChangeText={(location) => this.setState({ location })}
            query={{
              key: 'AIzaSyAAPrL5tvvgPddMWKmtElDcTFEh56JvWn4',
              language: 'en',
              types: placetypes,
              componentRestrictions: {country: "in"},
            }}
            styles={{
                      textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth:0
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      },
                    }}
            currentLocation={true}
            nearbyPlacesAPI='GooglePlacesSearch'
            GoogleReverseGeocodingQuery={{
              key: 'AIzaSyAAPrL5tvvgPddMWKmtElDcTFEh56JvWn4',
              latlng: latilng,
       }}

            GooglePlacesSearchQuery={{

                   rankby: 'distance',
                   types: '(cities)',

                 }}
                 filterReverseGeocodingByTypes={placetypes}
                  predefinedPlaces={[homePlace, workPlace ]}

          />
    );
  }
}


export default LocationService;
