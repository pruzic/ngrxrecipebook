
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
   recipes: Recipe[];
 }
 const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe 1', 'This is simply a test',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlIAeL3h0ZXldD7Zqsu5qVv5aPsaVjY5Hd4cPUcaF3h5ZvA4A6Q',
         [
           new Ingredient('Pork meat', 1),
           new Ingredient('Beef meat', 2)
          ]),
         new Recipe('A Test Recipe 2', 'This is simply a test 2',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2eUWCBUDvzCcVp9RByO6BauiXdaHRqfCcM-JmbrlbiI9wgNIZMQ',
        [
          new Ingredient('Lamb meat', 3),
          new Ingredient('Chicken', 3)
        ])
      ]
 };

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {

    switch ( action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe, 
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
        default: 
            return state;
    }

}
