import React, { useEffect, useState } from 'react'
import { Input } from '../../UIs/shadcn-ui/input'
import { Button } from '../../UIs/shadcn-ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../UIs/shadcn-ui/dialog'
import Global from '../../Utils/Global'
import './AddBike.css'
import { toast } from 'sonner'

const AddBike = () => {
    const [bikes, setBikes] = useState([]);
    const [selectedBike, setSelectedBike] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const response = await Global.httpGet('/bikes');
                setBikes(response.bikes);
            } catch (error) {
                console.error(error)
            }
        }
        fetchBikes();
    }, []);

    const handleOpenModal = (bike) => {
        setSelectedBike(bike);
        setQuantity(0);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBike(null);
        setQuantity(0);
    };

    const handleQuantityChange = (value) => {
        setQuantity(parseInt(value) || 0);
    };

    const handleAddToInventory = async () => {
        if (selectedBike && quantity > 0) {
            try {
                const res = await Global.httpPost('/manufacturer/bikes', {
                    modalId: selectedBike.id,
                    quantity: quantity
                })
                console.log(res)
                toast.success(res.message)
            } catch (error) {
                console.error(error)
            }
            console.log(`Adding ${quantity} of bike ${selectedBike.id} to inventory`);
            // Here you would typically make an API call to update the inventory
            handleCloseModal();
        }
    };

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-lexendDeca w-full flex justify-center mt-2'>Manage Bike Inventory</h1>
            <div className="flex w-full items-center justify-center mt-2 ">
                <Input
                    type="text"
                    placeholder="Search bike here"
                    className="border-2 w-[40%] m-4 placeholder:font-poppins border-lightGreen border-green-800 focus:border-[#90EE90] focus:ring-[#90EE90] text-[#90EE90] placeholder-[#90EE90] p-2 rounded-md"
                />
                <Button className="bg-[#065F46] w-24 text-white font-lexendDeca hover:bg-[#064E3B] focus:ring-[#065F46]">Search</Button>
            </div>
            <div className='w-full p-2 '>
                <div>
                    <h1 className='text-2xl font-lexendDeca w-full flex'>Bikes</h1>
                </div>
                <div className={`w-full grid gap-14 p-4 ${bikes && bikes.length > 0 && "custom-scrollbar"} grid-cols-3 h-[64vh] overflow-y-scroll`}>
                    {bikes.map((bike) => (
                        <div key={bike.id} className="bg-[#F0FFF4] rounded-lg shadow-lg">
                            <div className="relative">
                                <img
                                    src={bike.image}
                                    alt="Electric Vehicle"
                                    className="rounded-t-lg object-cover w-full h-60"
                                    width="400"
                                    height="240"
                                    style={{ aspectRatio: "400/240", objectFit: "cover" }}
                                />
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#065F46] text-white px-3 py-1 rounded-md">
                                    <BoltIcon className="w-4 h-4" />
                                    <span className="text-[12px] font-poppins font-medium">Eco-Friendly</span>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 font-lexendDeca">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-[#065F46]">{bike.name}</h3>
                                        <p className="text-[#1d6c56] font-medium">Price: {bike.price}</p>
                                    </div>
                                    <p className="text-muted-foreground text-sm mt-1">Range: 310 miles | Charging Time: 30 mins</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button 
                                        className="bg-[#065F46] w-36 text-white hover:bg-[#064E3B] focus:ring-[#065F46]"
                                        onClick={() => handleOpenModal(bike)}
                                    >
                                        Add to Inventory
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <GaugeIcon className="w-4 h-4 text-[#065F46]" />
                                            <span className="text-[#065F46] text-sm font-medium">{bike.topSpeed}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GaugeIcon className="w-4 h-4 text-[#065F46]" />
                                            <span className="text-[#065F46] text-sm font-medium">{bike.weight}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-lexendDeca">Add to Inventory</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <h3 className="text-lg font-poppins font-semibold">{selectedBike?.name}</h3>
                        <p className="text-sm font-montserrat text-gray-500">Enter the quantity you want to add to inventory:</p>
                        <Input
                            type="number"
                            placeholder="Quantity"
                            className="mt-2 font-dm-sans"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" className="font-dm-sans" onClick={handleCloseModal}>Cancel</Button>
                        <Button className="bg-[#065F46] w-24 text-white font-lexendDeca hover:bg-[#064E3B] focus:ring-[#065F46]" onClick={handleAddToInventory}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddBike

function BoltIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    )
}

function GaugeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 14 4-4" />
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
    )
}