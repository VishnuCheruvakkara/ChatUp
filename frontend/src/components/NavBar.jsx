import Button from "./Button"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

function NavBar() {
    return (
        <header className="w-full py-4 sm:px-8 px-3  flex justify-between items-center border-b border-primary bg-bgBase sticky top-0 z-50">
            <div className="flex items-center gap-2 text-primary">
                <div className="bg-primary text-white p-2 rounded-full">
                    <IoChatbubbleEllipsesSharp className="text-xl" />
                </div>
                <h1 className="sm:text-2xl text-xl font-bold">ChatUP</h1>
            </div>
            <nav className=" flex gap-3">

                <Button className="bg-transparent text-primary border-2 hover:bg-primary hover:text-white border-primary" >Login</Button>
                <Button >Sign Up</Button>
            </nav>
        </header>
    )
}

export default NavBar