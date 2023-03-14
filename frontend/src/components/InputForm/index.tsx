import { InputStyled } from "./styled";

interface IInput {
  type: string;
  placeholder: string;
}

const InputForm = ({ type, placeholder }: IInput) => {
  return <InputStyled type={type} placeholder={placeholder} />;
};

export default InputForm;
