import { useState } from "react";
import { ExamContainer, Backdrop, ExamCard } from "./styled";
const CourseExam = () => {
  const [showExam, setShowExam] = useState<boolean | null>(null);
  return (
    <>
      <ExamContainer>
        <h1 onClick={() => setShowExam(true)}>Realizar prova do curso</h1>
      </ExamContainer>

      {showExam ? (
        <Backdrop>
          <ExamCard>
            <span onClick={() => setShowExam(false)}>Close</span>
          </ExamCard>
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default CourseExam;
