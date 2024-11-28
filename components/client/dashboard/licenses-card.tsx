'use client'
import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {ChevronRight} from "lucide-react";
import {http} from "@/lib/axiosInstance";
import License from "@/interfaces/License";
import ShimmerList from "@/components/shimmer-list";

function LicensesCard() {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchLicenses = () => {
        setLoading(true);
        http.get(`/license/list?size=6&page=0&search=`)
            .then(({data}) => {
                const licenseData = data.licenses;
                setLicenses(licenseData.content as License[]);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchLicenses();
    });

    return (
        <div>
            <h1 className={'text-xl font-bold mb-1 text-gray-800'}>Licenses</h1>
            <p className={'text-xs text-gray-600 mb-4'}>
                Below are the list of available licenses for use in the platform.
                Click on the &#34;Apply&#34; button to apply for a license.
            </p>
            {
                licenses.map((license, index) => (
                    <div
                        key={`license-${index}`}
                        className={'border bg-gray-100 rounded-lg p-4 my-2'}>
                        <div className={'flex justify-between items-center mb-2'}>
                            <h4 className={'text-sm font-semibold mb-1'}>
                                {license.nameEn}
                            </h4>
                            <Link href={'/'}
                                  className={'text-xs font-semibold mb-1 inline-flex items-center border border-primary-500 rounded-full px-2 py-1 text-primary-500 hover:bg-primary hover:text-white'}>
                                Apply <ChevronRight size={20}/>
                            </Link>
                        </div>
                        <p className={'text-xs text-gray-600'}>
                            {license.shortDescriptionEn}
                        </p>
                    </div>
                ))
            }
            {
                licenses.length == 0 && loading && (
                    <div className={'flex flex-col gap-4'}>
                        <ShimmerList/>
                        <ShimmerList/>
                        <ShimmerList/>
                        <ShimmerList/>
                        <ShimmerList/>
                    </div>
                )
            }

        </div>
    )
}

export default LicensesCard
