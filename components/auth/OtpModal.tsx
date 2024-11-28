"use client"
import React, {useState} from 'react'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

// import {toast} from "@/components/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {useToast} from "@/hooks/use-toast";
import Applicant from "@/interfaces/Applicant";
import {http} from "@/lib/axiosInstance";
import RegisterResponse from "@/interfaces/RegisterResponse";
import {AlertCircle, Loader} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {resendOtp} from "@/services/authService";

const FormSchema = z.object({
    pin: z.string().min(5, {
        message: "Your one-time password must be 5 digits.",
    }),
})

function OtpModal({isOpen, applicant}: { isOpen: boolean, applicant: Applicant | null }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const {toast} = useToast()
    const [token, setToken] = useState<string | null>(applicant?.verifyToken ?? '');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!token) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No token found. Please try again later."
            });
            return;
        }
        setLoading(true);
        setError("");
        http.post<RegisterResponse>(`/register/verify-otp/${token}`, {
            "otp": data.pin
        })
            .then(res => {
                const data = res.data;
                if (data.action == 0) {
                    setLoading(false);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: data.message,
                    });
                    setError(data.message);
                } else {
                    toast({
                        color: "green",
                        title: "Success",
                        description: "OTP verified successfully."
                    });
                    window.location.href = "/login";
                }

            }).catch(err => {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Error",
                description: err?.message ?? "An error occurred. Please try again later.",
            });
            setError(err?.message ?? "An error occurred. Please try again later.");
        });
    }


    const resendCode = () => {
        if (!applicant) return;
        setLoading(true);
        setError("")
        form.reset();
        resendOtp({
            applicantId: applicant?.id,
        })
            .then((response) => {
                applicant = response.applicant;
                setToken(applicant?.verifyToken ?? '');
                toast({
                    className: 'bg-green-100',
                    title: "Success",
                    description: "OTP resent successfully.",
                    duration: 5000,
                });
            })
            .catch((err) => {
                console.log(err);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: err?.message ?? "An error occurred. Please try again later.",
                });
                setError(err?.message ?? "An error occurred. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            })
    }


    return (
        <>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={'text-center text-2xl'}>OTP Verification</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className={'text-center'}>
                                Please enter the OTP (One Time Password) to verify your account. <br/> The 5 digits OTP
                                has been
                                sent to your email.
                            </p>
                            {
                                error && <Alert variant="destructive" className={'mt-4'}>
                                    <AlertCircle className="h-4 w-4 hidden sm:block"/>
                                    <AlertTitle>Oops!</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            }
                            <div className={'my-10'}>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className={'text-center w-full block mb-3'}>One-Time
                                                        Password</FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={5} {...field}>
                                                            <InputOTPGroup
                                                                className={'w-full flex justify-between items-center'}>
                                                                <InputOTPSlot
                                                                    className={'rounded border px-4 py-3 md:min-w-16'}
                                                                    index={0}/>
                                                                <InputOTPSlot
                                                                    className={'rounded border px-4 py-3 md:min-w-16'}
                                                                    index={1}/>
                                                                <InputOTPSlot
                                                                    className={'rounded border px-4 py-3 md:min-w-16'}
                                                                    index={2}/>
                                                                <InputOTPSlot
                                                                    className={'rounded border px-4 py-3 md:min-w-16'}
                                                                    index={3}/>
                                                                <InputOTPSlot
                                                                    className={'rounded border px-4 py-3 md:min-w-16'}
                                                                    index={4}/>
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormMessage className={'text-center '}/>
                                                </FormItem>
                                            )}
                                        />

                                        <div className={'flex w-full justify-center gap-4 items-center'}>
                                            <Button disabled={loading} type="submit">
                                                Verify OTP
                                                {loading && <Loader className={'w-5 h-5 ml-2 animate-spin'}/>}
                                            </Button>
                                            <AlertDialogCancel disabled={loading}
                                                               className={'mt-0'}>Cancel</AlertDialogCancel>
                                        </div>
                                    </form>
                                </Form>

                            </div>
                            <p className={'text-center mt-2'}>
                                Didn&#39;t receive the OTP? <button type="button" onClick={resendCode}
                                                                    disabled={loading}
                                                                    className={'text-primary ml-2'}>Resend OTP</button>
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default OtpModal
