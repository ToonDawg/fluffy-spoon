import { ChangeEvent, FormEvent, useState } from "react";

export function useForm<T>(values: T, validationFn: (values: T) => string[]) {
  const [formValues, setFormValues] = useState(values);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    setErrors(validationFn(formValues));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Validation passed");
      setIsSubmitting(true);
      setTimeout(() => {}, 2000);
      console.log(formValues);
      setIsSubmitting(false);
    }
  };

  return {
    values: formValues,
    errors,
    onChange,
    onSubmit,
    isSubmitting,
  };
}
