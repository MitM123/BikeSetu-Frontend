import React from 'react'
import { Input } from '../../UIs/shadcn-ui/input'

const AddBike = () => {
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-lexendDeca w-full flex justify-center mt-2'>Add Bike</h1>
            <div className="flex w-full ">
                <Input
                    type="text"
                    placeholder="Enter text here"
                    className="border-2 w-[30%] m-4 placeholder:font-poppins  border-lightGreen border-green-800 focus:border-[#90EE90] focus:ring-[#90EE90] text-[#90EE90] placeholder-[#90EE90] p-2 rounded-md"
                />
            </div>
        </div>
    )
}

export default AddBike
