import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { QuizApiResponse } from '../model/quiz-question';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {

  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  private shuffleArray(array: string[]): string[] {
    // Implementation of Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getQuizApiResponseByCategoryAndDifficulty(category: string, difficulty: string, amount: number): Observable<QuizApiResponse> {
    const url = `${this.apiUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<QuizApiResponse>(url).pipe(
      map(response => {
        // Shuffle the answers for each question and store in 'answers' property
        response.results.forEach(question => {
          question.answers = this.shuffleArray([...question.incorrect_answers, question.correct_answer]);
        });
        return response;
      })
    );
  }
}
