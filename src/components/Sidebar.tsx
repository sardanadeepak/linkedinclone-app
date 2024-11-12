import Avatar from "../cards/Avatar"
import BackgroundImg from '../assets/background.png'
import ProfilePic from '../assets/image.png'
import { useSelector } from "react-redux"
import { selectUser } from "../store/UserSlice"

const Sidebar = () => {
    const user: any = useSelector(selectUser)
    const recentItem = (topic: string) => {
        return (
            <div className="flex text-sm text-gray-500 cursor-pointer font-semibold p-1 hover:bg-slate-100 hover:text-black">
                <span className="ml-1 mr-2.5">#</span>
                <p>{topic}</p>
            </div>
        )
    }
    return (
        // felx flex-col w-full px-5 md:sticky md:top-20 md:left-2 md:z-40 md:w-56 
        <div className=" ">
            <div className="flex flex-col rounded-xl bg-white md:w-56">
                <div className="flex flex-col items-center border-b border-gray-300">
                    <img src={BackgroundImg} alt="BackgroundImage" className="object-cover h-16 w-full rounded-t-xl" />
                    <Avatar src={user.photoUrl ? user.photoUrl : ProfilePic} className="object-contain h-16 w-16 mb-1 mt-[-40px] rounded-full" />
                    <h2 className="text-lg font-medium">{user.displayName}</h2>
                    <h4 className="text-sm text-center break-all mb-2">{user.email}</h4>
                </div>
                <div className="flex flex-col p-2">
                    <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-500">Profile viewers</p>
                        <p className="text-sm font-medium text-blue-700">1,021</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-500">Post impressions</p>
                        <p className="text-sm font-medium text-blue-700">1,546</p>
                    </div>
                </div>

            </div>
            <div className="flex flex-col rounded-xl bg-white mt-2.5 p-2.5 md:w-56">
                <p className="text-base pb-2.5"> Recent</p>
                {recentItem('reactjs')}
                {recentItem('programming')}
                {recentItem('softwareengineering')}
                {recentItem('design')}
                {recentItem('developer')}
            </div>

        </div>
    )
}

export default Sidebar