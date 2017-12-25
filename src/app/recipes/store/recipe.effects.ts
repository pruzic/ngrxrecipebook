
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import { Actions, Effect } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers'

@Injectable()
export class RecipeEffects {
    
    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return  this.httpClient.get<Recipe[]>('https://ng-recipe-book-9877b.firebaseio.com/recipe-book.json', {
            observe: 'body',
            responseType: 'json'
          })
        }
     )
    .map(
      (recipes) => {
        // console.log('Insdie MAP');
        // tslint:disable-next-line:prefer-const
        for (let recipe of recipes) {
            if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
            }
        }
        return {           
            type: RecipeActions.SET_RECIPES,
            payload: recipes
        };
      }
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
        // tslint:disable-next-line:max-line-length
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-9877b.firebaseio.com/recipe-book.json', state.recipes, {reportProgress: true});
    return this.httpClient.request(req);
    })

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
               private store: Store<fromRecipe.FeatureState>) {}

}
