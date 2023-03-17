import { Container, Card, SignUpContainer } from "./styled";
import InputForm from "../InputForm";
import ButtonForm from "../ButtonForm";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeCard = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    if (emailRef.current) {
      emailRef.current.value.length !== 0
        ? setEmailError(true)
        : setEmailError(false);
    }
    if (passwordRef.current) {
      passwordRef.current.value.length !== 0
        ? setPasswordError(true)
        : setPasswordError(false);
    }
    const data = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    if (
      emailRef.current?.value.length !== 0 &&
      passwordRef.current?.value.length !== 0
    ) {
      fetch("http://localhost:3000/users/login", {
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
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/home");
          }
        });
    }
  };
  return (
    <Container>
      <Card>
        <h1>Welcome!</h1>
        <InputForm
          inputRef={emailRef}
          type="text"
          placeholder="e-mail"
          hasEmpty={emailError}
        />
        <InputForm
          inputRef={passwordRef}
          type="password"
          placeholder="password"
          hasEmpty={passwordError}
        />
        <SignUpContainer>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </SignUpContainer>
        <ButtonForm onClick={submitHandler}>Sign In</ButtonForm>
      </Card>
    </Container>
  );
};

export default WelcomeCard;
