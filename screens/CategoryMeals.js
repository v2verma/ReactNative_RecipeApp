import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultTextStyle from '../components/ruComponents/constants/defaultTextStyle';

export default (CategoryMeals = (props) => {
	const catgId = props.navigation.getParam('categoryId');

	const availableMeals = useSelector((state) => state.meals.filteredMeals);

	const currentMeals = availableMeals.filter((meal) => meal.categoryIds.indexOf(catgId) >= 0);

	if (currentMeals.length === 0) {
		return (
			<View style={styles.root}>
				<Text style={{ fontFamily: DefaultTextStyle.fontFamily }}>No meals found, check your filters!</Text>
			</View>
		);
	} else {
		return <MealList currentMeals={currentMeals} navigation={props.navigation} />;
	}
});

CategoryMeals.navigationOptions = (navigationData) => {
	const catgId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find((catg) => catg.id === catgId);

	return {
		headerTitle: selectedCategory.title
	};
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
