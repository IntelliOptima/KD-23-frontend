import { FieldValues, useForm } from 'react-hook-form';

type UseCustomFormProps = {
    url: string;
    onSuccess:(data: string) => void;
    onError:(error: string) => void;
}

const useCustomForm = ({url, onSuccess, onError}: UseCustomFormProps) => {
    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors, isSubmitting },
      reset,
    } = useForm();
  
    const onSubmit = async (data: FieldValues) => {
      const response = await fetch(url, 
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const responseData = await response.json();
        onSuccess && onSuccess(responseData);
      } else {
        const errorText = await response.text();
        onError && onError(errorText);
      };

      reset();
    };
  
    return {
      register,
      errors,
      isSubmitting,
      getValues,
      handleSubmit: handleSubmit(onSubmit),
    };
  };
  
  export default useCustomForm;