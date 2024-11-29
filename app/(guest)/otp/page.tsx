"use client"
import React, {useEffect, useState} from 'react'


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
import {http} from "@/lib/axiosInstance";
import RegisterResponse from "@/interfaces/RegisterResponse";
import { Loader} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {useRouter, useSearchParams} from "next/navigation";
import {resendOtp} from "@/services/authService";
import {decodeId, encodeId} from "@/lib/utils";
import Link from "next/link";

const FormSchema = z.object({
    pin: z.string().min(5, {
        message: "Your one-time password must be 5 digits.",
    }),
})


function OtpPage() {
    const [applicationId, setApplicationId] = useState<number>(0);
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const {toast} = useToast();
    const router = useRouter();
    const [token, setToken] = useState('');

    useEffect(() => {
        const queryToken = searchParams.get('token'); // Extract token from query string
        const queryAppId = searchParams.get('app-id');
        if (queryToken) {
            setToken(queryToken); // Initialize token from query string
        }
        if (queryAppId) {
            setApplicationId(decodeId(queryAppId)); // Initialize applicationId from query string
        }

    }, [searchParams]);


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
                    router.replace(`/set-password?app-id=${encodeId(applicationId)}`);
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
        setLoading(true);
        setError("")
        form.reset();
        resendOtp(applicationId)
            .then((response) => {
                const applicant = response.applicant;
                const newToken = applicant?.verifyToken ?? '';
                setToken(newToken);
                // Update the query string to reflect the new token
                router.replace(`?token=${newToken}&app-id=${encodeId(applicationId)}`);
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

            <div className="my-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                <div className=" order-2 lg:order-1">
                    <div className="  bg-no-repeat bg-cover">
                        <img
                            src="https://licensing.moh.gov.rw/assets/register-743a39cc.png"
                            className="tw-max-h-[600px]"
                            alt="Image"/>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <Card className={'shadow-none border-slate-200 rounded'}>
                        <CardHeader
                            className={' text-3xl uppercase font-bold text-gray-800 leading-snug tracking-wide'}>OTP
                            Verification</CardHeader>
                        <CardContent>
                            <p className={'text-gray-600 text-sm leading-snug tracking-wide'}>
                                Please enter the OTP (One Time Password) to verify your account. <br/> The 5 digits OTP
                                has been
                                sent to your email.
                            </p>
                            {
                                error && <Alert variant="destructive" className={'mt-4  items-center'}>
                                    <AlertTitle>Oops!</AlertTitle>
                                    <AlertDescription className={'mb-0'}>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            }
                            <div className={'mt-10'}>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className={' w-full block mb-3'}>
                                                        One-Time Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={5} {...field}>
                                                            <InputOTPGroup
                                                                className={'flex justify-between items-center'}>
                                                                <InputOTPSlot
                                                                    className={' border px-6 py-6'}
                                                                    index={0}/>
                                                                <InputOTPSlot
                                                                    className={' border px-6 py-6'}
                                                                    index={1}/>
                                                                <InputOTPSlot
                                                                    className={' border px-6 py-6'}
                                                                    index={2}/>
                                                                <InputOTPSlot
                                                                    className={' border px-6 py-6'}
                                                                    index={3}/>
                                                                <InputOTPSlot
                                                                    className={' border px-6 py-6 '}
                                                                    index={4}/>
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormMessage className={' '}/>
                                                </FormItem>
                                            )}
                                        />

                                        <div className={'flex w-full  gap-4 items-center'}>
                                            <Button disabled={loading} type="submit" size={'lg'}>
                                                Verify OTP
                                                {loading && <Loader className={'w-5 h-5 ml-2 animate-spin'}/>}
                                            </Button>

                                        </div>
                                    </form>
                                </Form>

                            </div>

                        </CardContent>
                        <CardFooter className={'flex-col justify-between items-start'}>
                            <p className={'mt-2 text-gray-600 text-sm'}>
                                Didn&#39;t receive the OTP? <button type="button" onClick={resendCode}
                                                                    disabled={loading}
                                                                    className={'text-primary ml-2'}>Resend OTP</button>
                            </p>
                            <p className={'mt-2 text-gray-600 text-sm'}>
                                Already registered? <Link href="/login" className={'text-primary'}>Login</Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </>
    )
}

export default OtpPage
