import { InputStyled } from "./styled";

interface IInput {
  type: string;
  placeholder: string;
  hasEmpty?: boolean | null | undefined;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: any;
}

const InputForm = ({
  type,
  placeholder,
  hasEmpty,
  inputRef,
  onChange,
  value,
}: IInput) => {
  return (
    <InputStyled
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      hasEmpty={hasEmpty}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputForm;
