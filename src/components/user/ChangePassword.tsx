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
import { useChangePasswordMutation } from "@/slices/apiSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    newPassword: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[^\s]{4,18}$/, {
            message:
                "Password must be 4-18 characters, include 1 lowercase letter, 1 uppercase letter, 1 special character, and 1 digit",
        }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function ChangePasswordForm({ email }: { email: string }) {
    const [changePassword] = useChangePasswordMutation()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async ({ newPassword }: z.infer<typeof formSchema>) => {
        try {
            const res = await changePassword({ email, newPassword }).unwrap()

            if (res.success) {
                toast.success("Password changed successfully!")
                navigate('/signin')
            }
        } catch (err: any) {
            toast.error(err?.data?.message);
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center">
            <div className="shadow bg-white w-5/12 rounded-md mx-auto py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-12">
                        <h3 className="font-bold text-center text-xl">Change Password</h3>

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="bg-indigo-50"
                                            placeholder="Enter new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="bg-indigo-50"
                                            placeholder="Confirm new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="text-center">
                            <Button type="submit" className="w-full my-4">
                                Change Password
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
