import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import LogIn from "./pages/login/LogIn.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    document.title = "BuzzConnect"; // Change the title dynamically
  }, []);
  const {authUser} = useAuthContext();
  
  return (
    <div className= "p-4 h-screen flex items-center justify-center">
      <Routes>
		    <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <LogIn />} /> 
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />

			</Routes>
      <Toaster />
    </div>
  );
}

export default App;

{/* earlier Routes :-
<Route path='/' element={<Home />} />
<Route path='/login' element={<LogIn />} />				
<Route path='/signup' element={<SignUp />} /> 
*/}