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
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Checkbox} from "@/components/ui/checkbox";
import {loginUser} from "@/services/authService";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {AlertCircle, Loader} from "lucide-react";
import {useRouter} from 'next/navigation'
import {toast} from "@/hooks/use-toast";

const formSchema = z.object({
    email: z.string().min(2).max(50).email("Invalid email address"),
    password: z.string().min(2).max(50),
    rememberMe: z.boolean().optional(),
})

function Login() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError("");
        setLoading(true);
        try {
            // Simulate login call
            const response = await loginUser({
                email: values.email,
                password: values.password,
            });

            if (response.action === 1) {
                const token = response.token;

                // Call the API to set the cookie
                const res = await fetch('/api/auth/set-cookie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({token}),
                });

                if (res.ok) {
                    toast({
                        className: "bg-success/10",
                        title: "Login Success",
                        description: "Login successfully, redirecting to dashboard",
                    });

                    // Redirect to dashboard after successful login
                    router.push("/client/dashboard");
                } else {
                    setError('Failed to set token cookie.');
                }
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            console.log(err);
            setError('An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="my-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                <div className="order-2 lg:order-1">
                    <div className="  bg-no-repeat bg-cover">
                        <img
                            src="https://licensing.moh.gov.rw/assets/login-bf3122aa.png"
                            className="tw-max-h-[600px]"
                            alt="Image"/>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <Card className={'shadow-none'}>
                        <CardHeader>
                            <CardTitle className={'text-3xl font-bold'}>Hello</CardTitle>
                            <CardDescription>
                                Sign in to your Account by using
                                your email address and password.
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
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email address" {...field}
                                                           type="email"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Please enter your email address.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type={"password"}
                                                           placeholder="Password" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({field}) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className={'text-sm font-normal'}>
                                                    Remember my device for 30 days.
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit"
                                            className={'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark mt-4 w-full'}
                                            disabled={loading}>
                                        Sign in
                                        {loading && <Loader className={'h-4 w-4 ml-2 animate-spin'}/>}

                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className={'justify-center'}>
                            <div className={'text-center'}>
                                <p className={'text-sm font-normal'}>
                                    Don&#39;t have an account?{" "}
                                    <Link href="/register" className={'text-primary font-semibold'}>
                                        Register
                                    </Link>
                                </p>
                                <br/>
                                <p className={'text-sm font-normal'}>
                                    Forgot your password?{" "}
                                    <Link href="/public" className={"text-primary font-semibold"}>
                                        Reset Password
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

export default Login
