import { IconType } from "react-icons"
import Avatar from "./Avatar"

interface Props {
    Icon: IconType | null,
    title: string,
    avatar: string | null,
    onClick: any | null
}

const HeaderOptions = ({ Icon, title, avatar, onClick }: Props) => {
    return (
        <div onClick={onClick}
            className="flex flex-col items-center cursor-pointer text-gray-500 hover:text-black">
            {Icon && <Icon className="text-xl" />}
            {
                avatar && <Avatar src={avatar} className="object-contain h-6 w-6 rounded-full" />
            }
            <h4 className="hidden sm:block text-xs md:text-sm font-light">{title}</h4>
        </div>
    )
}

export default HeaderOptions