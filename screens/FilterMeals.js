import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../components/ruComponents/constants/color';
import { setFilters } from '../store/actions/meal';

const FilterSwitch = (props) => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
				value={props.state}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

export default (FilterMeals = (props) => {
	const { navigation } = props;
	const [ isGlutenFree, setIsGlutenFree ] = useState(false);
	const [ isLactoseFree, setIsLactoseFree ] = useState(false);
	const [ isVegan, setIsVegan ] = useState(false);
	const [ isVegitarian, setIsVegitarian ] = useState(false);

	const dispatch = useDispatch();

	const saveFilters = useCallback(
		() => {
			const appliedFilters = {
				glutenFree: isGlutenFree,
				lactoseFree: isLactoseFree,
				vegan: isVegan,
				vegitarian: isVegitarian
			};
			dispatch(setFilters(appliedFilters));
		},
		[ isGlutenFree, isLactoseFree, isVegan, isVegitarian, dispatch ]
	);

	useEffect(
		() => {
			navigation.setParams({ save: saveFilters });
		},
		[ saveFilters ]
	);

	return (
		<View style={styles.root}>
			<Text style={styles.title}>Filter By</Text>
			<FilterSwitch label="Gluten-free" state={isGlutenFree} onChange={(newValue) => setIsGlutenFree(newValue)} />
			<FilterSwitch
				label="Lactose-free"
				state={isLactoseFree}
				onChange={(newValue) => setIsLactoseFree(newValue)}
			/>
			<FilterSwitch label="Vegan" state={isVegan} onChange={(newValue) => setIsVegan(newValue)} />
			<FilterSwitch label="Vegetarian" state={isVegitarian} onChange={(newValue) => setIsVegitarian(newValue)} />
		</View>
	);
});

FilterMeals.navigationOptions = (navData) => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName="menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item title="Save" iconName="save" onPress={navData.navigation.getParam('save')} />
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'flex-start'
	},
	filterContainer: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 15,
		paddingHorizontal: 20
	},
	title: {
		// fontFamily: 'open-sans-bold',
		fontSize: 20,
		margin: 20,
		textAlign: 'center'
	}
});
