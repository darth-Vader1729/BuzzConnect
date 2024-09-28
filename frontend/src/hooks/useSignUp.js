import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
    
  useEffect(() => {
    document.title = "BuzzConnect"; // Change the title dynamically
  }, []);
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
        if (!success) return;

        setLoading(true);
        try {
            // backend end-point :- http://localhost:5000/api/auth/signup
            const res = await fetch("/api/auth/signup",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({fullName, username, password, confirmPassword, gender})
            });
            
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            console.log(data);
            // local storage
            localStorage.setItem("chat-user", JSON.stringify(data))
            // context
            setAuthUser(data)

        } catch (error) {
            console.error("SignUp Error: ", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignUp;


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be atleast 6 characters");
        return false;
    }

    return true;
}