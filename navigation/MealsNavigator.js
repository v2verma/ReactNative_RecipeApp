import React from 'react';
import { Text, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../components/ruComponents/constants/color';

import Categories from '../screens/Categories';
import CategoryMeals from '../screens/CategoryMeals';
import MealDetail from '../screens/MealDetail';
import Favorites from '../screens/Favorites';
import FilterMeals from '../screens/FilterMeals';

const defaultStackNavOptions = {
	headerStyle: {
		// backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
		backgroundColor: Platform.OS === 'ios' ? '' : '',
		borderColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: 1,
		elevation: 0
		// height: 50
	},
	headerForceInset: { top: 'never', bottom: 'never' },
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		color: '#6C736F'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : '#6C736F'
};

const MealsNavigator = createStackNavigator(
	{
		Home: {
			screen: Categories
		},
		CategoryMeals: {
			screen: CategoryMeals
		},
		MealDetail: MealDetail
	},
	{
		mode: 'card',
		headerMode: 'screen',
		headerLayoutPreset: 'left',
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: Favorites,
		MealDetail: MealDetail
	},
	{
		mode: 'card',
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel:
				Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Home</Text> : 'Meals'
		}
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: 'Favorites!',
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-heart" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: `#45a16b`,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
				) : (
					'Favorites'
				)
		}
	}
};

const MealsTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true
				// barStyle: { borderColor: 'red', borderWidth: 2, borderRadius: 40 }
			})
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: 'open-sans'
					},
					activeTintColor: Colors.secondaryColor
				}
			});

const FilterNavigator = createStackNavigator(
	{
		Filters: FilterMeals
	},
	{
		mode: 'card',
		defaultNavigationOptions: defaultStackNavOptions
		// navigationOptions: {
		// 	drawerLabel: 'Filters'
		// }
	}
);

const MainNavigator = createDrawerNavigator(
	{
		// MealsFavs: { screen: MealsTabNavigator, navigationOptions: { drawerLabel: 'Meals' } },
		MealsFavs: { screen: MealsNavigator, navigationOptions: { drawerLabel: 'Meals' } },
		Filters: { screen: FilterNavigator }
	},
	{
		contentOptions: {
			// activeTintColor: Colors.secondaryColor,
			activeTintColor: '#161616',
			labelStyle: {
				fontFamily: 'open-sans'
			}
		}
	}
);

// export default createAppContainer(MealsNavigator);
export default createAppContainer(MainNavigator);
