import { InputStyled } from "./styled";

interface IInput {
  type: string;
  placeholder: string;
  hasEmpty?: boolean | null | undefined;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputForm = ({
  type,
  placeholder,
  hasEmpty,
  inputRef,
  onChange,
}: IInput) => {
  return (
    <InputStyled
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      hasEmpty={hasEmpty}
      onChange={onChange}
    />
  );
};

export default InputForm;
