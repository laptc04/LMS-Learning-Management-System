import React from 'react';
import { RouteObject } from 'react-router-dom';
import TeacherLayout from '../components/Layouts/Teacher/TeacherLayout';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import Overview from '../pages/Teacher/Overview';
import AddNewClass from '../pages/Teacher/ClassManagement/AddNewClass';
import JoinClass from '../pages/Teacher/ClassManagement/JoinClass';
import TestList from '../pages/Teacher/TestManagement/TestList';
import AddNewTest from '../pages/Teacher/TestManagement/AddNewTest';
import EnterScores from '../pages/Teacher/TestManagement/EnterScores';
import Scoreboard from '../pages/Teacher/TestManagement/Scoreboard';
import ExamSchedule from '../pages/Teacher/ExamSchedule';
import Announcements from '../pages/Teacher/Announcements';
import Help from '../pages/Teacher/Help';
import TestContent from '../pages/Teacher/TestManagement/TestContent';
import ScoreList from '../pages/Teacher/TestManagement/TestList/ScoreList';
import GradedTest from '../pages/Teacher/TestManagement/TestList/ListOfTest2/GradedTest';
import UngradedTest from '../pages/Teacher/TestManagement/TestList/ListOfTest2/UngradedTest';
import Scoring from '../pages/Teacher/TestManagement/TestList/Scoring';
import ClassParticipation from '../pages/Teacher/ClassManagement/JoinClass/ClassParticipationForm'
import ClassManagementList from '../pages/Teacher/ClassManagement/ClassList/ClassManagementList';

const TeacherRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={TeacherLayout} />,
    children: [
      { path: '/teacher/class-management/list', element: <ClassManagementList />, },
      { path: '/', element: <Overview /> },
      { path: '/teacher/class-management/add', element: <AddNewClass /> },
      { path: '/teacher/class-management/join', element: <JoinClass /> },
      { path: '/teacher/test-management/list', element: <TestList /> },
      { path: '/teacher/test-management/list/graded-test', element: <GradedTest /> },
      { path: '/teacher/test-management/list/ungraded-test', element: <UngradedTest /> },
      { path: '/teacher/test-management/add', element: <AddNewTest /> },
      { path: '/teacher/test-management/enter-scores', element: <EnterScores /> },
      { path: '/teacher/test-management/test-content', element: <TestContent /> },
      { path: '/teacher/test-management/scoreboard', element: <Scoreboard /> },
      { path: '/teacher/exam-schedule', element: <ExamSchedule /> },
      { path: '/teacher/announcements', element: <Announcements /> },
      { path: '/teacher/help', element: <Help /> },
      { path: '/teacher/test-management/list/score-list', element: <ScoreList /> },
      { path: '/teacher/test-management/scoring', element: <Scoring /> },
      //ClassparticipationForm
      { path: '/teacher/class-management/join/class', element: <ClassParticipation /> },
    ],
  },
];

export default TeacherRoutes;
