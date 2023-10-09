"use client";
import GeneralButton from "@/components/Buttons/GeneralButton";
// import useAuth from "@/hooks/useAuth";
import useCustomForm from "@/hooks/useForm";
import Input from "@/components/CustomInputs/Input";



export default function FormSection() {
  const { register, getValues, errors, isSubmitting, handleSubmit } = useCustomForm({
    url: '/api/submitForm',
    onSuccess: (data) => { console.log('Success:', data); },
    onError: (error) => { console.error('Error:', error); }
});

  // const { handleSubmit } = useAuth();

  return (
    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
      <Input
        name="email"
        type="email"
        htmlfor="email"
        placeholder="Email"
        autoComplete=""
      />
      <Input
        name="password"
        type="password"
        htmlfor="password"
        placeholder="new password"
        autoComplete=""
      />
      <Input
        name="confirmPassword"
        type="confirmPassword"
        htmlfor="confirmPassword"
        placeholder="confirmPassword"
        autoComplete=""
      />

      <div>
        <GeneralButton text="Register" type="submit" color="blue" />
      </div>
    </form>
  );
}