import { Backdrop, Container } from "./styled";
import InputForm from "../InputForm";
import { useRef } from "react";

interface ICreateExam {
  hiddenCard: () => void;
}

const CreateExam = ({ hiddenCard }: ICreateExam) => {
  const titleRef = useRef(null);
  const optionsRef = useRef(null);
  const answerRef = useRef(null);
  return (
    <Backdrop>
      <Container>
        <span onClick={hiddenCard}>Sair</span>
        <InputForm type="text" placeholder="title" inputRef={titleRef} />
        <InputForm type="text" placeholder="options" inputRef={titleRef} />
        <InputForm type="text" placeholder="answer" inputRef={answerRef} />
        <button>Send exam</button>
      </Container>
    </Backdrop>
  );
};

export default CreateExam;
