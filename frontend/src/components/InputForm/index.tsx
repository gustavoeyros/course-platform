import { InputStyled } from "./styled";

interface IInput {
  type: string;
  placeholder: string;
  hasEmpty?: boolean | null | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
}

const InputForm = ({ type, placeholder, hasEmpty, inputRef }: IInput) => {
  return (
    <InputStyled
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      hasEmpty={hasEmpty}
    />
  );
};

export default InputForm;
