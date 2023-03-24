import {
  Backdrop,
  Container,
  ExitButton,
  SendButton,
  AddOptionsContainer,
  IconContainer,
} from "./styled";
import InputForm from "../InputForm";
import { useRef, useState } from "react";
import { GrAddCircle } from "react-icons/gr";

interface ICreateExam {
  hiddenCard: () => void;
}

const CreateExam = ({ hiddenCard }: ICreateExam) => {
  const [inputs, setInputs] = useState<any>([]);
  const titleRef = useRef(null);
  const optionsRef = useRef(null);
  const answerRef = useRef(null);

  const createExamHandler = () => {};

  const addOptionsHandler = () => {
    setInputs([...inputs, inputs]);
  };

  return (
    <Backdrop>
      <Container>
        <ExitButton onClick={hiddenCard}>Sair</ExitButton>
        <InputForm type="text" placeholder="title" inputRef={titleRef} />

        <AddOptionsContainer>
          <InputForm type="text" placeholder="options" inputRef={titleRef} />
          <IconContainer>
            <GrAddCircle onClick={addOptionsHandler} />
          </IconContainer>
        </AddOptionsContainer>

        {inputs.map(() => (
          <AddOptionsContainer>
            <InputForm type="text" placeholder="options" inputRef={titleRef} />
            <IconContainer>
              <GrAddCircle onClick={addOptionsHandler} />
            </IconContainer>
          </AddOptionsContainer>
        ))}

        <InputForm type="text" placeholder="answer" inputRef={answerRef} />
        <SendButton onClick={createExamHandler}>Send exam</SendButton>
      </Container>
    </Backdrop>
  );
};

export default CreateExam;
