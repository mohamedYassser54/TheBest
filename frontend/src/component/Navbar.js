import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './css/Navbar.module.css'



function Navbars() {
  return (
    <Navbar className={style.navbar}>
        <Container>
          <Nav className="">
            <NavLink to="/" className={style.NavLink}>Vote</NavLink>
            <NavLink to="/Results" className={style.NavLink}>Results</NavLink>
          
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navbars;