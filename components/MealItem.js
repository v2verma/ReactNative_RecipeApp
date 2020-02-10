import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';

import DefaultTextStyle from './ruComponents/constants/defaultTextStyle';

const MealItem = (props) => {
	return (
		<View style={styles.mealItem}>
			<TouchableOpacity onPress={props.onSelectMeal}>
				<View style={styles.mealRow}>
					<Image style={styles.bgImg} source={{ uri: props.mealDetail.imageUrl }} />
				</View>
			</TouchableOpacity>
			<View style={{ alignItems: 'center', height: '28%' }}>
				<View style={styles.mealDetail}>
					<View style={styles.titleContainer}>
						<Text numberOfLines={1} style={styles.title}>
							{props.mealDetail.title}
						</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ fontFamily: DefaultTextStyle.fontFamily, color: '#b8b8b8', fontSize: 12 }}>
							{props.mealDetail.duration}min
						</Text>
						<Text style={{ fontFamily: DefaultTextStyle.fontFamily, color: '#b8b8b8', fontSize: 12 }}>
							{props.mealDetail.complexity.toUpperCase()}
						</Text>
						<Text style={{ fontFamily: DefaultTextStyle.fontFamily, color: '#b8b8b8', fontSize: 12 }}>
							{props.mealDetail.affordability.toUpperCase()}
						</Text>
					</View>
				</View>
			</View>
			{/* </TouchableOpacity> */}
		</View>
	);
};

const styles = StyleSheet.create({
	mealItem: {
		height: 300,
		marginVertical: 15
	},
	titleContainer: {
		flexDirection: 'row',
		paddingVertical: 5
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'left'
	},
	mealRow: {
		height: '95%',
		borderRadius: 10,
		overflow: 'hidden'
		// elevation: 21
	},
	mealDetail: {
		top: -61,
		paddingHorizontal: 20,
		// justifyContent: 'space-between',
		// alignItems: 'center',
		height: '100%',
		backgroundColor: '#f3f3f3',
		width: '90%',
		borderRadius: 10,
		elevation: 21
	},
	bgImg: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end'
	}
});

export default MealItem;
