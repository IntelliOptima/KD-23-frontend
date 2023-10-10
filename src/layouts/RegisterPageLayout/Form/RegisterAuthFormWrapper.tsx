import Link from "next/link";
import FormSection from "./FormSection";

const RegisterAuthFormWrapper = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <FormSection />
      <p className="mt-10 text-center text-white font-thin text-sm">
        Already have an account? {" "}
        <Link
          href={`/login`}
          className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >
          Login here -&gt;
        </Link>
      </p>
    </div>
  );
}

export default RegisterAuthFormWrapper;