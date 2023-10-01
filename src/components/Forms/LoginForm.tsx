"use client";
import Input from "../CustomInputs/Input";
import useCustomForm from "@/hooks/useForm";

const LoginForm = () => {
  const { register, getValues, errors, isSubmitting, handleSubmit } = useCustomForm({
    url: '/api/submitForm',
    onSuccess: (data) => { console.log('Success:', data); },
    onError: (error) => { console.error('Error:', error); }
});

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 m-14 ">
      <Input
        htmlfor="email"
        type="email"
        placeholder="Email"
        name="email"
        errors={errors}
        register={register}
        registerOptions={{
          required: "Email is required",
        }}
      />
      <Input
        htmlfor="password"
        type="password"
        placeholder="Password"
        name="password"
        errors={errors}
        register={register}
        registerOptions={{
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters",
          },
        }}
      />
      <Input
        htmlfor="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        errors={errors}
        register={register}
        registerOptions={{
          required: "Confirm password is required",
          validate: (value) =>
            value === getValues("password") || "Passwords must match",
        }}
      />
      <button disabled={isSubmitting} type="submit" className="bg-blue-500 disabled:bg-gray-500 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
