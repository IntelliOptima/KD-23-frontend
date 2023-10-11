import HeaderSection from "../layouts/LoginPageLayout/Header/HeaderSection";
import AuthFormWrapper from "../layouts/LoginPageLayout/Form/AuthFormWrapper";

const LoginPage = () => {
    return (
        <>
            <div className="flex h-screen flex-1 flex-col max-w-sm mx-auto  justify-center lg:px-8">
                <HeaderSection actionText="Login to KinoXP"  />
                <AuthFormWrapper />
            </div>
        </>
    );
}

export default LoginPage;
