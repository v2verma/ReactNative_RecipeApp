import React from 'react';
import { View, FlatList, BlurView, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';

import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../components/ruComponents/constants/color';

export default (Categories = (props) => {
	const renderGridItem = (itemData) => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				imgUrl={itemData.item.imgUrl}
				color={itemData.item.color}
				onSelect={() => {
					props.navigation.navigate('CategoryMeals', { categoryId: itemData.item.id });
				}}
			/>
		);
	};

	return (
		<View style={{ backgroundColor: '#f5f5f5' }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => item.id}
				data={CATEGORIES}
				renderItem={renderGridItem}
				numColumns={1}
			/>
		</View>
	);
});

Categories.navigationOptions = (navData) => {
	return {
		headerTitle: 'Categories',
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
