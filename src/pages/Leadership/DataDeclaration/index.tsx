import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../../components/DataDeclaration/Header';
import Sidebar from '../../../components/DataDeclaration/Menu';
import ManageAcademicYear from './ManageAcademicYear';
import FormSchools from './ManageAcademicYear/FormSchools';
import ManageSubjects from './ManageSubjects';
// import ManageSubjectsAdd from './ManageSubjectsAdd';
import ManageClasses from './ManageClasses';
import ManageDepartments from './ManageDepartments';

import ManageScoreType from './ManageScoreType';
import AddClassForm from '../Class/HandleClass/AddClass';
import ManageSubjectEdit from './ManageSubjects/Edit';
import ManageSubjectAdd from './ManageSubjects/Add';

import EditDeparmentsForm from '../../Leadership/Deparments/HandleSubject/EditDepartment/index';
import AddDepartmentsForm from '../../Leadership/Deparments/HandleSubject/AddDepartment/index';
import AddSchoolYear from './ManageAcademicYear/AddSchoolYear';
import AddPoints from './ManageScoreType/addPoints';
import ManageFaculty from './ManageFaculty/';
import AddFaculty from './ManageFaculty/AddFaculty';
import EditFaculty from './ManageFaculty/EditFaculty';
import ListFaculty from './ManageFaculty/ListFaculty';
import EditClass from '../Class/HandleClass/EditClass';
import UpdateScoreType from './ManageScoreType/UpdatePoint';

const DataDeclaration: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold ms-5">Khai báo dữ liệu</h1>

      <div className="h-screen grid grid-cols-4 gap-6">
        <div className="col-span-1 shadow-lg shadow-[#9ACAF5]/25 rounded-lg bg-white">
          <Sidebar />
        </div>

        <div className="col-span-3 flex flex-col">
          <div>
            <Header />
          </div>

          <div className="shadow-lg shadow-[#9ACAF5]/25 rounded-lg p-6 bg-white flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="academic-year" replace />} />
              <Route path="academic-year" element={<ManageAcademicYear />} />
              <Route path="academic-year/add" element={<AddSchoolYear />} />
              <Route path="academic-year/:id" element={<FormSchools />} />

              <Route path="subjects" element={<ManageSubjects />} />
              <Route path="subjects/add" element={<ManageSubjectAdd />} />
              <Route path="subjects/edit/:id" element={<ManageSubjectEdit />} />

              <Route path="classes" element={<ManageClasses />} />
              <Route path="classes/classes-add" element={<AddClassForm />} />
              <Route path="classes/classes-edit/:id" element={<EditClass />} />


              <Route path="departments" element={<ManageDepartments />} />
              <Route path="departments/departments-add" element={<AddDepartmentsForm />} />
              <Route path="departments/departments-edit/:id" element={<EditDeparmentsForm />} />

              <Route path="faculty" element={<ManageFaculty />} />
              <Route path="faculty/list/:id" element={<ListFaculty />} />
              <Route path="faculty/add" element={<AddFaculty />} />
              <Route path="faculty/edit/:id" element={<EditFaculty />} />


              <Route path="score-type" element={<ManageScoreType />} />
              <Route path="score-type/add" element={<AddPoints />} />
              <Route path="score-type/edit/:id" element={<UpdateScoreType />} />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeclaration;
