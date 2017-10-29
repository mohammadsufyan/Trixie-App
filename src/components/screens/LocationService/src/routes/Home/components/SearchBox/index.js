import React from 'react';
import { Text } from 'react-native';
import { View, InputGroup, Input } from 'native-base';

import styles from './SearchBoxStyles.js';

export const SearchBox = ({
	getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	selectedAddress
}) => {
	const { selectedPickUp} = selectedAddress || {};
	function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
		getAddressPredictions();
	}

		return(
			<View style={styles.searchBox}>
				<View style={styles.inputWrapper}>

					<InputGroup>
						<Input
							onFocus={() => toggleSearchResultModal('pickUp')}
							style={styles.inputSearch}
							placeholder='Search'
							onChangeText={handleInput.bind(this, 'pickUp')}
							

						/>

					</InputGroup>
				</View>

			</View>

		);
};

export default SearchBox;
