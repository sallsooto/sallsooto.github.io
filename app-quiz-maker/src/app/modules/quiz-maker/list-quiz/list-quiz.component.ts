import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QuizApiResponse } from 'src/app/model/quiz-question';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
  providers: [QuizQuestionService, HttpClient]
})
export class ListQuizComponent implements OnInit {

  @Input()
  category!: string;

  @Input()
  difficulty!: string;
  
  quizData!: QuizApiResponse;

  currentQuestionIndex: number = 0;

  selectedAnswers: string[] = [];

  constructor(private quizQuestionService: QuizQuestionService, private router: Router) {}

  selectedAnswerIndices: number[] = [];

  selectAnswer(answer: string, questionIndex: number) {
    this.selectedAnswers[questionIndex] = answer;
  }

  areAllQuestionsAnswered(): boolean {
    return this.selectedAnswers.length === this.quizData.results.length;
  }

  submitQuiz() {
    const queryParams = {
      quizData: JSON.stringify(this.quizData),
      userAnswers: JSON.stringify(this.selectedAnswers)
    };

    this.router.navigate(['/quiz-result'], { queryParams });
  }

  ngOnInit(): void {
    this.quizQuestionService.
      getQuizApiResponseByCategoryAndDifficulty(this.category,this.difficulty,5).
      subscribe(data=> {
        this.quizData = data;
      })
  }

}
