export const TOGGLE_FAV = 'TOGGLE_FAV';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFav = (mealId) => {
	return {
		type: TOGGLE_FAV,
		payload: mealId
	};
};

export const setFilters = (filterSettings) => {
	return {
		type: SET_FILTERS,
		payload: filterSettings
	};
};
