import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Ban, CheckCircle, Info, NotebookPen} from "lucide-react";

function ApplicationOverview() {
    return (
        <>
            <div className={'grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 '}>
                <Card className={'shadow-none rounded-lg bg-success/10 text-success border-success/10'}>
                    <CardHeader>
                        <CardTitle className={'flex items-center justify-between'}>
                            <div className={'text-2xl font-semibold'}>0</div>
                            <div>
                                <CheckCircle className={'text-success'}/>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Approved Applications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={'bg-success/10 h-2 rounded-full'}>
                            <div className={'bg-success h-full w-2/3 rounded-full'}/>
                        </div>
                    </CardContent>
                </Card>

                <Card className={'shadow-none rounded-lg bg-danger/10 text-danger border-danger/10'}>
                    <CardHeader>
                        <CardTitle className={'flex items-center justify-between'}>
                            <div className={'text-2xl font-semibold'}>0</div>
                            <div>
                                <Ban className={'text-danger'}/>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Rejected Applications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={'bg-danger/10 h-2 rounded-full'}>
                            <div className={'bg-danger h-full w-2/3 rounded-full'}/>
                        </div>
                    </CardContent>
                </Card>

                <Card className={'shadow-none rounded-lg bg-info/10 text-info border-info/10'}>
                    <CardHeader>
                        <CardTitle className={'flex items-center justify-between'}>
                            <div className={'text-2xl font-semibold'}>0</div>
                            <div>
                                <Info/>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Submitted Applications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={'bg-info/10 h-2 rounded-full'}>
                            <div className={'bg-info h-full w-2/3 rounded-full'}/>
                        </div>
                    </CardContent>
                </Card>
                <Card className={'shadow-none rounded-lg bg-warning/10 text-warning border-warning/10'}>
                    <CardHeader>
                        <CardTitle className={'flex items-center justify-between'}>
                            <div className={'text-2xl font-semibold'}>1</div>
                            <div>
                                <NotebookPen/>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Draft Applications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={'bg-warning/10 h-2 rounded-full'}>
                            <div className={'bg-warning h-full w-2/3 rounded-full'}/>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default ApplicationOverview
