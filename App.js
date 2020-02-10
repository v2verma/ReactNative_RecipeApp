import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealReducer from './store/reducers/meal';

enableScreens();
const rootReducer = combineReducers({
	meals: mealReducer
});
const store = createStore(rootReducer);

const fetchFonts = async () => {
	await Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [ fontLoaded, setFontLoaded ] = useState(false);

	if (!fontLoaded) {
		return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={fetchFonts} />;
	}

	return (
		<Provider store={store}>
			<View style={styles.container}>
				<StatusBar barStyle="dark-content" backgroundColor="white" />
				<MealsNavigator />
			</View>
		</Provider>
	);
}

// StatusBar.setBackgroundColor('red', true);

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
