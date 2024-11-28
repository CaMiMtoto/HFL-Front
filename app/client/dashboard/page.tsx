import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ApplicationOverview from "@/components/client/dashboard/application-overview";
import LicensesCard from "@/components/client/dashboard/licenses-card";
import RecentApplications from "@/interfaces/RecentApplications";

function Dashboard() {
    return (
        <div>

            <Breadcrumb className={'bg-gray-100 px-3 py-2 mb-4 rounded-md'}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/client/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Analytics</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>
                <h1 className={'text-xl font-semibold mb-4'}>
                    Application Overview
                </h1>
                <ApplicationOverview/>

                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-4 my-4'}>
                    <LicensesCard/>
                    <RecentApplications/>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
