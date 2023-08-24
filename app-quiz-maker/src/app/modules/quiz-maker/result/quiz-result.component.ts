// quiz-result.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizApiResponse } from 'src/app/model/quiz-question';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  providers: [ ]
})
export class QuizResultComponent implements OnInit {
  quizData!: QuizApiResponse;
  userAnswers!: string[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quizData = JSON.parse(params['quizData']);
      this.userAnswers = JSON.parse(params['userAnswers']);
    });
  }

  getAnswerClass(questionIndex: number, answer: string): string {
    if (answer === this.quizData.results[questionIndex].correct_answer) {
      return 'correct-answer';
    } else if (this.userAnswers[questionIndex] === answer) {
      return 'wrong-answer';
    }
    return '';
  }

  calculateScore(): number {
    let correctAnswers = 0;
    for (let i = 0; i < this.quizData.results.length; i++) {
      if (this.userAnswers[i] === this.quizData.results[i].correct_answer) {
        correctAnswers++;
      }
    }
    return correctAnswers;
  }

  getColorClass(score: number): string {
    if (score <= 1) {
      return 'red-score';
    } else if (score <= 3) {
      return 'yellow-score';
    } else {
      return 'green-score';
    }
  }

  navigateToCreateQuiz(): void {
    this.router.navigate(['/']);
  }
}
