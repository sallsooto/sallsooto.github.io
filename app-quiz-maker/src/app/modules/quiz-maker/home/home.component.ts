import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Difficulty } from 'src/app/enums/difficulty.enum';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ListQuizComponent } from "../list-quiz/list-quiz.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    providers: [CategoryService, HttpClient],
    imports: [FormsModule, RouterModule, HttpClientModule, CommonModule, ListQuizComponent]
})
export class HomeComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  allCategories: Category[] = [];

  difficultyLevels: string[] = Object.values(Difficulty);

  categorySelect: string = ""
  difficultySelect: string = ""
  showListQuiz: boolean = false

  getCategories() {
    this.categoryService.getCategories().subscribe(data => { this.allCategories = data.trivia_categories })
  }

  getListQuiz() {
    if(this.categorySelect.length>0 && this.difficultySelect.length>0){
      this.showListQuiz = true
    }
    else  
      this.showListQuiz = false
  }

  ngOnInit(): void {
    this.getCategories()
  }
}
