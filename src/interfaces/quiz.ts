export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}
export interface IQuiz {
  _id?: string;
  title: string;
  description: string;
  subject: string;
  semester: string;
  totalMarks: number;
  createdBy?: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}
export interface QuizCardProps {
  quiz: IQuiz;
}
