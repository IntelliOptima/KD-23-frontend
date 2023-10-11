"use client";

import GeneralButton from "@/components/Buttons/GeneralButton";
import useAuth from "@/hooks/useAuth";
import useCustomForm from "@/hooks/useForm";
import Input from "@/components/CustomInputs/Input";



export default function FormSection() {
  const { register, getValues, errors, isSubmitting } = useCustomForm({
    url: '/api/login',
    onSuccess: (data) => { console.log('Success:', data); },
    onError: (error) => { console.error('Error:', error); }
});

   const { handleSubmit } = useAuth("/api/login");

  return (
    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
      <Input
        name="email"
        type="email"
        htmlfor="email"
        placeholder=""
        autoComplete="email"
        register={register}
        registerOptions={{
          required: "Email is required",
          
        }}
        errors={errors}
      />
      <Input
        name="password"
        type="password"
        htmlfor="password"
        placeholder="*************"
        autoComplete="current-password"
        register={register}
        registerOptions={{
          required: "Password is required",
        }}
        errors={errors}
      />
      
      <div>
        <GeneralButton disabled={isSubmitting} text="Login" type="submit" color="blue" />
      </div>
    </form>
  );
}