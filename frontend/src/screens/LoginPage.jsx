import Header from "../components/auth/Header";
import Login from "../components/auth/Login";

export default function LoginPage() {

    return (
        <>
        <div className="flex justify-center h-full min-h-fit items-center">
            <div className="max-w-md w-full py-8">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet?"
                        linkName="Signup"
                        linkUrl="/signup"
                    />

                    <Login/>
            </div>
        </div>

        </>
    )
}