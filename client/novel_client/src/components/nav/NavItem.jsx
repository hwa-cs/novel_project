import { useNavigate, Link, NavLink } from 'react-router-dom';

export default function NavItem({ title, link }) {
    const navigate = useNavigate();
    return (
      <article className="NavItem">
        <NavLink to={link}> { title }</NavLink>
      </article>
    );
  }