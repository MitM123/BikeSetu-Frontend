import React from 'react';
import { LoginForm } from './Form';
import Signup from '../../assets/Signup.svg';
import { FlipWords } from "../../UIs/aceternity-ui/fliptext"; // Adjust the import path as needed

export const Login = () => {
  const words = ['greener', 'cleaner', 'sustainable'];

  return (
    <div className='m-4 grid gap-4 font-dm-sans sm:grid-cols-2 min-h-[800px]'>
      <div className='sm:col-span-1 flex justify-center items-center sm:block  mt-[50px]'>
        <div className='grid-rows-2'>
          <div className='text-center mb-24 mt-24 row-span-1 '>
            <p className='text-[25px] font-semibold text-end'>
            "The journey to a <FlipWords words={words} className="text-[#065F46]" /> future starts with one electric vehicle."

            </p>
          </div>
          
          <div className='row-span-1 flex justify-center items-center'>
            <img src={Signup} alt='Signup Illustration' className='w-2/3 h-auto max-h-[320px]' />
          </div>
        </div>
      </div>
      <div className='sm:col-span-1 flex justify-center items-center flex-col '>
        <div className='w-full max-w-md'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
