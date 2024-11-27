import React from 'react'

interface StepsProps {
    id: string;
    title: string;
    description: string;
}

const steps: StepsProps[] = [
    {
        id: '01',
        title: 'Create User Login Account',
        description: "Create an account on the platform by providing the username and password that you will be using ."
    },
    {
        id: '02',
        title: 'Login using Credentials',
        description: "Using created credentials log in the platform to apply for your desired services."
    },
    {
        id: '03',
        title: 'Choose Services',
        description: "Choose the services you want to apply for and click on apply button"
    },
    {
        id: '04',
        title: 'Fill the Application Form',
        description: "Fill the application form with required information."
    },
    {
        id: '05',
        title: 'Provide Necessary Documents',
        description: "Upload the required documents for the application."
    },
    {
        id: '06',
        title: 'Pay Service Fee',
        description: "Pay the service fee for the application if any."
    }
];

function Steps() {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'}>
            {
                steps.map((step, index) => (
                    <div
                        key={`system-step-${index}`}
                        className={'my-2  border-l-8 rounded p-5 bg-gray-100 border-l-primary'}>
                        <div className={'flex gap-2'}>
                            <h2 className={'text-lg font-semibold mb-2'}>{step.id}.</h2>
                            <div className={'flex flex-col'}>
                                <h2 className={'text-sm font-semibold mb-2'}>
                                    {step.title}
                                </h2>
                                <p className={'text-gray-600 text-sm tracking-wide'}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Steps
