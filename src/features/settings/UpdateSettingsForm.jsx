import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isloadingsettings,
    settingsdata: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBookings,
      minBookingLength,
    } = {},
  } = useSettings();

  const { isupdatesettings, updatesettings } = useUpdateSetting();

  function handlesubmit(e, fieldtoupdate) {
    if (!e.target.value) return;
    updatesettings({ value: e.target.value, fieldtoupdate });
  }

  if (isloadingsettings) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          onBlur={(e) => handlesubmit(e, "minBookingLength")}
          disabled={isupdatesettings}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          onBlur={(e) => handlesubmit(e, "maxBookingLength")}
          disabled={isupdatesettings}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          onBlur={(e) => handlesubmit(e, "maxGuestsPerBookings")}
          disabled={isupdatesettings}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBookings}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          onBlur={(e) => handlesubmit(e, "breakfastPrice")}
          disabled={isupdatesettings}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
