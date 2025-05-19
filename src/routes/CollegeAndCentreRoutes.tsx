import { RouteObject } from 'react-router-dom';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import CollegeAndCentreLayout from '../components/Layouts/CollegeAndCentre/CollegeAndCentreLayout';
import Registration from '../pages/CollegeAndCentre/Registration';
import Contact from '../pages/CollegeAndCentre/Contact';
import Home from '../pages/CollegeAndCentre/Home';

const CollegeAndCentreRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={CollegeAndCentreLayout} />,
    children: [
      { path: '/college-and-centre/home', element: <Home /> },
      { path: '/college-and-centre/registration', element: <Registration /> },
      { path: '/college-and-centre/contact', element: <Contact /> },
    ],
  },
];

export default CollegeAndCentreRoutes;
