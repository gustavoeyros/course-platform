import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExamContainer, Backdrop, ExamCard } from "./styled";

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
            {isLoading ? <h1>Questões</h1> : ""}
          </ExamCard>
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default CourseExam;
