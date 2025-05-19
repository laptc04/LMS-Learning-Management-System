export interface Student {
    userCode: string;
    fullName: string;
    birthDate: string;
    gender: boolean;
    transferFrom: string | null;
    semester: string;
    departmentName: string;
    transferDate: string;
}

export interface Semester {
    id: number;
    name: string;
}

export interface AcademicYear {
    id: number;
    startDate: string;
    endDate: string;
    name: string;
    isInherit: boolean;
    academicParent: number | null;
    semesters: Semester[];
}


export interface Option {
    id: string | number;
    value: string;
}