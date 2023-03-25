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
  const [inputs, setInputs] = useState<any>([{}]);

  const titleRef = useRef(null);

  const answerRef = useRef(null);

  const handleInputChange = (index: any, event: any) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  const handleAddInput = () => {
    const values = [...inputs];
    values.push({ value: "" });
    setInputs(values);
  };

  const createExamHandler = () => {
    console.log(inputs);
  };

  return (
    <Backdrop>
      <Container>
        <ExitButton onClick={hiddenCard}>Sair</ExitButton>
        <InputForm type="text" placeholder="title" inputRef={titleRef} />

        {inputs.map((input: any, index: any) => (
          <AddOptionsContainer>
            <InputForm
              type="text"
              placeholder="options"
              value={input.value}
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
