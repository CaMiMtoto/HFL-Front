import React from 'react'
import {Edit, File, FileText, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";

function RecentApplications() {
    return (
        <div>
            <h1 className={'text-xl font-bold mb-1 text-gray-800'}>
                Recent Applications
            </h1>
            <p className={'text-xs text-gray-600 mb-4'}>
                Here are the recent applications you have submitted.
            </p>

            <div>
                <div className="flex flex-col gap-2 my-3">
                    {
                        Array(5).fill(null).map((_, index) => (
                            <div
                                key={index}
                                className="border border-dotted rounded-md p-2 border-gray-100 bg-gray-50">
                                <div className="flex gap-4">
                                    <div className={'shrink-0'}>
                                        <div className="bg-primary/10  rounded-full p-2">
                                            <FileText/>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h5
                                            className="text-primary text-sm font-semibold mb-2">
                                            Request for Digital Operating
                                            License
                                        </h5>
                                        <p className="text-gray-600 text-xs">This is service is requested by all
                                            healthcare facilities currently holding paper-based operating licenses.
                                        </p>

                                        <div
                                            className="mt-2 flex justify-between w-full flex-col gap-2 lg:flex-row">
                                            <div className="flex flex-col gap-2  flex-shrink-0">
                                                <div className="text-gray-600 text-xs">Created At: 2024-04-25 08:26
                                                </div>
                                                <div>
                                            <span
                                                className="text-xs  px-2 font-semibold bg-warning/10 text-warning rounded-full py-1 ms-1">Draft</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 items-center xl:justify-end flex-wrap">
                                                <Button
                                                    size={"sm"}
                                                    className="px-2 py-1 shadow-none rounded-lg inline-flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-white"
                                                >
                                                    <Edit size={16}/>
                                                    Edit
                                                </Button>
                                                <Button color={"danger"}
                                                        size={"sm"}
                                                        className="px-2 py-1 shadow-none rounded-md inline-flex items-center justify-center gap-2 bg-danger/10 text-danger font-semibold text-sm hover:bg-danger hover:text-danger"
                                                >
                                                    <Trash size={16}/>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default RecentApplications
