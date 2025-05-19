//Hồ sơ giảng viên

import AccordionTrainning from './ListTrainning';
import TeacherProfile from './TeacherProfile';
import ListWork from './ListWork';

const ProfileManagement = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Trang hồ sơ giảng viên</h1>
      <TeacherProfile />
      <AccordionTrainning title="Quá trình công tác" />
      <ListWork title="Thông tin đào tạo" />
    </div>
  );
};

export default ProfileManagement;
