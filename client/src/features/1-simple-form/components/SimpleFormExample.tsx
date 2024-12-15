import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useCallback } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { getDefaultNewUserDto, NewUserDto, NewUserDtoSchema } from "~/features/1-simple-form/models/NewUserDto";
import { getRandomWordsString } from "../helpers/string-helpers";
import { mockIsEmailTakenApiCall } from "../services/simple-form-mock-api-calls-service";
import FormActionButtons from "./FormActionButtons";
import GenericFormTextField from "./GenericFormTextField";

type SimpleFormProps = {
  isReadOnly?: boolean;
};

const getDefaultValues = async () => {
  const defaultUser = getDefaultNewUserDto();
  const sampleUsername = await getRandomWordsString();
  defaultUser.username = sampleUsername;
  return defaultUser;
};

export default function SimpleFormExample(props: SimpleFormProps) {
  const { isReadOnly = false } = props;
  const methods = useForm({
    defaultValues: async () => await getDefaultValues(),
    resolver: yupResolver(NewUserDtoSchema),
    mode: "onChange",
    disabled: isReadOnly,
  });

  // TODO: save to/load from local storage & oading for debounced saving to lcoalstorage (1000ms?) separate or the same?
  // TODO: Separate form for complexity one of many dropdown, when condition for postal address, wiz with badge errors,
  // TODO: remove when here

  const onSubmit = async (data: NewUserDto) => {
    await new Promise((p) => setTimeout(p, 2000));
    try {
      console.log("pre", methods.formState.isSubmitSuccessful);

      if (data.username !== "jjj") throw new Error("forcing issubmitsuccessful false");
    } catch (e: any) {
      console.log("post", methods.formState.isSubmitSuccessful);
      methods.setError("root", { type: "manual", message: "form submission failed" });
    }
    console.log("Submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-60 flex-col">
        <FormActionButtons />
        <UsernameField />
        <EmailField />
        {/* <HideMyEmailField /> */}
      </form>
    </FormProvider>
  );
}

const HideMyEmailField = () => {
  const {
    control,
    trigger,
    setValue,
    formState: { disabled, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useFormContext<NewUserDto>();
  const isDisabled = disabled || isSubmitting || (isSubmitted && isSubmitSuccessful);

  return (
    <Controller
      name="isHideMyEmail"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label="Hide my email TODO: move to more complex example with address build up (yup when & clearing) + drop down (yup one of)"
          control={
            <Checkbox
              {...field}
              disabled={isDisabled}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.checked) setValue("email", "", { shouldDirty: true }); // Gotcha: Must turn on dirty detection when setting value
                trigger();
              }}
            />
          }
        />
      )}
    />
  );
};

const UsernameField = () => {
  return (
    <GenericFormTextField<NewUserDto>
      label="Username"
      fieldName="username"
      isRequired={true}
      initialUntouchedMessage="Be creative!"
    />
  );
};

const EmailField = () => {
  const fieldName: keyof NewUserDto = "email";
  const { clearErrors, setError, watch } = useFormContext<NewUserDto>();
  const isHideMyEmail = watch("isHideMyEmail");

  const isEmailTaken = useCallback(
    async (value: string) => {
      try {
        clearErrors(fieldName);
        if (await mockIsEmailTakenApiCall(value)) {
          setError(fieldName, { type: "manual", message: "Email already taken" });
          return false;
        }
        return true;
      } catch (error) {
        setError(fieldName, { type: "manual", message: "Unable to check email availability" });
        return false;
      }
    },
    [clearErrors, setError, fieldName],
  );

  return (
    <GenericFormTextField<NewUserDto>
      label="Email"
      fieldName={fieldName}
      type="email"
      placeholder="🤫 Psst, try bro@bro.com"
      successMessage="Available"
      isRequired={!isHideMyEmail}
      isForcedDisabled={isHideMyEmail}
      onAsyncValidate={!isHideMyEmail ? isEmailTaken : undefined}
    />
  );
};
