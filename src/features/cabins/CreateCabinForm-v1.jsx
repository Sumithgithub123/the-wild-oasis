/* eslint-disable react/prop-types */
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

// const Requiredstar = styled.span`
//   color: red;
//   font-size: medium;
// `;

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ cabintoedit }) {
  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  console.log(errors);

  const queryClient = useQueryClient();
  const { isLoading: iscreating, mutate } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success("Succesfully created.");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: () => {
      toast.error("Something wrong!");
    },
  });

  function onsubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onerror(err) {
    console.log(err);
  }

  // if (iscreating) return <SpinnerMini />;

  return (
    <Form onSubmit={handleSubmit(onsubmit, onerror)}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={iscreating}
          type="text"
          id="name"
          defaultValue={cabintoedit?.name}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum Capacity">
        <Input
          defaultValue={cabintoedit?.maxCapacity}
          disabled={iscreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular Price">
        <Input
          defaultValue={cabintoedit?.regularPrice}
          disabled={iscreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          defaultValue={cabintoedit?.discount}
          disabled={iscreating}
          type="number"
          id="discount"
          // defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value, formvalues) => {
              if (Number(value) >= Number(formvalues.regularPrice))
                return "Discount must be less than Regular price.";
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label="Description For Website"
      >
        <Textarea
          disabled={iscreating}
          type="number"
          id="description"
          defaultValue={cabintoedit?.description}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          disabled={iscreating}
          id="image"
          accept="image/*"
          // type="file"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={iscreating} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={iscreating}>Create cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
