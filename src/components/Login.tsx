import { useForm, SubmitHandler } from "react-hook-form"
import LinkedIn from "../assets/linkedin-1.png"
import { useEffect } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { login } from "../store/UserSlice"
interface User {
    name: string,
    photoUrl: string | null,
    email: string,
    password: string
}
const Login = () => {

    const { register, trigger, watch, handleSubmit, formState, reset, formState: { errors } } = useForm<User>()
    const userName: string = watch("name")
    const userPhotoUrl: string | null = watch("photoUrl")
    const userEmail: string = watch("email")
    const userPassword: string = watch("password")
    const dispatch = useDispatch()

    const loginToApp: SubmitHandler<User> = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            dispatch(login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
                photoUrl: userCredential.user.photoURL
            }))

        }).catch((error => {
            console.log(error.message)
            alert(error.message)
        }))
    }

    const joinNow = async () => {

        const isValid = await trigger();
        if (isValid) {
            reset()
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    updateProfile(userCredential.user, {
                        displayName: userName,
                        photoURL: userPhotoUrl
                    })
                        .then(() => {
                            // Profile Updated .then
                            dispatch(login({
                                email: userCredential.user.email,
                                uid: userCredential.user.uid,
                                displayName: userCredential.user.displayName,
                                photoUrl: userCredential.user.photoURL
                            }))


                        })
                        .catch((error) => {
                            // profile updated .catch
                            console.log(error.message)

                        })

                })
                // userCreate Catch
                .catch(error => {
                    console.log(error.message)
                    alert(error.message)
                })

        }
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                name: "",
                photoUrl: null,
                email: "",
                password: ""
            })
        }
    }, [formState, reset])
    return (
        <div className="flex flex-col justify-center items-center mt-20 py-16 ">
            <img src={LinkedIn} alt="LinkedIn Image" className="object-cover w-64 h-20 my-5" />
            <form className="flex flex-col gap-5 p-2.5"
                onSubmit={handleSubmit(loginToApp)}>
                <input type="text" placeholder="Full Name (required if registering)"
                    className="text-xl w-80 border-2 border-black rounded-lg p-2.5 outline-none "
                    {...register("name", { required: true, minLength: 4, maxLength: 20 })} />{
                    errors.name && <p className="-mt-5 text-red-500">
                        {errors.name.type === "required" && "*This field is required."}
                        {errors.name.type === "minLength" && "*Min length is 4 char."}
                        {errors.name.type === "maxLength" && "*Max length is 20 char."}
                    </p>
                }

                <input type="text" placeholder="Profile pic URL (optional)"
                    className="text-xl w-80 border-2 border-black rounded-lg p-2.5 outline-none"
                    {...register("photoUrl", { required: false })} />

                <input type="text" placeholder="Email"
                    className="text-xl w-80 border-2 border-black rounded-lg p-2.5 outline-none"
                    {...register("email", {
                        required: true,
                        pattern: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,}$/i,

                    })} />{
                    errors.email && <p className="-mt-5 text-red-500">
                        {errors.email.type === "required" && "*This field is required."}
                        {errors.email.type === "pattern" && "*Invalid email address"}
                    </p>
                }

                <input type="password" placeholder="Password"
                    className="text-xl w-80 border-2 border-black rounded-lg p-2.5 outline-none"
                    {...register("password", { required: true, minLength: 6 })} />{
                    errors.password && <p className="-mt-5 text-red-500">
                        {errors.password.type === "required" && "*This field is required."}
                        {errors.password.type === "minLength" && "*Password must be 6 char long."}
                    </p>
                }
                <button type="submit" className="px-6 text-base h-10 w-80 text-white bg-[#0a66c2] font-semibold inline-block text-center rounded-lg" >Sign In</button>
                <p className="font-normal text-center">New to LinkedIn?
                    <span onClick={() => joinNow()}
                        style={{ color: "#0a66c2" }} className="font-medium cursor-pointer"> Register Now</span>
                </p>
            </form>

        </div >
    )
}

export default Login