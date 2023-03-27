import {
  Backdrop,
  Container,
  ExitButton,
  SendButton,
  AddOptionsContainer,
  IconContainer,
} from "./styled";
import InputForm from "../InputForm";
import { useEffect, useRef, useState } from "react";
import { GrAddCircle } from "react-icons/gr";

interface ICreateExam {
  hiddenCard: () => void;
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateExam = ({ hiddenCard, setQuestions }: ICreateExam) => {
  const [inputs, setInputs] = useState<any>([{}]);
  const titleRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<any>([]);
  const [exam, setExam] = useState<any>([]);

  const handleInputChange = (index: any, event: any) => {
    const values = [...inputs];
    values[index] = event.target.value;
    setInputs(values);
  };

  const handleAddInput = () => {
    const values = [...inputs];
    values.push({ value: "" });
    setInputs(values);
  };

  const createExamHandler = () => {
    const examCourse = {
      questionId: exam.length,
      question: titleRef.current?.value,
      options: inputs,
      answer: answerRef.current?.value,
    };

    setExam((prevExam: []) => [...prevExam, examCourse]);
    console.log(exam);
    setInputs([{}]);
    titleRef.current!.value = "";
    answerRef.current!.value = "";
    optionsRef.current.forEach((ref: any) => (ref.value = ""));
  };

  useEffect(() => {
    setQuestions(exam);
  }, [exam]);

  return (
    <Backdrop>
      <Container>
        <ExitButton onClick={hiddenCard}>End exam</ExitButton>
        <InputForm type="text" placeholder="title" inputRef={titleRef} />

        {inputs.map((input: any, index: any) => (
          <AddOptionsContainer>
            <InputForm
              type="text"
              placeholder="options"
              value={input.value}
              inputRef={(ref: any) => (optionsRef.current[index] = ref)}
              onChange={(event) => handleInputChange(index, event)}
            />
            <IconContainer>
              <GrAddCircle onClick={handleAddInput} />
            </IconContainer>
          </AddOptionsContainer>
        ))}

        <InputForm type="text" placeholder="answer" inputRef={answerRef} />
        <SendButton onClick={createExamHandler}>Save exam</SendButton>
      </Container>
    </Backdrop>
  );
};

export default CreateExam;
