// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigAdmin = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'blogs',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: icon('ic_users'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_profile'),
  },
];

export default navConfigAdmin;
