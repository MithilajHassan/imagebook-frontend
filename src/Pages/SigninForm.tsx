import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSigninMutation } from "@/slices/apiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/slices/authSlice";
import { useEffect } from "react";
import { RootState } from "@/store";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[^\s]{4,18}$/, {
            message:
                "Password must be 4-18 characters, include 1 lowercase letter, 1 uppercase letter, 1 special character, and 1 digit",
        }),
});

export default function SigninForm() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [signin] = useSigninMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (userInfo) {
            navigate('/images')
        }
    }, [])

    const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
        try {
            const res = await signin({
                email,
                password
            }).unwrap()

            if (res.success) {

                dispatch(setCredentials({
                    _id: res.userData._id!,
                    name: res.userData.name,
                    email: res.userData.email,
                    phone: res.userData.phone
                }))

                navigate('/images')
            }
        } catch (err: any) { 
            toast.error(err?.data?.message)
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center">
            <div className="shadow bg-white w-5/12 rounded-md mx-auto py-4 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mx-12">
                        <h3 className="font-bold text-center text-xl">Sign In</h3>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="bg-indigo-50" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="bg-indigo-50" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="text-center">
                            <Link className="text-blue-800" to={'/forgotpassword'}>Forgot password?</Link>
                        </div>

                        <div className="text-center">
                            <Button type="submit" className="w-full my-4">
                                Sign In
                            </Button>
                        </div>

                        <div className="text-center">
                            <p>New user? <Link className="text-blue-800" to={'/signup'}>Sign up</Link></p>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
}
