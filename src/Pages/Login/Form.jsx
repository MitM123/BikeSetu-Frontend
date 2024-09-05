"use client";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../UIs/aceternity-ui/input";
import { Label } from "../../UIs/aceternity-ui/label";
import { cn } from "../../UIs/utils/cn";
import Global from "../../Utils/Global";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = (email, password) => {
    const newErrors = { email: "", password: "" };
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    const newErrors = validateForm(email.value, password.value);
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    setIsLoading(true);

    try {
      const res = await Global.httpPost('/auth/login', {
        email: email.value,
        password: password.value
      });
      Global.user = res.user;
      Global.token = res.token;
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleButton = async () => {
    setIsLoading(true);
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/google`;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
    
  return (
    <div className="max-w-md w-full mx-auto p-0 md:p-0 bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to {import.meta.env.VITE_SITE_NAME}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to {import.meta.env.VITE_SITE_NAME} if you can because we don't have a login flow yet
      </p>

      <form className="my-8" onSubmit={handleSubmit} noValidate>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="example@gmail.com"
            type="email"
            disabled={isLoading}
            className={cn(errors.email && "border-red-500")}
          />
          {errors.email && <p className="text-red-600 font-bold text-sm">{errors.email}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            disabled={isLoading}
            className={cn(errors.password && "border-red-500")}
          />
          {errors.password && <p className="text-red-600 font-bold text-sm">{errors.password}</p>}
        </LabelInputContainer>
        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              Login &rarr;
              <BottomGradient />
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <span className="text-l text-neutral-600 dark:text-neutral-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </span>
        </div>

        <div className="mt-7 text-center">
          <Link to="/forgot-password" className="text-black hover:underline">
            Forgot Password?
          </Link>
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
