/**
 * AN OLD FORMIK SOLUTION for DEBOUNCING VALIDATION
 *  - Keep for reference
 *  - Requires disabling automatic validation when init formik
 *  - Use <FormikDebouncedValidationEffect/> within <Formik>
 *  - Validates entire form
 */
// const FormikDebouncedValidationEffect = () => {
//   const form = useFormikContext();
//   const debouncedValidate = useMemo(() => _.debounce(form.validateForm, 800), [form.validateForm]);

//   useEffect(() => {
//     debouncedValidate(form.values);
//     return () => {
//       debouncedValidate.cancel();
//     }
//   }, [form.values, debouncedValidate]);

//   return null
// }
