import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultTextStyle from '../components/ruComponents/constants/defaultTextStyle';
// import { MEALS } from '../data/dummy-data';

export default (Favorites = (props) => {
	const favMeals = useSelector((state) => state.meals.favoriteMeals);

	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.root}>
				<Text style={{ fontFamily: DefaultTextStyle.fontFamily }}>
					No favorites meals found. Start adding some!!
				</Text>
			</View>
		);
	} else {
		return <MealList currentMeals={favMeals} navigation={props.navigation} />;
	}
});

Favorites.navigationOptions = (navData) => {
	return {
		headerTitle: 'Yours Favorites',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
