import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// const emailpattern = /\S+@\S+\.\S+/;

function SignupForm() {
  const { issignup, signupapi } = useSignUp();
  const { handleSubmit, reset, register, formState } = useForm();
  const { errors } = formState;

  function onsubmit(data) {
    signupapi(data, {
      onSuccess: () => {
        reset();
      },
    });
    // console.log(data);
  }
  function onerror() {}
  return (
    <Form onSubmit={handleSubmit(onsubmit, onerror)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={issignup}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This Field Is Required." })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={issignup}
          type="email"
          id="email"
          {...register("email", {
            required: "This Field Is Required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email should be like this - example@gmail.com",
            },
            // validate: (value) => {
            //   if (!emailpattern.test(value)) {
            //     return "Email should be like this - example@gmail.com";
            //   }
            // },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={issignup}
          type="password"
          id="password"
          {...register("password", {
            required: "This Field Is Required.",
            minLength: {
              value: 8,
              message: "Password must contain atleast 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={issignup}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value, formvalues) => {
              if (value !== formvalues.password) {
                return "Password does not match!";
              }
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={issignup}
          onClick={() => reset()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={issignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
