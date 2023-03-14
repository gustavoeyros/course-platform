import { ButtonStyled } from "./styled";

interface IButtonForm {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonForm = ({ onClick }: IButtonForm) => {
  return <ButtonStyled onClick={onClick}>Sign In</ButtonStyled>;
};

export default ButtonForm;
