import React, { useState } from "react";
import { Label } from "../../UIs/aceternity-ui/label";
import { Input } from "../../UIs/aceternity-ui/input";
import { cn } from "../../UIs/utils/cn";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Global from "../../Utils/Global";
import { toast } from "sonner";
import zxcvbn from "zxcvbn";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [passwordStrength, setPasswordStrength] = useState(-1); // Updated initial state to -1
  const navigate = useNavigate();

  const validateForm = (firstName, lastName, email, password, confirmPassword) => {
    const newErrors = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = password ? zxcvbn(password) : { score: -1 }; // Set score to -1 if password is empty
    setPasswordStrength(result.score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = e.target.elements;

    const newErrors = validateForm(firstName.value, lastName.value, email.value, password.value, confirmPassword.value);
    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsLoading(true); // Set loading state to true during HTTP request

    try {
      await Global.httpPost('/auth/register', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    } finally {
      setIsLoading(false); // Reset loading state after HTTP request completes
    }
  };
  const handleGoogleButton = async () => {
    setIsLoading(true); // Set loading state to true during HTTP request
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/google`;
    } catch (err) {
      console.error(err);
      // Handle error, show error message, etc.
    } finally {
      setIsLoading(false); // Reset loading state after HTTP request completes
    }
  }


  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return "bg-red-700";
      case 1:
        return "bg-[#f08c00]";
      case 2:
        return "bg-[#f08c00]";
      case 3:
        return "bg-blue-700";
      case 4:
        return "bg-green-700";``
      case -1: 
      default:
        return "bg-gray-300";
    }
  };

  const renderStrengthBar = () => {
    const bars = Array(5).fill(0).map((_, index) => (
      <div
        key={index}
        className={`h-1 w-1/6 mr-1 last:mr-0 rounded ${index <= passwordStrength ? getPasswordStrengthColor(passwordStrength) : "bg-gray-300"}`}
      ></div>
    ));
    return <div className="flex mt-2">{bars}</div>;
  };

  return (
    <div className="max-w-md w-full mx-auto p-0 md:p-0 bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to <span className="text-[#065F46]">{import.meta.env.VITE_SITE_NAME}</span>
      </h2>
      <p className="text-green-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to {import.meta.env.VITE_SITE_NAME} if you can because we don&apos;t have a login flow yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" placeholder="John" type="text" disabled={isLoading} />
            {errors.firstName && <p className="text-red-600 font-bold text-sm">{errors.firstName}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" placeholder="Smith" type="text" disabled={isLoading} />
            {errors.lastName && <p className="text-red-600 font-bold text-sm">{errors.lastName}</p>}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="example@gmail.com" type="email" disabled={isLoading} />
          {errors.email && <p className="text-red-600 font-bold text-sm">{errors.email}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" disabled={isLoading} onChange={handlePasswordChange} />
          {renderStrengthBar()}
          {errors.password && <p className="text-red-600 font-bold text-sm">{errors.password}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" placeholder="••••••••" type="password" disabled={isLoading} />
          {errors.confirmPassword && <p className="text-red-600 font-bold text-sm">{errors.confirmPassword}</p>}
        </LabelInputContainer>

        <button
         className="bg-[#065F46] w-full p-2 rounded-md text-white hover:bg-[#064E3B] font-lexendDeca focus:ring-[#065F46]"
          type="submit"
          disabled={isLoading} // Disable button when loading or form is disabled
        >
          {isLoading ? (
            <span>Loading...</span> // Show loading text or spinner
          ) : (
            <>
              Sign up &rarr;
              <BottomGradient />
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <span className="text-l text-neutral-600 dark:text-neutral-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </span>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col items-center space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={handleGoogleButton}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Continue with Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
