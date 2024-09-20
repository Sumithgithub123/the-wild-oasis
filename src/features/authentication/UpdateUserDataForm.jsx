import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateuser } from "./useUpdateuser";

function UpdateUserDataForm() {
  const { isupdateuser, updateuserapi } = useUpdateuser();
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentavatar },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(currentavatar);

  function handleSubmit(e) {
    e.preventDefault();
    if (fullName)
      updateuserapi(
        { fullName, avatar },
        {
          onSuccess: () => {
            e.target.reset();
          },
        }
      );
  }

  function handlecancel() {
    setFullName(currentFullName);
    setAvatar(currentFullName);
  }

  return (
    <Form id="form1" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isupdateuser}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image" notimp={true}>
        <FileInput
          disabled={isupdateuser}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          onClick={handlecancel}
          disabled={isupdateuser}
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isupdateuser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
