import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Entypo } from '@expo/vector-icons';

import Colors from '../components/ruComponents/constants/color';

const CustomHeaderButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Entypo}
			iconSize={23}
			/* color={Platform.OS === 'ios' ? Colors.primaryColor : 'white'} */
			color={Platform.OS === 'ios' ? Colors.primaryColor : '#587262'}
		/>
	);
};

export default CustomHeaderButton;
