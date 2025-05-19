import React from 'react';
import { RouteObject } from 'react-router-dom';
import StudentLayout from '../components/Layouts/Student/StudentLayout';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import Overview from '../pages/Student/Overview';
import ClassList from '../pages/Student/MyClasses/ClassList';
import JoinClass from '../pages/Student/MyClasses/JoinClass';
import TestList from '../pages/Student/TestManagement/TestList';
import Scoreboard from '../pages/Student/TestManagement/Scoreboard';
import ExamSchedule from '../pages/Student/ExamSchedule';
import Announcements from '../pages/Student/Notification';
import Help from '../pages/Student/Help';
import ClassManagementLayout from '../components/StudentManagement/Sidebar';
import QnALayout from '../pages/Teacher/ClassManagement/ClassList';
import QnAList from '../pages/Teacher/ClassManagement/ClassList/QA/QnAList';
import TopicsPage from '../pages/Teacher/ClassManagement/ClassList/QA/TopicsPage';
import EditorTest from '../pages/Student/TestManagement/Test';
import TakeTheTest from '../pages/Student/TestManagement/TestList/TakeTheTest';
import MultipleChoicePage from '../pages/Student/TestManagement/Test/MultipleChoicePage';

const StudentRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={StudentLayout} />,
    children: [
      {
        path: '/student/my-classes/list',
        element: <ClassManagementLayout />,
        children: [
          { index: true, element: <ClassList></ClassList> },
          {
            path: 'qna',
            element: <QnALayout />,
            children: [
              { index: true, element: <QnAList /> },
              { path: 'answered', element: <QnAList /> },
              { path: 'recent', element: <QnAList /> },
              { path: 'topics', element: <TopicsPage /> },
            ]
          }
        ],
      },
      {
        path: '/student/my-classes/join',
        element: <ClassManagementLayout />,
        children: [
          { index: true, element: <JoinClass></JoinClass> },
          {
            path: 'qna',
            element: <QnALayout />,
            children: [
              { index: true, element: <QnAList /> },
              { path: 'answered', element: <QnAList /> },
              { path: 'recent', element: <QnAList /> },
              { path: 'topics', element: <TopicsPage /> },
            ]
          }
        ],
      },
      { path: '/', element: <Overview /> },
      // { path: '/student/my-classes/list', element: <ClassList /> },
      {
        path: '/student/my-classes/list/:filter?', // Dùng URL params thay vì props
        element: <ClassList />,
      },
      // { path: '/student/my-classes/join', element: <JoinClass /> },
      { path: "/student/test-management/list/:filter?", element: <TestList /> },
      { path: "/student/test-management/test", element: <EditorTest /> },
      { path: '/student/test-management/scoreboard', element: <Scoreboard /> },
      { path: '/student/exam-schedule', element: <ExamSchedule /> },
      { path: '/student/announcements', element: <Announcements /> },
      { path: '/student/help', element: <Help /> },
      { path: '/student/test-management/list/test/:id', element: <TakeTheTest /> },
      { path: "/student/test-management/test-multiple-choice", element: <MultipleChoicePage /> },
    ],
  },
];

export default StudentRoutes;
