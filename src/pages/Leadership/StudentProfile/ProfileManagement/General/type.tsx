export interface Student {
    studentStatusId: number;
    classId: number;
    userCode: string;
    fullName: string;
    email: string;
    startDate: string;
    academicYear: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
    };
    class: {
        id: number;
        name: string;
    };
    active: boolean | null;
    image: string;
    gender: boolean;
    ethnicity: string;
    religion: string;
    placeOfBirth: string;
    birthDate: string;
    studyMode: string;
    phone: string;
    address: string;
    provinceId: string;
    districtId: string;
    wardId: string;
    alias: string;
    admissionType: string;
    national: string;
    fullnameFather: string;
    birthFather: string;
    workFather: string;
    phoneFather: string;
    fullnameMother: string;
    birthMother: string;
    workMother: string;
    phoneMother: string;
    fullnameGuardianship: string;
    birthGuardianship: string;
    workGuardianship: string;
    phoneGuardianship: string;
}