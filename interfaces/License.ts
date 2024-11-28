import {DataType} from "csstype";
import Attachment = DataType.Attachment;

interface License {
    id: string;
    nameEn: string;
    nameFr: string;
    descriptionEn: string;
    descriptionFr: string;
    validityType: string;
    validity: number,
    processingTime: number,
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    isRenewable: boolean;
    renewalBeforeDays: number;
    shortDescriptionEn: string;
    shortDescriptionFr: string;
    frontUrl: string;
    backUrl: string;
    downloadUrl: string;
    deleteUrl: string;
    priority: number;
    attachments: [];
}

export default License;