import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResendOtpMutation, useVerifyUserMutation } from "@/slices/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const otpSchema = z.object({
    otp: z
        .string()
        .regex(/^[0-9]{4}$/, { message: "OTP must be a 4-digit number" }),
})

type Props = {
    email: string;
    forgotPassword?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OTPForm({ email, forgotPassword}: Props) {
    const [timer, setTimer] = useState(60);
    const [verifyUser , {isLoading}] = useVerifyUserMutation()
    const [resendOtp] = useResendOtpMutation()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (data: { otp: string }) => {
        try {
            const res = await verifyUser({
                email,
                otp: Number(data.otp)
            }).unwrap()
            if (res.success) {
                if (forgotPassword){
                    forgotPassword(true)
                }else{
                    navigate('/signin')
                }
            }
        } catch (err: any) {
            toast.error(err.data.message)
        }
    };

    const handleResendOTP = async () => {
        const res = await resendOtp({ email }).unwrap()
        if (res.success) {
            toast.success(res.message)
            setTimer(60);
        }
    };

    useEffect(() => {
        let countdown: NodeJS.Timeout;
        if (timer > 0) {
            countdown = setTimeout(() => setTimer(timer - 1), 1000);
        }
        return () => clearTimeout(countdown);
    }, [timer]);

    return (
        <div className="w-full min-h-screen flex items-center">
            <div className="shadow bg-white w-5/12 rounded-md mx-auto py-4 my-10">
            { isLoading && <Loader />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-12">
                        <h3 className="font-bold text-center text-xl">Enter OTP</h3>

                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-indigo-50"
                                            placeholder="Enter the 6-digit OTP"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="text-center">
                            <Button type="submit" className="w-full my-4">
                                Verify OTP
                            </Button>
                        </div>

                        <div className="text-center">
                            <Button
                                type="button"
                                className="w-full"
                                onClick={handleResendOTP}
                                disabled={timer > 0}
                            >
                                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
