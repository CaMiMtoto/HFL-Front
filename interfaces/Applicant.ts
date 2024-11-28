interface Applicant {
    id: number;
    name: string;
    email: string;
    phone: string;
    isVerified: boolean;
    verifyToken: string;
    otp: string;
    otpExpiry: string;
    active: boolean;
}
export default Applicant;