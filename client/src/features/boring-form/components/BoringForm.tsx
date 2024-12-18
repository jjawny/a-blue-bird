import { yupResolver } from "@hookform/resolvers/yup";
import { Paper } from "@mui/material";
import { useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { BoringFormDto, BoringFormDtoSchema, getDefaultBoringFormDto } from "~/features/boring-form/models/BoringFormDto";
import { mockIsEmailTakenApiCall } from "~/features/boring-form/services/simple-form-mock-api-calls-service";
// OWN COMPONENTS
import GenericFormActionButtons from "~/shared/components/GenericFormActionButtons";
import GenericFormTextField from "~/shared/components/GenericFormTextField";

type BoringFormProps = {
  isReadOnly?: boolean;
  // classNames: // TODO: find vid about classname etc controlling spacing outside
};

export default function BoringForm(props: BoringFormProps) {
  const { isReadOnly = false } = props;
  const methods = useForm({
    defaultValues: async () => getDefaultBoringFormDto(),
    resolver: yupResolver(BoringFormDtoSchema),
    mode: "onChange",
    disabled: isReadOnly,
  });

  // TODO: save to/load from local storage & oading for debounced saving to lcoalstorage (1000ms?) separate or the same?
  // TODO: Separate form for complexity one of many dropdown, when condition for postal address, wiz with badge errors,
  // TODO: remove when here

  const onSubmit = async (formData: BoringFormDto) => {
    await new Promise((p) => setTimeout(p, 2000));
    try {
      const formDataSanitized = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
      );

      console.log("pre", methods.formState.isSubmitSuccessful);

      if (!formData.email.startsWith("jjj")) throw new Error("forcing issubmitsuccessful false");
    } catch (e: any) {
      console.log("post", methods.formState.isSubmitSuccessful);
      methods.setError("root", { type: "manual", message: "form submission failed" });
    }
    console.log("Submitted:", formData);
  };

  return (
    <Paper>
      <div className="flex w-full opacity-50">
        <div className="test h-6 flex-grow rounded-br-2xl bg-orange-300"></div>
        <ChromeTabLikeTail />
        <div className="flex h-6 select-none justify-end gap-2 bg-white pr-3 text-stone-400">
          <img src="/favicon.ico" />
        </div>
      </div>

      {/* TEMP solution, find vid of best practice passing in styles (margins etc) */}
      <div className="p-20">
        <h1 className="mb-5 w-60 text-start">a boring form</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-60 flex-col">
            <EmailField />
            {!isReadOnly && <GenericFormActionButtons<BoringFormDto> />}
          </form>
        </FormProvider>
      </div>
    </Paper>
  );
}

const EmailField = () => {
  const fieldName: keyof BoringFormDto = "email";
  const { clearErrors, setError } = useFormContext<BoringFormDto>();

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
    <GenericFormTextField<BoringFormDto>
      label="Email"
      fieldName={fieldName}
      type="email"
      placeholder="🤫 Psst, try bro@bro.com"
      successMessage="Available"
      defaultMessage="Join BlueBird today"
      onAsyncValidate={isEmailTaken}
    />
  );
};

const ChromeTabLikeTail = () => {
  return (
    <div className="relative h-3 w-3">
      <div className="test absolute left-0 top-0 z-0 h-3 w-3 scale-x-[-1] bg-orange-300"></div>
      <div className="absolute left-0 top-0 z-50 h-3 w-3 rounded-tl-full bg-white"></div>
    </div>
  );
};
