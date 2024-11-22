import NavItem from './NavItem'
import './NavList.css'

function NavList(props) {
  const item1 = {
    title: 'home',
    link: '',
  };
  const item2 = {
    title: 'profile',
    link: '/profile',
  };
  const item3 = {
    title: 'reserve',
    link: '/reserve',
  };
  const item4 = {
    title: 'join',
    link: '/join',
  };

  return (
        <div className="navList">
          <NavItem
            title={item1.title}
            link={item1.link}
          />
          <NavItem
            title={item2.title}
            link={item2.link}
          />
          <NavItem
            title={item3.title}
            link={item3.link}
          />
          <NavItem
            title={item4.title}
            link={item4.link}
          />
        </div>
  );
}

export default NavList;