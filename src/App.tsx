import { useDispatch, useSelector } from "react-redux"
import Feed from "./components/Feed"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Widgets from "./components/Widgets"
import { login, logout, selectUser } from "./store/UserSlice"
import Login from "./components/Login"
import { useEffect } from "react"
import { auth } from "./firebase/config"

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL

        }))
      }
      else {
        // user logged out
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Header />

      {
        !user ? <Login /> : (
          <div className="flex flex-col md:flex-row lg:px-10 mt-20 gap-5">
            <div className="felx flex-col z-40 h-fit w-full px-2.5 md:sticky md:top-20 md:w-56 ">
              <Sidebar />
            </div>
            <div className="flex flex-col lg:flex-row px-2.5 md:px-0 w-full h-full gap-2.5">
              <Feed />
              <Widgets />
            </div>

          </div>
        )
      }
    </div>
  )
}

export default App
