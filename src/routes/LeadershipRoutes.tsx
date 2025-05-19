import { RouteObject } from 'react-router-dom';
import LeadershipLayout from '../components/Layouts/Leadership/LeadershipLayout';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import Overview from '../pages/Leadership/Overview';
import DataDeclaration from '../pages/Leadership/DataDeclaration';
import Seting from '../pages/Leadership/Setting';
import StudentProfileManagement from '../pages/Leadership/StudentProfile/ProfileManagement/ListStudent';
import StudySuspension from '../pages/Leadership/StudentProfile/StudySuspension';
import TransferSchool from '../pages/Leadership/StudentProfile/TransferSchool';
import TeachingAssignment from '../pages/Leadership/TeacherProfile/TeachingAssignment';
import Exam from '../pages/Leadership/Exam';

import DeparmentsTable from '../pages/Leadership/Deparments/index';
import EditDeparmentsForm from '../pages/Leadership/Deparments/HandleSubject/EditDepartment/index';

import ClassTable from '../pages/Leadership/Class';
import AddClassForm from '../pages/Leadership/Class/HandleClass/AddClass';
import DetailClass from '../pages/Leadership/Class/DetailClass/DetailClass';
// import SubjectTable from '../pages/Leadership/Subject/index';
// import EditSubjectForm from '../pages/Leadership/Subject/HandleSubject/EditSubject/index';
// import AddTransferSchool from '../pages/Leadership/StudentProfile/TransferSchool/Edit';
// import UpdateTransfer from '../pages/Leadership/StudentProfile/StudySuspension/Update';
import UpdateTeachingSchedule from '../pages/Leadership/TeacherProfile/TeachingAssignment/Update';
import InstructorUpdate from '../pages/Leadership/TeacherProfile/ProfileManagement/update';
import InstructorProfile from '../pages/Leadership/TeacherProfile/ProfileManagement/Detail';
import DisciplineEdit from '../pages/Leadership/StudentProfile/ProfileManagement/EditDist';

import CommentdationEdit from '../pages/Leadership/StudentProfile/ProfileManagement/EditCommendation';
import StudentReward from '../pages/Leadership/StudentProfile/ProfileManagement/StudentReward';
import TeachingAssignmentUpdate from '../pages/Leadership/TeacherProfile/TeachingAssignment/UpdateSchedule';
import AddTransferSchool from '../pages/Leadership/StudentProfile/TransferSchool/Edit';
import UpdateTransfer from '../pages/Leadership/StudentProfile/StudySuspension/Update';
import AddWorkProcess from '../pages/Leadership/TeacherProfile/ProfileManagement/AddWorkProcess';
import MoreTrainingInformation from '../pages/Leadership/TeacherProfile/ProfileManagement/MoreTrainingInformation';
import ClassSettings from '../pages/Leadership/Setting/ClassSettings/ClassSetting';
import ClassSetup from '../pages/Leadership/Setting/ClassSettings/ClassSetup';
import SubjectSetting from '../pages/Leadership/Setting/SubjectSettings/SubjectSetting';
import SubjectSetup from '../pages/Leadership/Setting/SubjectSettings/SubjectSetup';
import UserGroup from '../pages/Leadership/Setting/userGroupSetting/userGroup';
import SetUpUserGroup from '../pages/Leadership/Setting/userGroupSetting/setupUserGroup';
import ConfigPage from '../pages/Leadership/Setting/SystemPage';
import TrainingSetting from '../pages/Leadership/Setting/TrainningLevel/TrainingList';
import TrainingSetup from '../pages/Leadership/Setting/TrainningLevel/TrainingForm';
import SchoolPage from '../pages/Leadership/Setting/School/SchoolPage';
import ListStudent from '../pages/Leadership/StudentProfile/ProfileManagement';
import ProfileManagement from '../pages/Leadership/StudentProfile/ProfileManagement';
import AddStudySuspension from '../pages/Leadership/StudentProfile/StudySuspension/Add';
import InfoStudents from '../pages/Leadership/StudentProfile/ProfileManagement';
import TeacherList from '../pages/Leadership/Teacher/';
import ClassUpdate from '../pages/Leadership/Setting/ClassSettings/ClassUpdate';
import SubjectUpdate from '../pages/Leadership/Setting/SubjectSettings/SubjectUpdate';

const LeadershipRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={LeadershipLayout} />,
    children: [
      { path: '/', element: <Overview /> },
      {
        path: '/leadership/data-declaration/*',
        element: <DataDeclaration />,
      },
      {
        path: '/leadership/student/profile/:id',
        element: <InfoStudents />,
      },
      { path: '/leadership/setting/', element: <Seting /> },
      { path: '/leadership/setting/user-group-setting/user-group', element: <UserGroup /> },
      { path: '/leadership/setting/user-group-setting/set-up-user-group', element: <SetUpUserGroup /> },
      { path: '/leadership/exam', element: <Exam /> },
      { path: '/leadership/departments', element: <DeparmentsTable /> },
      { path: '/leadership/departments/departments-edit', element: <EditDeparmentsForm /> },
      { path: '/leadership/classes', element: <ClassTable /> },
      { path: '/leadership/classes/classes-add', element: <AddClassForm /> },
      { path: '/leadership/classes/detail/:id', element: <DetailClass /> },

      { path: '/leadership/student/profile/', element: <StudentProfileManagement /> },
      { path: '/leadership/student/study-suspension/', element: <StudySuspension /> },
      { path: '/leadership/student/study-suspension/add', element: <AddStudySuspension /> },
      { path: '/leadership/student/study-suspension/update', element: <UpdateTransfer /> },
      { path: '/leadership/student/transfer-school/', element: <TransferSchool /> },
      { path: '/leadership/student/transfer-school/add', element: <AddTransferSchool /> }, // Thêm mới
      { path: '/leadership/student/profile/list-student', element: <ListStudent /> },

      { path: '/leadership/teacher/profile', element: <ProfileManagement /> },
      { path: '/leadership/teacher/list-teacher', element: <TeacherList /> },
      { path: '/leadership/teacher/profile/detail', element: <InstructorProfile /> },
      { path: '/leadership/teacher/profile/add', element: <InstructorUpdate /> },

      { path: '/leadership/teacher/teaching-assignment/*', element: <TeachingAssignment /> },
      { path: '/leadership/teacher/teaching-assignment/update', element: <TeachingAssignmentUpdate /> },
      { path: '/leadership/teacher/teaching-assignment/edit', element: <UpdateTeachingSchedule /> },

      { path: '/leadership/student/profile/edit', element: <DisciplineEdit /> },
      { path: '/leadership/student/profile/update-commendation', element: <CommentdationEdit /> },
      { path: '/leadership/student/profile/student-reward', element: <StudentReward /> },
      { path: '/leadership/teacher/profile/add-word-process', element: <AddWorkProcess /> },

      { path: '/leadership/teacher/profile/add-training', element: <MoreTrainingInformation /> },
      { path: '/leadership/setting/class-setting', element: <ClassSettings /> },
      { path: '/leadership/setting/class-setting/class-setup', element: <ClassSetup /> },
      { path: '/leadership/setting/class-setting/class-edit/:id', element: <ClassUpdate /> },

      { path: '/leadership/setting/subject-setting', element: <SubjectSetting /> },
      { path: '/leadership/setting/subject-setting/subject-setup', element: <SubjectSetup /> },
      { path: '/leadership/setting/subject-setting/subject-edit/:id', element: <SubjectUpdate /> },

      { path: '/leadership/setting/system', element: <ConfigPage /> },
      { path: '/leadership/setting/train-setting', element: <TrainingSetting /> },
      { path: '/leadership/setting/train-setting/training-setup', element: <TrainingSetup /> },
      { path: '/leadership/setting/system-school', element: <SchoolPage /> },




    ],
  },
];

export default LeadershipRoutes;