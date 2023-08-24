export interface QuizQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
    user_answer: string;
  }
  
export interface QuizApiResponse {
    response_code: number;
    results: QuizQuestion[];
  }