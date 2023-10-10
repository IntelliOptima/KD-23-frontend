import HeaderSection from "../layouts/LoginPageLayout/Header/HeaderSection";
import RegisterAuthFormWrapper from "@/layouts/RegisterPageLayout/Form/RegisterAuthFormWrapper";
const RegisterView = () => {
    return (
        <>
            <div className="flex h-screen flex-1 flex-col max-w-sm mx-auto  justify-center lg:px-8">
                <HeaderSection actionText="Register account on KinoXP"  />
                <RegisterAuthFormWrapper />
            </div>
        </>
    );
}

export default RegisterView;
