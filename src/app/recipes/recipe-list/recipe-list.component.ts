import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';


import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
             private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    console.log('inside recipeList ngOnInit');
    this.recipesState = this.store.select('recipes');
    
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}