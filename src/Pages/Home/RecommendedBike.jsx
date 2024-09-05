import { Button } from "../../UIs/shadcn-ui/button"
import TVS from '../../assets/TVS.jpg'

const RecommendedBike = ({ image, name, price, topSpeed, range, chargingtime, onclick }) => {
    return (
        <div className=" bg-[#F0FFF4] rounded-lg shadow-lg" onClick={onclick}>
            <div className="relative">
                <img
                    src={image}
                    alt="Electric Vehicle"
                    className="rounded-t-lg object-contain h-72"
                    width="400"
                    height="240"
                    style={{ aspectRatio: "400/240", objectFit: "cover" }}
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#065F46] text-white px-3 py-1 rounded-md">
                    <BoltIcon className="w-4 h-4" />
                    <span className="text-sm font-poppins font-medium">Eco-Friendly</span>
                </div>
            </div>
            <div className="p-4 space-y-4 font-lexendDeca">
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-[#065F46]">{name}</h3>
                        <p className="text-[#1d6c56] font-medium">Price: {price}</p>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">Range: {range} | Charging Time: 30 mins</p>
                </div>
                <div className="flex items-center justify-between">
                    <Button className="bg-[#065F46] w-28 text-white hover:bg-[#064E3B] focus:ring-[#065F46]">Buy Now</Button>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <GaugeIcon className="w-4 h-4 text-[#065F46]" />
                            <span className="text-[#065F46] text-sm  font-medium">{topSpeed} mph</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <GaugeIcon className="w-4 h-4 text-[#065F46]" />
                            <span className="text-[#065F46] text-sm  font-medium">{chargingtime}hr</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendedBike

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