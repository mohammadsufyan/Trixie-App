import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './actions/actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export class Main extends Component {

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.containerView}>
          <TouchableOpacity onPress={() => this.props.getUser('fb_103')}>
            <Text>{`Hello-World ${this.props.userData.user.name ? this.props.userData.user.name : ''}`}</Text>
            {this.props.userData.isFetching && <Text>{'Fetching data'}</Text>}
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

function mapStateToProps (state) {
  return {
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: (facebook_id) => dispatch(getUser(facebook_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
