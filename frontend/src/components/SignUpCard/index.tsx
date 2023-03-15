import { Container } from "../WelcomeCard/styled";
import InputForm from "../InputForm";
import ButtonForm from "../ButtonForm";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Card, SignInContianer } from "./styled";

const SignUpCard = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card>
        <h1>Sign up!</h1>
        <InputForm type="text" placeholder="name" />
        <InputForm type="email" placeholder="e-mail" />
        <InputForm type="password" placeholder="password" />
        <InputForm type="password" placeholder="confirm password" />
        <SignInContianer>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign Up</span>
        </SignInContianer>
        <ButtonForm onClick={() => ""} />
      </Card>
    </Container>
  );
};

export default SignUpCard;
