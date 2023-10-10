import Link from "next/link";
import FormSection from "./FormSection";

const AuthFormWrapper = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <FormSection />
      <p className="mt-10 text-center text-white font-thin text-sm">
        Havent registered yet? {" "}
        <Link
          href={`/register`}
          className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >
          Register here -&gt;
        </Link>
      </p>
    </div>
  );
}

export default AuthFormWrapper;