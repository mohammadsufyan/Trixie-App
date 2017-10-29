import React from 'react';
import { Text } from 'react-native';
import { View, List, ListItem, Body } from 'native-base';
import styles from './SearchResultsStyles.js';

export const SearchResults = ({ predictions, getSelectedAddress }) => {
	function handleSelectedAddress(placeID){
		getSelectedAddress(placeID)
	}

		return (
			<View style={styles.searchResultsWrapper} >
				<List
					dataArray={predictions}
					renderRow={(item) =>
						<View>
							<ListItem
								onPress={() => {
									handleSelectedAddress(item.placeID);
								}
							}
							button
							>

								<Body>
									<Text style={styles.primaryText}>{item.primaryText}</Text>
									<Text style={styles.secondaryText}>{item.secondaryText}</Text>
								</Body>
							</ListItem>
						</View>
					}
				/>
			</View>

		);
};

export default SearchResults;
