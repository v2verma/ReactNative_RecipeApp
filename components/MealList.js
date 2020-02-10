import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

const MealList = (props) => {
	const favMeals = useSelector((state) => state.meals.favoriteMeals);

	const renderMealItem = (itemData) => {
		const isFav = favMeals.some((meal) => meal.id === itemData.item.id);
		return (
			<MealItem
				mealDetail={itemData.item}
				onSelectMeal={() => {
					props.navigation.navigate('MealDetail', {
						mealId: itemData.item.id,
						mealTitle: itemData.item.title,
						isFav: isFav
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.list}>
			<FlatList
				style={{ width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}
				keyExtractor={(item, index) => item.id}
				data={props.currentMeals}
				renderItem={renderMealItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5'
	}
});

export default MealList;
