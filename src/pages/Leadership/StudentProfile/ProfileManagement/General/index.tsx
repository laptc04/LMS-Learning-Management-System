
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Dropdown from '../../../../../components/Dropdown';
import trashIcon from '../../../../../assets/images/fi_trash-2.png';
import { Camera, X } from 'lucide-react';
import apiInstance from '../../../../../services/api';
import { useParams } from 'react-router';
import StatusComponent from '../../../../../components/Status';
import { Student } from './type';

const GeneralStudent = () => {

    const [student, setStudent] = useState<Student | null>();
    const id = useParams();
    useEffect(() => {
        const fetchStudentData = async () => {
            if (!id) return;

            try {
                const response = await apiInstance.get(`/api/Student/findstudentbyusercode?userCode=${id.id}`);
                if (response.data?.status === 0 && response.data) {
                    setStudent(response.data.data); // Gán trực tiếp object thay vì lấy phần tử đầu tiên của mảng
                } else {
                    throw new Error("Dữ liệu không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu học viên:", error);
                setStudent(null);
            }
        };

        fetchStudentData();
    }, [id]);
    useEffect(() => {
        const fetchClassStudentById = async () => {
            if (!id) return;

            try {
                const response = await apiInstance.get(`/api/Student/findstudentbyusercode?userCode=${id.id}`);
                if (response.data?.status === 0 && response.data) {
                    setStudent(response.data.data); // Gán trực tiếp object thay vì lấy phần tử đầu tiên của mảng
                } else {
                    throw new Error("Dữ liệu không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu học viên:", error);
                setStudent(null);
            }
        };

        fetchClassStudentById();
    }, [id]);
    console.log(student);
    const formatDate = (isoString: any) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('vi-VN');
    };
    return (
        <div className=" px-5 ">
            <div className="max-w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className="bg-[#CC5C00] text-white font-bold text-lg p-3 rounded-tl-lg rounded-tr-lg">Thông tin chung</div>
                <div className="grid grid-cols-[0.75fr_1.5fr_1.5fr_1.5fr] gap-6 p-4 rounded-lg w-full">
                    <div className="relative w-36 h-36">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/40ff/4641/f62e8bafd3c8fe18d1a361f7b186bc9a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aqSQRAlcS9ksvkd~NVnp57HYV5qLvklnLk52Bz68VLHtWgdXgOeM8k0Rd17poaft68MZKVwSfqn5AhV25Cd2UZPls9f8MFiSNlhvBEYkjC0ywsjtBZ0YwJinqS3UP2bVTqLMURihf6nv6eSPGpBNB9fMVPV7EJQBcX~aueZ1zEi6oCXc7mkeCoVc4hml1lZ2OyqPfEh~OCMasWY3w0Ax6uJUkst4CKvra9Tri-5q0XIY4bXyC4DEEDeZrTs4c4L9caLTCjTy3I91qSEJHzUP4Qp5qkt9pDnzafz3yhtHDyIrKo3ugKeL-wuf3Sd~9f-ZgTtwmjN2YJAhF0X2eDJebA__"
                            alt="Giảng viên"
                            className="w-full h-full rounded-full border-2 border-gray-300"
                        />
                        {/* <button className="absolute bottom--1 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black p-2 rounded-full rounded-white shadow-lg">
                                <Camera size={16} />
                            </button> */}
                    </div>

                    <div className="col-span-2">
                        <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Thông tin học viên</h3>
                        <div className="grid grid-cols-2 gap-4 py-5">
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <label className="w-28 text-sm font-medium">Họ và tên:</label>
                                        <span className="text-sm font-normal"> {student?.fullName} </span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Giới tính:</label>
                                    <span className="text-sm font-normal">{student?.gender == true ? 'Nam' : 'Nữ'}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Nơi sinh:</label>
                                    <span className="text-sm font-normal">{student?.placeOfBirth}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Dân tộc:</label>
                                    <span className="text-sm font-normal">{student?.ethnicity}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Tôn giáo</label>
                                    <span className="text-sm font-normal">{student?.religion}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Niên khóa:</label>
                                    <span className="text-sm font-normal">{student?.academicYear?.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Khối:</label>
                                    <span className="text-sm font-normal">{student?.department?.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Lớp:</label>
                                    <span className="text-sm font-normal">{student?.class?.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Mã học viên:</label>
                                    <span className="text-sm font-normal">{student?.userCode}</span>

                                </div>

                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Ngày nhập học:</label>
                                    <span className="text-sm font-normal">{formatDate(student?.startDate)}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Hình thức:</label>
                                    <span className="text-sm font-normal">{student?.studyMode}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mt-10">
                            <label className="w-28 text-sm font-medium">Trạng thái:</label>
                            {student?.studentStatusId && <StatusComponent statusId={student.studentStatusId} />}
                        </div>
                    </div>
                </div>
                <div className="bg-[#F2F2F2] bg-opacity-50 text-white h-[10px]"></div>
                <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 p-4 w-full">
                    <div className="flex flex-col items-center relative"></div>

                    <div className="col-span-2">
                        <h3 className="font-bold text-[#CC5C00] text-lg mb-2">Thông tin liên hệ</h3>
                        <div className="">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <label className="w-32 text-sm font-medium">Địa chỉ:</label>
                                    <span className="text-sm font-normal">{student?.address}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-32 text-sm font-medium">Email:</label>
                                    <span className="text-sm font-normal">{student?.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-32 text-sm font-medium">Điện thoại:</label>
                                    <span className="text-sm font-normal">{student?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
            <div className="max-w-full  overflow-hidden shadow-lg border border-gray-200">
                <div className="bg-[#CC5C00] text-white font-bold text-lg p-3">Thông tin gia đình</div>
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-6 p-4 rounded-lg w-full">
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-4 py-5">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Họ tên bố:</label>
                                    <span className="text-sm font-normal">{student?.fullnameFather}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Họ tên mẹ:</label>
                                    <span className="text-sm font-normal">{student?.fullnameMother}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Họ tên giám hộ:</label>
                                    <span className="text-sm font-normal">{student?.fullnameGuardianship}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Năm sinh bố:</label>
                                    <span className="text-sm font-normal">{formatDate(student?.birthFather)}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Năm sinh mẹ:</label>
                                    <span className="text-sm font-normal">{formatDate(student?.birthMother)}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Năm sinh GH:</label>
                                    <span className="text-sm font-normal">{formatDate(student?.birthGuardianship)}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-4 py-5">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Nghề nghiệp bố:</label>
                                    <span className="text-sm font-normal">{student?.workFather}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Nghề nghiệp mẹ:</label>
                                    <span className="text-sm font-normal">{student?.workMother}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Nghề nghiệp GH:</label>
                                    <span className="text-sm font-normal">{student?.workGuardianship}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Điện thoại bố:</label>
                                    <span className="text-sm font-normal">{student?.phoneFather}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Điện thoại mẹ:</label>
                                    <span className="text-sm font-normal">{student?.phoneMother}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-28 text-sm font-medium">Điện thoại GH:</label>
                                    <span className="text-sm font-normal">{student?.phoneGuardianship}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default GeneralStudent;




