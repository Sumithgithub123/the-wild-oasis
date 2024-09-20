import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical, { StyledLoginForm } from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { islogin, loginapi } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password)
      loginapi(
        { email, password },
        {
          onSettled: () => {
            setEmail("");
            setPassword("");
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <StyledLoginForm>
        <FormRowVertical label="Email address">
          <Input
            required
            type="email"
            id="email"
            disabled={islogin}
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            required
            type="password"
            id="password"
            disabled={islogin}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button disabled={islogin} size="large">
            {islogin ? <SpinnerMini /> : "Login"}
          </Button>
        </FormRowVertical>
      </StyledLoginForm>
    </Form>
  );
}

export default LoginForm;
