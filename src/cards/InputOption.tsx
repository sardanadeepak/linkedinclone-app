import { IconType } from "react-icons"


type Props = {
    Icon: IconType,
    title: string,
    color: string
}

const InputOption = ({ Icon, title, color }: Props) => {
    return (
        <div className="flex flex-col lg:flex-row items-center cursor-pointer hover:bg-slate-100 hover:rounded-lg p-4">
            <Icon style={{ color }} className="text-xl " />
            <div className="ml-1 ">{title}</div>
        </div>
    )
}

export default InputOption