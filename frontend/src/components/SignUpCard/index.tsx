import { Container } from "../WelcomeCard/styled";
import InputForm from "../InputForm";
import ButtonForm from "../ButtonForm";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Card, SignInContianer } from "./styled";

const SignUpCard = () => {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    boolean | null
  >(null);

  const submitHandler = () => {
    //validations
    nameRef.current?.value.length !== 0
      ? setNameError(true)
      : setNameError(false);

    emailRef.current?.value.length !== 0
      ? setEmailError(true)
      : setEmailError(false);

    passwordRef.current?.value.length !== 0
      ? setPasswordError(true)
      : setPasswordError(false);

    confirmPasswordRef.current?.value.length !== 0 ||
    confirmPasswordRef.current?.value === passwordRef.current?.value
      ? setConfirmPasswordError(true)
      : setConfirmPasswordError(false);
  };

  return (
    <Container>
      <Card>
        <h1>Sign up!</h1>
        <InputForm
          inputRef={nameRef}
          type="text"
          placeholder="name"
          hasEmpty={nameError}
        />
        <InputForm
          inputRef={emailRef}
          type="email"
          placeholder="e-mail"
          hasEmpty={emailError}
        />
        <InputForm
          inputRef={passwordRef}
          type="password"
          placeholder="password"
          hasEmpty={passwordError}
        />
        <InputForm
          inputRef={confirmPasswordRef}
          type="password"
          placeholder="confirm password"
          hasEmpty={confirmPasswordError}
        />
        <SignInContianer>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign Up</span>
        </SignInContianer>
        <ButtonForm onClick={submitHandler} />
      </Card>
    </Container>
  );
};

export default SignUpCard;
