/* eslint-disable react/prop-types */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useInsertCabin } from "./useInsertCabin";
import { useEditCabin } from "./useEditCabin";

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

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ cabintoedit = {}, onclose }) {
  const { id: editid, ...editvalues } = cabintoedit;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editid ? editvalues : {},
  });

  const { errors } = formState;

  // console.log(errors);

  const { isediting, edit } = useEditCabin(reset);

  const { iscreating, create } = useInsertCabin();

  function onsubmit(data) {
    if (editid) {
      if (typeof data.image !== "string") {
        edit(
          { ...data, image: data.image[0], id: editid },
          {
            onSuccess: () => {
              onclose?.();
            },
          }
        );
      } else {
        edit(
          { ...data, image: data.image, id: editid },
          {
            onSuccess: () => {
              onclose?.();
            },
          }
        );
      }
    } else
      create(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onclose?.();
          },
        }
      );
  }

  // function onerror(err) {
  //   // console.log(err);
  // }

  const iscreateoredit = iscreating || isediting;

  return (
    <Form
      onSubmit={handleSubmit(onsubmit, onerror)}
      type={onclose ? "modal" : "regular"}
    >
      <FormRow notimp={editid} error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={iscreateoredit}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        notimp={editid}
        error={errors?.maxCapacity?.message}
        label="Maximum Capacity"
      >
        <Input
          disabled={iscreateoredit}
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

      <FormRow
        notimp={editid}
        error={errors?.regularPrice?.message}
        label="Regular Price"
      >
        <Input
          disabled={iscreateoredit}
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

      <FormRow
        notimp={editid}
        error={errors?.discount?.message}
        label="Discount"
      >
        <Input
          disabled={iscreateoredit}
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
        notimp={editid}
        error={errors?.description?.message}
        label="Description For Website"
      >
        <Textarea
          disabled={iscreateoredit}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Cabin Photo"
        error={errors?.image?.message}
        notimp={editid}
      >
        <FileInput
          disabled={iscreateoredit}
          id="image"
          accept="image/*"
          // type="file"
          {...register("image", {
            required: editid ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={iscreateoredit}
          onClick={() => onclose?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={iscreateoredit}>
          {editid ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
