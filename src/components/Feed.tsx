import { MdCreate } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { PiVideoFill } from "react-icons/pi";
import { MdEvent } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import InputOption from "../cards/InputOption";
import Posts from "./Posts";
import { collection, addDoc } from "firebase/firestore";
import { projectFirestore, timeStamp } from "../firebase/config";
import { useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import { useSelector } from "react-redux";
import { selectUser } from "../store/UserSlice";
interface Inputs {
    message: string
}
interface Posts {
    name: string,
    description: string,
    message: string,
    photoUrl: string,
    createdAt: string

}
const Feed = () => {
    const user: any = useSelector(selectUser)
    const {
        register, handleSubmit, formState, reset, formState: { errors, } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = ({ message }) => {
        const createdAt = timeStamp()
        addDoc(collection(projectFirestore, 'posts'),
            {
                message,
                createdAt,
                name: user.displayName,
                description: user.email,
                photoUrl: user.photoUrl ? user.photoUrl : 'src/assets/image.png'
            }
        )
    }
    const { docs } = useFirestore('posts')
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ message: "" })
        }
    }, [formState, reset])
    return (
        <div className="flex flex-col w-full lg:flex-[0.75] text-xs sm:text-sm lg:text-lg ">
            <div className="bg-white p-2.5 pb-5 mb-4 rounded-xl ">
                <div className="flex h-fit items-center justify-between  p-2.5 pb-6 border-2 border-gray-300 rounded-full">
                    <MdCreate className="text-2xl" />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex relative w-full gap-2"
                    >
                        <input type="text" placeholder="What do you want to talk about?"
                            className=" flex-1 bg-none ml-2.5  outline-none tracking-wide"
                            {...register("message", { required: true, minLength: 10 })} />
                        {
                            errors.message && <p className="absolute top-4 mt-5 ml-2 text-red-500">
                                {errors.message.type === "required" && "*This field is required."}
                                {errors.message.type === "minLength" && "*Min length is 10 char."}
                            </p>
                        }

                        <button type="submit" className={`text-white bg-[#0a66c2] p-2.5 rounded-full w-16 text-sm`}>Post</button>
                    </form>

                </div>
                <div className="flex justify-evenly mt-4 ">
                    <InputOption Icon={HiPhoto} title="Photo" color="#70B5F9" />
                    <InputOption Icon={PiVideoFill} title="Video" color="#E7A33E" />
                    <InputOption Icon={MdEvent} title="Event" color="#C0CBCD" />
                    <InputOption Icon={MdArticle} title="Write article" color="#7FC15E" />
                </div>
            </div>
            <div className="mb-4 border-b-2 "></div>

            {/* Posts */}

            {
                docs.map((post) => {
                    return <Posts key={post.id} name={post.name} description={post.description} message={post.message} photoUrl={post.photoUrl} />
                })
            }
        </div>
    )
}

export default Feed