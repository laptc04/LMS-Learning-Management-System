import { useRoutes, useNavigate } from 'react-router-dom';
import LeadershipRoutes from './LeadershipRoutes';
import TeacherRoutes from './TeacherRoutes';
import StudentRoutes from './StudentRoutes';
import CollegeAndCentreRoutes from './CollegeAndCentreRoutes';
import AuthRoutes from './AuthRoutes';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const BaseRoutes = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchRole = async () => {
      const role = await getCookie('user_role');
      console.log(role);
      if (role) {
        setUserRole(role);
      } else {
        navigate('/login');
      }
    };
    fetchRole();
  }, [navigate]);
  useEffect(() => {
    if (userRole) {
      const currentPath = window.location.pathname;

      if (userRole === 'ADMIN' && !currentPath.startsWith('/leadership')) {
        navigate('/');
      } else if (userRole === 'TEACHER' && !currentPath.startsWith('/teacher')) {
        navigate('/');
      } else if (userRole === 'STUDENT' && !currentPath.startsWith('/student')) {
        navigate('/');
      }
    }
  }, [userRole, navigate]);

  const getRoutes = () => {
    if (!userRole) {
      return AuthRoutes;
    }
    if (userRole === 'ADMIN') {
      return LeadershipRoutes;
    } else if (userRole === 'TEACHER') {
      return TeacherRoutes;
    } else if (userRole === 'STUDENT') {
      return StudentRoutes;
    } else {
      navigate('/');
      return [];
    }
  };

  const routes = getRoutes();

  return useRoutes(routes);
};

export default BaseRoutes;
