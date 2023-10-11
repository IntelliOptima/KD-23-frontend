"use client";
import GeneralButton from "@/components/Buttons/GeneralButton";
import useCustomForm from "@/hooks/useForm";
import Input from "@/components/CustomInputs/Input";
import { useRouter } from "next/navigation";




export default function FormSection() {
  const url = "/api/register";
  const router = useRouter();
  const { register, getValues, errors, isSubmitting, handleSubmit } = useCustomForm({
    url,
    onError: (error) => { 
      console.log("Login failed:",  "No error message provided");
     },

    onSuccess: (data) => { 
      console.log("Login successful!");
      router.replace(process.env.NEXT_PUBLIC_BASE_URL?.toString() || '/login');
     },
});

   

  return (
    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
      <Input
        htmlfor="email"
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        registerOptions={{
          required: "Email is required",
        }}
        errors={errors}
      />
      <Input
        htmlfor="password"
        type="password"
        placeholder="Password"
        name="password"
        register={register}
        registerOptions={{
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters",
          },
        }}
        errors={errors}
      />

      <Input
        htmlfor="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        register={register}
        registerOptions={{
          required: "Confirm password is required",
          validate: (value) =>
            value === getValues("password") || "Passwords must match",
        }}
        errors={errors}
      />
      
      <div>
        <GeneralButton disabled={isSubmitting} text="Register" type="submit" color="blue" />
      </div>
    </form>
  );
}