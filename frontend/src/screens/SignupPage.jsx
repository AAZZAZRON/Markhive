import Header from "../components/auth/Header";
import Signup from "../components/auth/Signup";

export default function SignupPage(){
    return(
        <>
        <div className="flex justify-center h-full min-h-fit items-center">
            <div className="max-w-md w-full py-8">
                <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
                />
                <Signup/>
            </div>
        </div>
        </>
    )
}