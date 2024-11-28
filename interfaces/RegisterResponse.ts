import Applicant from "@/interfaces/Applicant";

interface RegisterResponse {
    token: string;
    message: string;
    action: number
    applicant: Applicant
}

export default RegisterResponse;