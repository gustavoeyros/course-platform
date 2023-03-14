import { Container, Card } from "./styled";
import InputForm from "../InputForm";
import ButtonForm from "../ButtonForm";
import { useRef, useState, useSyncExternalStore } from "react";

const WelcomeCard = () => {
  const [usernameError, setUsernameError] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    if (usernameRef.current) {
      usernameRef.current.value.length !== 0
        ? setUsernameError(true)
        : setUsernameError(false);
    }
  };
  return (
    <Container>
      <Card>
        <h1>Welcome!</h1>
        <InputForm
          type="text"
          placeholder="username"
          hasEmpty={usernameError}
        />
        <InputForm
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
