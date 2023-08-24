import { Routes } from "@angular/router";
import { HomeComponent } from "../modules/quiz-maker/home/home.component";
import { QuizResultComponent } from "../modules/quiz-maker/result/quiz-result.component";

export default [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'quiz-result',
        component: QuizResultComponent
    },
    {
        path:'',
        redirectTo:'home', pathMatch: 'full'
    }
]as Routes