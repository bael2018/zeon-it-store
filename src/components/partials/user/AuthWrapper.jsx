import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthWrapper = () => {
    const [auth, setAuth] = useState(false);

    return auth ? <SignUp setAuth={setAuth} /> : <SignIn setAuth={setAuth} />;
};

export default AuthWrapper;
