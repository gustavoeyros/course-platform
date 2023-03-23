import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ExamContainer,
  Backdrop,
  ExamCard,
  QuestionsContainer,
  IndividualQuestion,
} from "./styled";

interface IQuestions {
  answer: string;
  options: [];
  question: string;
  questionId: number;
  _id: string;
}

const CourseExam = () => {
  const [showExam, setShowExam] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "");
  const token = user.token;

  const getCourseById = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/course/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const questionsFromAPI = data.course.questions;
        setQuestions(questionsFromAPI);
        setIsLoading(false);
      });
  };

  const checkAnswer = (option: string, answer: string) => {
    if (option === answer) {
      console.log("acertou");
    } else {
      console.log("errou");
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);
  return (
    <>
      <ExamContainer>
        <h1 onClick={() => setShowExam(true)}>Realizar prova do curso</h1>
      </ExamContainer>

      {showExam ? (
        <Backdrop>
          <ExamCard>
            <span onClick={() => setShowExam(false)}>Close</span>
            {!isLoading ? (
              <QuestionsContainer>
                <h1>Questões</h1>
                {questions.map((data) => (
                  <IndividualQuestion key={data._id}>
                    <p>{data.question}</p>
                    {data.options.map((option) => (
                      <ul>
                        <li onClick={() => checkAnswer(option, data.answer)}>
                          {option}
                        </li>
                      </ul>
                    ))}
                  </IndividualQuestion>
                ))}
              </QuestionsContainer>
            ) : (
              ""
            )}
          </ExamCard>
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default CourseExam;
