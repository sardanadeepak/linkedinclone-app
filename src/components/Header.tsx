import { IoSearchSharp } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa6";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import LinkedinLogo from '../assets/linkedin.png'
import ProfilePic from '../assets/image.png'
import HeaderOptions from "../cards/HeaderOptions";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/UserSlice";
import { auth } from "../firebase/config";
const Header = () => {
    const dispatch = useDispatch()
    const user: any | null = useSelector(selectUser)
    const logOutFromApp = () => {
        if (user) {
            dispatch(logout())
            auth.signOut()
        }
    }
    return (
        <nav>
            <div className="fixed top-0 z-50 w-full flex flex-row  justify-evenly p-2.5 bg-white border-b-[0.1px] border-gray-300">
                <div className="flex">
                    <img src={LinkedinLogo} alt="LinkedinLogo" className="h-10 object-contain" />
                    <div className="flex flex-col md:flex-row items-center md:bg-slate-300 rounded-sm ml-2.5 p-2">
                        <IoSearchSharp />
                        <input type="text" placeholder="Search" className="hidden md:block outline-none border-none text-gray-600 bg-slate-300 ml-2" />
                        <h4 className="block md:hidden text-xs font-light " >Search</h4>
                    </div>

                </div>
                <div className="flex flex-row items-center gap-5">
                    <HeaderOptions Icon={IoHomeSharp} title="Home" avatar={null} onClick={null} />
                    <HeaderOptions Icon={MdSupervisorAccount} title="My Network" avatar={null} onClick={null} />
                    <HeaderOptions Icon={FaSuitcase} title="Jobs" avatar={null} onClick={null} />
                    <HeaderOptions Icon={BiSolidMessageSquareDots} title="Messaging" avatar={null} onClick={null} />
                    <HeaderOptions Icon={IoNotifications} title="Notification" avatar={null} onClick={null} />
                    <HeaderOptions Icon={null} title={user ? "Sign out" : "Sign in"}
                        avatar={user ? user.photoUrl ? user.photoUrl : ProfilePic : ProfilePic}
                        onClick={logOutFromApp} />

                </div>
            </div>
        </nav>
    )
}

export default Header