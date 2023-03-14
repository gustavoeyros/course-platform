import { InputStyled } from "./styled";

interface IInput {
  type: string;
  placeholder: string;
  hasEmpty: boolean | null | undefined;
}

const InputForm = ({ type, placeholder, hasEmpty }: IInput) => {
  return (
    <InputStyled type={type} placeholder={placeholder} hasEmpty={hasEmpty} />
  );
};

export default InputForm;
