import { ButtonStyled } from "./styled";

interface IButtonForm {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const ButtonForm = ({ onClick, children }: IButtonForm) => {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

export default ButtonForm;
