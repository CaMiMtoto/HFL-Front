import Image from "next/image";
import Steps from "@/components/Steps";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div className={'grid grid-cols-1 lg:grid-cols-2 '}>
                <div className={'my-10'}>
                    <h1 className={'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary uppercase leading-snug'}>
                        Health Facility
                        Licensing Platform
                    </h1>
                    <p className={'text-gray-600 text-sm leading-loose tracking-wide'}>
                        The Health Facility Licensing Platform is an innovative system that revolutionizes the licensing
                        process for health facilities. It offers a user-friendly solution, enhancing accessibility,
                        transparency, and efficiency. This platform reduces processing time, minimizes required
                        documentation, and eliminates physical visits to regulatory offices. With real-time application
                        tracking and seamless integrations, it sets a new standard for transparency and accountability,
                        improving healthcare service delivery and ensuring regulatory compliance.
                    </p>
                    <div className={'flex gap-4 mt-4 items-center'}>
                        <Link href={'/login'}
                              className={'btn bg-success text-white hover:bg-success/80 rounded-xl py-3 px-5'}>Login
                        </Link>
                        <Link href={'/register'}
                              className={'btn bg-primary text-white hover:bg-primary/80 rounded-xl py-3 px-5'}>Register
                        </Link>
                    </div>
                </div>
                <div>
                    {/*https://licensing.moh.gov.rw/assets/homeBg-7025965c.png*/}
                    <img src={'https://licensing.moh.gov.rw/assets/homeBg-7025965c.png'} alt={'Doctors'}/>
                </div>
            </div>

            {/*Steps:*/}
            <section>
                <h1 className={'text-2xl  font-semibold mb-4  leading-snug'}>
                    Steps to Follow
                </h1>

                <Steps/>

            </section>

        </div>
    );
}
