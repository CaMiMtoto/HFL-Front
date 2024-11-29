"use client"
import React, {useState} from 'react'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {registerUser} from "@/services/authService";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {AlertCircle, Loader} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {encodeId} from "@/lib/utils";

const formSchema = z.object({
    name: z.string({message: "Name is required"}).min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
    email: z.string({message: "Email is required"}).min(2, "Email must be at least 2 characters long").max(50, "Email must be at most 50 characters long").email("Invalid email address"),
    phone: z.string({message: "Phone number is required"}).min(10, "Phone number must be at least 10 digits long").max(50, "Phone number must be at most 50 digits long"),
});

function Register() {
    const {toast} = useToast()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError("");
        setLoading(true);
        registerUser({
            email: values.email,
            name: values.name,
            phone: values.phone,
        }).then((response) => {
            const data = response.data;
            if (data.action === 0) {
                setError(data?.message ?? "An error occurred while registering. Please try again later.");
            } else {
                toast({
                    variant: "default",
                    title: "Registration successful",
                    description: "Please check your email for the OTP",
                    color: "success"
                });
                router.push(`/otp?token=${data.applicant.verifyToken}&app-id=${encodeId(data.applicant.id)}`);
            }
        })
            .catch((err) => {
                console.log(err);
                setError(err?.message || "An error occurred while registering. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
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
                    <Card className={'shadow-none'}>
                        <CardHeader>
                            <CardTitle className={'text-3xl font-bold'}>
                                Create an Account
                            </CardTitle>
                            <CardDescription>
                                Please enter your details to create an account.
                            </CardDescription>
                        </CardHeader>
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
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete={"off"}>
                                    <FormField control={form.control} name="name" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field}
                                                       type="text"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="email" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email address" {...field}
                                                       type="email"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="phone" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Phone number" {...field}
                                                       type="tel"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit"
                                            className={'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark mt-4 w-full'}
                                            disabled={loading}>
                                        Save & Continue
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
                    </Card>
                </div>
            </div>

        </>
    )
}

export default Register
