"use client"
import React, {useEffect, useState} from 'react'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {AlertCircle, Loader, LoaderCircle, RotateCw} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useRouter, useSearchParams} from "next/navigation";
import {decodeId} from "@/lib/utils";
import Applicant from "@/interfaces/Applicant";
import {http} from "@/lib/axiosInstance";

const formSchema = z.object({
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50)
});

function SetPassword() {
    const [applicantId, setApplicantId] = useState<number>(0);
    const searchParams = useSearchParams();
    const {toast} = useToast()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [applicant, setApplicant] = useState<Applicant>();
    const [loadingApplicant, setLoadingApplicant] = useState<boolean>(false);

    useEffect(() => {
        const queryAppId = searchParams.get('app-id');
        if (queryAppId) {
            const appId = decodeId(queryAppId);
            setApplicantId(appId); // Initialize applicantId from query string
            getApplicant(appId)
                .catch((err) => console.log(err));
        }
    }, [searchParams]);

    const getApplicant = async (id: number) => {
        setLoadingApplicant(true);
        try {
            const response = await http.get(`/register/applicant/details?id=${id}`);
            const data = await response.data;
            setApplicant(data.applicant);
        } catch (err) {
            console.log(err);
            setError("An error occurred while fetching applicant details. try refreshing the page.");
        } finally {
            setLoadingApplicant(false);
        }
    }


// 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    })

// 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError("");
        setLoading(true);
        http.post('/register/set-password', {
            "password": values.password,
            "applicantId": applicantId
        }).then((response) => {
            const data = response.data;
            if (data.action === 0) {
                setLoading(false);
                setError(data?.message ?? "An error occurred while setting new password. Please try again later.");
            } else {
                toast({
                    className: "bg-success",
                    title: "Password set successfully",
                    description: "You can now login with your new password.",
                });
                router.push('/login');
            }
        })
            .catch((err) => {
                setLoading(false);
                setError(err?.message || "An error occurred while registering. Please try again later.");
            });
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
                    <Card className={'shadow-none h-full'}>
                        <CardHeader>
                            <CardTitle className={'text-lg font-semibold'}>
                                Set Password
                            </CardTitle>
                            <CardDescription>
                                Please enter your new password to continue. after setting your password, you can login
                                with your new password.
                            </CardDescription>
                        </CardHeader>
                        {
                            applicant && <>
                                <CardContent>
                                    {
                                        error && <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4"/>
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>
                                                {error}
                                            </AlertDescription>
                                        </Alert>
                                    }
                                    <Form  {...form} >
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"
                                              autoComplete={"off"}>
                                            {
                                                applicant && <div className="flex flex-col gap-4">
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input disabled value={applicant.name} type="text"/>
                                                        </FormControl>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input disabled value={applicant.email} type="text"/>
                                                        </FormControl>
                                                    </FormItem>
                                                </div>
                                            }
                                            <FormField control={form.control} name="password" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter new password" {...field} type="password"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                            <FormField control={form.control} name="confirmPassword" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter new password" {...field} type="password"/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>

                                            <Button type="submit"
                                                    className={'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark mt-4 w-full'}
                                                    disabled={loading}>
                                                {loading ? "Loading..." : "Set Password"}
                                                {loading && <Loader className={'h-4 w-4 ml-2 animate-spin'}/>}

                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                                <CardFooter className={'justify-center'}>
                                    <div className={'text-center'}>
                                        <p className={'text-sm font-normal'}>
                                            Already have an account?{" "}
                                            <Link href="/login" className={'text-primary font-semibold'}>
                                                Login
                                            </Link>
                                        </p>
                                    </div>
                                </CardFooter>
                            </>
                        }

                        {loadingApplicant && <div className={'flex justify-center flex-col items-center h-2/3'}>
                            <LoaderCircle className={'h-8 w-8 animate-spin text-primary hover:text-primary/30'}/>
                            <p className={'ml-2 text-sm font-normal text-gray-500 tracking-wide leading-relaxed'}>Loading
                                applicant details...</p>
                        </div>}
                        {!loadingApplicant && !applicant && error && <div className={'m-5'}>
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertTitle>No applicant found</AlertTitle>
                                <AlertDescription>
                                    {error}
                                    <Button className={'mt-4'} onClick={() => getApplicant(applicantId)}
                                            variant="outline">
                                        Try again <RotateCw className={'h-4 w-4 ml-2'}/>
                                    </Button>
                                </AlertDescription>
                            </Alert>
                        </div>}

                    </Card>
                </div>
            </div>

        </>
    )
}

export default SetPassword
