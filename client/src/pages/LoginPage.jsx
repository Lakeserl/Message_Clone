import { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("SignUp"); // "SignUp" or "Login"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "SignUp" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    } 
  };

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
        {/* left */}
        <img src={assets.logo_big} alt="" className="w-[min(20vw,250px)]" />

        {/* right */}
        <form
          onSubmit={handleSubmit}
          className="border-2 bg-white/20 backdrop-blur-lg text-white border-purple-300/50-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
        >
          <h2 className="font-medium text-2xl flex justify-between items-center">
            {currState}
            {isDataSubmitted && (
              <img onClick={() => setIsDataSubmitted(false)}
                src={assets.arrow_icon}
                alt=""
                className="w-5 cursor-pointer"
              />
            )}
          </h2>

          {currState === "SignUp" && !isDataSubmitted && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Full Name"
              required
            />
          )}

          {!isDataSubmitted && (
            <>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Address"
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </>
          )}

          {currState === "SignUp" && isDataSubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide a short bio..."
              required
            ></textarea>
          )}

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
          >
            {currState === "SignUp" ? "Create Account" : "Login Now"}
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy</p>
          </div>

          <div className="flex flex-col gap-2">
            {currState === "SignUp" ? (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className="font-medium text-violet-500 cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Create an account{" "}
                <span
                  onClick={() => {
                    setCurrState("SignUp");
                    setIsDataSubmitted(false);
                  }}
                  className="font-medium text-violet-500 cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
