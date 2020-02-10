import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
// import { MEALS } from '../data/dummy-data';
import DefaultTextStyle from '../components/ruComponents/constants/defaultTextStyle';
import { toggleFav } from '../store/actions/meal';

const ListItem = (props) => {
	return (
		<View style={styles.listItem}>
			<Text style={{ fontSize: 12, color: '#525151' }}> -{props.children}</Text>
		</View>
	);
};

export default (MealDetail = (props) => {
	const mealId = props.navigation.getParam('mealId');
	const availableMeals = useSelector((state) => state.meals.meals);
	const currentIsFavMeals = useSelector((state) => state.meals.favoriteMeals.some((meal) => meal.id === mealId));

	const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
	const dispatch = useDispatch();

	const handleToggleFav = useCallback(
		() => {
			dispatch(toggleFav(mealId));
		},
		[ dispatch, mealId ]
	);

	useEffect(
		() => {
			// props.navigation.setParams({ mealTitle: selectedMeal.title });
			props.navigation.setParams({ toogleFav: handleToggleFav });
		},
		// [ selectedMeal ]
		[ handleToggleFav ]
	);
	useEffect(
		() => {
			props.navigation.setParams({ isFav: currentIsFavMeals });
		},
		[ currentIsFavMeals ]
	);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.img} />
			<View style={styles.detailsContainer}>
				<View style={{ flexDirection: 'row', padding: 20 }}>
					<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{selectedMeal.title}</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						paddingHorizontal: 20,
						justifyContent: 'space-between'
					}}
				>
					<Text style={{ fontFamily: DefaultTextStyle.fontFamily, color: '#525151' }}>
						{selectedMeal.duration} min
					</Text>
					<Text style={{ fontFamily: DefaultTextStyle.fontFamily, color: '#525151' }}>
						{selectedMeal.complexity.toUpperCase()}
					</Text>
					<Text style={{ fontFamily: DefaultTextStyle.fontFamily, color: '#525151' }}>
						{selectedMeal.affordability.toUpperCase()}
					</Text>
				</View>
				<View style={styles.lineStyle} />
				<View style={{ paddingVertical: 15 }}>
					<Text style={styles.title}>Ingredients</Text>
					{selectedMeal.ingredients.map((ingredient, index) => {
						return <ListItem key={index}>{ingredient}</ListItem>;
					})}
				</View>
				<View>
					<Text style={styles.title}>Steps</Text>
					{selectedMeal.steps.map((step, index) => {
						return <ListItem key={index}>{step}</ListItem>;
					})}
				</View>
			</View>
		</ScrollView>
	);
});

MealDetail.navigationOptions = (navigationData) => {
	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const toggleFavorite = navigationData.navigation.getParam('toogleFav');
	const isFavorites = navigationData.navigation.getParam('isFav');
	return {
		// headerTitle: mealTitle,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item title="Favorite" iconName={isFavorites ? 'star' : 'star-outlined'} onPress={toggleFavorite} />
			</HeaderButtons>
		),
		headerTransparent: true,
		headerTintColor: 'white',
		headerTitleStyle: {
			fontSize: 18,
			color: 'white'
		}
	};
};

const styles = StyleSheet.create({
	lineStyle: {
		borderWidth: 1,
		borderColor: 'gray',
		margin: 15
	},
	detailsContainer: {
		top: -17,
		borderRadius: 21,
		backgroundColor: 'white'
	},
	img: {
		width: '100%',
		height: 500
	},
	title: {
		fontFamily: 'open-sans',
		fontSize: 16,
		textAlign: 'left',
		marginHorizontal: 20,
		fontWeight: 'bold'
	},
	listItem: {
		marginVertical: 0,
		marginHorizontal: 21,
		paddingVertical: 10
	}
});
