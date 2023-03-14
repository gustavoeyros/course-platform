import { Container, Card } from "./styled";
import InputForm from "../InputForm";

const WelcomeCard = () => {
  return (
    <Container>
      <Card>
        <h1>Welcome!</h1>
        <InputForm type="text" placeholder="username" />
        <InputForm type="password" placeholder="password" />
      </Card>
    </Container>
  );
};

export default WelcomeCard;
