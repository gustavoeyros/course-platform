import { Container, Card } from "./styled";
import InputForm from "../InputForm";
import ButtonForm from "../ButtonForm";
import { useRef, useState, useSyncExternalStore } from "react";

const WelcomeCard = () => {
  const [emailError, setEmailError] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    /*  if (emailError.current) {
      emailError.current.value.length !== 0
        ? setEmailError(true)
        : setEmailError(false);
    } */
    const data = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
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
        console.log(data);
      });
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
        <ButtonForm onClick={submitHandler} />
      </Card>
    </Container>
  );
};

export default WelcomeCard;
