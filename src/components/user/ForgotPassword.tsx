import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useResendOtpMutation } from "@/slices/apiSlice"; 

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

type Props = {
    setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
    setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  }

export default function ForgotPasswordForm({setOtpSent,setUserEmail}:Props) {
    const [sendOtp] = useResendOtpMutation()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
        try {
            const res = await sendOtp({ email }).unwrap()

            if (res.success) {
                toast.success("OTP sent successfully! Please check your email.")
                setUserEmail(email)
                setOtpSent(true)
            }
        } catch (err: any) {
            toast.error(err?.data?.message);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center">
            <div className="shadow bg-white w-5/12 rounded-md mx-auto py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-12">
                        <h3 className="font-bold text-center text-xl">Forgot Password</h3>
                        <p className="text-center text-gray-600">
                            Enter your email to receive a one-time password (OTP) for password recovery.
                        </p>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-indigo-50"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="text-center">
                            <Button type="submit" className="w-full my-4">
                                Send OTP
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
