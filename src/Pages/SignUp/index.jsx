import React from 'react';
import { SignupForm } from './Form';
import Signup from '../../assets/Signup.svg'; // Adjust the import path as needed
import { FlipWords } from "../../UIs/aceternity-ui/fliptext";

export const SignUp = () => {
  const words = ["hundreds", "thousands", "millions"];
  return (
    <div className='m-4 grid gap-4 sm:grid-cols-2 min-h-[800px]'>
      <div className='sm:col-span-1 flex justify-center items-center sm:block '>

        <div className='grid-rows-2 m-4'>
          <div className='text-center mb-24 mt-24 row-span-1'>
            <p className='text-[25px] font-semibold text-end'>
              "The journey of a<FlipWords words={words} />miles begins with one step."
            </p>
          </div>
          
          <div className='row-span-1 flex justify-center items-center'>
            <img src={Signup} alt='Signup Illustration' className='w-2/3 h-auto' />
          </div>
        </div>
      </div>
      <div className='sm:col-span-1 flex justify-center items-center flex-col '>
        <div className='w-full max-w-md'>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};
