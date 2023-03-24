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
  const [inputValues, setInputValues] = useState<any>([]);

  const titleRef = useRef(null);

  const answerRef = useRef(null);

  const createExamHandler = () => {
    console.log(inputValues);
  };

  const addOptionsHandler = () => {
    setInputs([...inputs, inputs]);
  };

  const saveOptionsHandler = (e: any) => {
    const value = e.target.value;
    setInputValues([...inputValues, value]);
  };

  return (
    <Backdrop>
      <Container>
        <ExitButton onClick={hiddenCard}>Sair</ExitButton>
        <InputForm type="text" placeholder="title" inputRef={titleRef} />

        <AddOptionsContainer>
          <InputForm
            type="text"
            placeholder="options"
            onChange={saveOptionsHandler}
          />
          <IconContainer>
            <GrAddCircle onClick={addOptionsHandler} />
          </IconContainer>
        </AddOptionsContainer>

        {inputs.map(() => (
          <AddOptionsContainer>
            <InputForm
              type="text"
              placeholder="options"
              onChange={saveOptionsHandler}
            />
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
