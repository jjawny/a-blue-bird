import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useCallback } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { getDefaultNewUserDto, NewUserDto, NewUserDtoSchema } from "~/features/large-boring-form/models/NewUserDto";
import { mockIsEmailTakenApiCall } from "~/features/large-boring-form/services/simple-form-mock-api-calls-service";
import { getRandomWordsString } from "~/shared/helpers/string-helpers";
// OWN COMPONENTS
import GenericFormActionButtons from "~/shared/components/GenericFormActionButtons";
import GenericFormTextField from "~/shared/components/GenericFormTextField";

type LargeFormExampleProps = {
  isReadOnly?: boolean;
  // classNames:
};

const getDefaultValues = async () => {
  const defaultUser = getDefaultNewUserDto();
  const sampleUsername = await getRandomWordsString();
  defaultUser.username = sampleUsername;
  return defaultUser;
};

export default function LargeFormExample(props: LargeFormExampleProps) {
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

  const onSubmit = async (formData: NewUserDto) => {
    await new Promise((p) => setTimeout(p, 2000));
    try {
      const formDataSanitized = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
      );

      console.log("pre", methods.formState.isSubmitSuccessful);

      if (formData.username !== "jjj") throw new Error("forcing issubmitsuccessful false");
    } catch (e: any) {
      console.log("post", methods.formState.isSubmitSuccessful);
      methods.setError("root", { type: "manual", message: "form submission failed" });
    }
    console.log("Submitted:", formData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-60 flex-col">
        <UsernameField />
        <EmailField />
        <HideMyEmailField />
        {!isReadOnly && <GenericFormActionButtons<NewUserDto> />}
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
    <GenericFormTextField<NewUserDto> label="Username" fieldName="username" isRequired={true} defaultMessage="Be creative!" />
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
        const valueFormatted = value.trim();
        if (!valueFormatted) return false;
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
      defaultMessage="Join BlueBird today"
      isRequired={!isHideMyEmail}
      isForcedDisabled={isHideMyEmail}
      onAsyncValidate={!isHideMyEmail ? isEmailTaken : undefined}
    />
  );
};
