import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableNativeFeedback,
	ImageBackground,
	Platform,
	StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default (CategoryGridTile = (props) => {
	let TouchableCmp = TouchableNativeFeedback;
	if (Platform.OS === 'ios') {
		TouchableCmp = TouchableOpacity;
	}

	return (
		<View style={styles.gridItem}>
			<TouchableCmp activeOpacity={0.7} style={{ flex: 1 }} onPress={props.onSelect}>
				<View style={{ ...styles.gridContainer, ...{ backgroundColor: props.color } }}>
					<ImageBackground style={styles.bgImg} source={{ uri: props.imgUrl }}>
						<LinearGradient
							colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.45)' ]}
						>
							<Text style={styles.title} numberOfLines={2}>
								{props.title}
							</Text>
						</LinearGradient>
					</ImageBackground>
				</View>
			</TouchableCmp>
		</View>
	);
});

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 12,
		height: 500,
		borderRadius: 10,
		overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
		elevation: 31
	},
	gridContainer: {
		flex: 1,
		borderRadius: 10,
		// padding: 15,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	title: {
		fontFamily: 'open-sans-bold',
		color: 'rgba(255,255,255,0.9)',
		fontSize: 16,
		height: 55,
		textAlign: 'center',
		textAlignVertical: 'center'
		// backgroundColor: 'rgba(0,0,0,0.7)'
	},
	bgImg: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end'
	}
});
