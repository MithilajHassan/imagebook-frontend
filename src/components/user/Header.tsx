import { useSignoutMutation } from "@/slices/apiSlice";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { clearAuth } from "@/slices/authSlice";


export default function Header() {
    const [signout] = useSignoutMutation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await signout().unwrap()
            if (res.success) {
                dispatch(clearAuth())
                navigate('/signin')
                toast.success(res.message)
            }
        } catch (err: any) {
            toast.error(err?.data?.message)
        }
    }

    return (
        <nav className="bg-rose-600 h-16 flex fixed w-full top-0 z-20 px-3">
            <div className="grow flex items-center">
                <div className="flex items-center gap-1">
                    <img src="./Logo.jpg" alt="" className="w-8" />
                    <h3 className="font-bold text-xl text-white">Imagebook</h3>
                </div>
            </div>
            <div className="grow flex items-center justify-end">
                <div className="">
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </nav>
    )
}