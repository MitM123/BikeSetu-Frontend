import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Button } from "../../UIs/shadcn-ui/button";
import Global from "../../Utils/Global";
import { ProfileMenu } from "./ProfileMenu";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header>
                <nav className="inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
                    <div className="w-full max-w-7xl mx-auto px-4">
                        <div className="flex justify-between h-14 items-center">
                            <div className="flex items-center md:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                                    <span className="sr-only">Open main menu</span>
                                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                                </button>
                            </div>
                            <div className="flex-1 flex justify-center md:justify-start">
                                <Link to="/" className="flex items-center ml-4 md:ml-0">
                                    <MountainIcon className="h-6 w-6" />
                                </Link>
                            </div>
                            <nav className={`hidden md:flex flex-1 justify-center lg:justify-start lg:mr-14`}>
                                <div className="flex gap-4">
                                    <Link
                                        to="#"
                                        className="font-medium p-2.5 flex items-center text-lg transition-colors hover:underline"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="#"
                                        className="font-medium p-2.5 flex items-center text-lg transition-colors hover:underline"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to="#"
                                        className="font-medium p-2.5 flex items-center text-lg transition-colors hover:underline"
                                    >
                                        Services
                                    </Link>
                                    <Link
                                        to="#"
                                        className="font-medium p-2.5 flex items-center text-lg transition-colors hover:underline"
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </nav>
                            <div className="flex items-center justify-end md:w-1/4">
                                {
                                    Global.user ? (
                                        <ProfileMenu trigger={
                                            <Button variant="ghost" size="icon" className="p-0">
                                                <CgProfile className="h-8 w-8 text-gray-800" />
                                            </Button>
                                        } />
                                    ) : (
                                        <Link to="/login">
                                            <Button size="sm">Login</Button>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                        {isOpen && (
                            <div className="md:hidden flex flex-col items-center gap-4 mt-4 mb-8">
                                <Link
                                    to="#"
                                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="#"
                                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    to="#"
                                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Services
                                </Link>
                                <Link
                                    to="#"
                                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

function MountainIcon(props) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}

function MenuIcon(props) {
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
            <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
    );
}

function XIcon(props) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}