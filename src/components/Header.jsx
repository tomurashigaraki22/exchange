import { Menu } from "lucide-react";
import React from "react";

const Header = () => {
    return(
        <div className="p-3">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <img src="./logo.jpg" alt="Logo" className="w-10 h-10 rounded-full"/>
                </div>
                <div>
                    <p>Forex Trading Forum</p>
                </div>
                <div>
                    <Menu color="white" size={24}/>
                </div>
            </div>
        </div>
    )
}

export default Header;