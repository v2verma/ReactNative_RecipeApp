import { MEALS } from '../../data/dummy-data';
import { toggleFav, setFilters, TOGGLE_FAV, SET_FILTERS } from '../actions/meal';

const intialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: []
};

const mealReducer = (state = intialState, action) => {
	switch (action.type) {
		case TOGGLE_FAV:
			const existingIndex = state.favoriteMeals.findIndex((meal) => meal.id === action.payload);
			if (existingIndex >= 0) {
				const updatedMeals = [ ...state.favoriteMeals ];
				updatedMeals.splice(existingIndex, 1);
				return { ...state, favoriteMeals: updatedMeals };
			} else {
				const meal = state.meals.find((meal) => meal.id === action.payload);
				return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
			}
		case SET_FILTERS:
			const appliedFilters = action.payload;
			const updatedFilteredMeals = state.meals.filter((meal) => {
				if (appliedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (appliedFilters.vegan && !meal.isVegan) {
					return false;
				}
				if (appliedFilters.vegetarian && !meal.isVegetarian) {
					return false;
				}
				return true;
			});
			return { ...state, filteredMeals: updatedFilteredMeals };
		default:
			return state;
	}
};

export default mealReducer;
