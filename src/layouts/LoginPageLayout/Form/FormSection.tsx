"use client";

import GeneralButton from "@/components/Buttons/GeneralButton";
import useCustomForm from "@/hooks/useForm";
import Input from "@/components/CustomInputs/Input";
import { useRouter } from "next/navigation";



export default function FormSection() {
  const router = useRouter();
  const { register, getValues, errors, isSubmitting, handleSubmit } = useCustomForm({
    url: 'api/login',
    onError: (error) => { 
      console.log("Login failed:",  "No error message provided");
     },

     onSuccess: (data) => {
      console.log(`Parsed Cookies: ${data.data}`);
      router.push(data.data === "ADMIN"? '/admin/dashboard' : "/");
      localStorage.setItem('isLoggedIn', 'true');
     },
});

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