import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions/actions';


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
          <TouchableOpacity onPress={() => this.props.fetchData()}>
            <Text>{`Hello-World ${this.props.appData.data.feed ? this.props.appData.data.feed.entry.length : 0}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
