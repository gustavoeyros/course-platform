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

    confirmPasswordRef.current?.value != passwordRef.current?.value
      ? setConfirmPasswordError(true)
      : setConfirmPasswordError(false);

    //request
    if (
      nameRef.current?.value.length !== 0 &&
      emailRef.current?.value.length !== 0 &&
      passwordRef.current?.value.length !== 0 &&
      confirmPasswordRef.current?.value.length !== 0
    ) {
      const data = {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        confirmpassword: confirmPasswordRef.current?.value,
      };

      fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          navigate("/");
          console.log(data);
        });
    }
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
        <ButtonForm onClick={submitHandler}>Sign Up</ButtonForm>
      </Card>
    </Container>
  );
};

export default SignUpCard;
