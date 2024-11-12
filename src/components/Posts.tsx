import { SlLike } from "react-icons/sl";
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import Avatar from "../cards/Avatar"
import InputOption from "../cards/InputOption"
type Props = {
    name: string,
    description: string,
    message: string
    photoUrl: string
}
const Posts = ({ name, description, message, photoUrl }: Props) => {
    return (
        <div className="bg-white p-2.5 pb-5 mb-2.5 rounded-xl">
            <div className="flex mb-2.5">
                <Avatar src={`${photoUrl}`} className={"object-fill h-16 w-16 rounded-full"} />
                <div className="ml-2.5">
                    <h2 className="text-base font-semibold">{name}</h2>
                    <p className="text-xs text-gray-400">{description}</p>
                </div>
            </div>
            <div className="">
                <p>{message}</p>
            </div>

            <div className="flex justify-evenly">
                <InputOption Icon={SlLike} title={"Like"} color={"gray"} />
                <InputOption Icon={BiSolidCommentDetail} title={"Comment"} color={"gray"} />
                <InputOption Icon={IoShareSocialOutline} title={"Share"} color={"gray"} />
                <InputOption Icon={IoMdSend} title={"Send"} color={"gray"} />

            </div>

        </div>

    )
}

export default Posts