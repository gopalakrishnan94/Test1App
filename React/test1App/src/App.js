import React from 'react';
import Students  from './components/Students/Students';
import AddStudents from './components/Students/AddStudents';
import Teachers from './components/Teachers/Teachers';
import AddTeachers from './components/Teachers/AddTeachers';
import Home from './components/Home/Home';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Nav } from 'rsuite';

const NavLink = React.forwardRef((props, ref) => {
  const location = useLocation();
  return (
    <Nav.Item {...props} ref={ref} active={props.to === location.pathname} as={Link} />
  );
});

function App() {
  return (
    <div className="container-fluid">
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Students">Students</NavLink>
          <NavLink to="/Teachers">Teachers</NavLink>
        </Nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Students" element={<Students />} />
            <Route path="/Students/AddStudents" element={<AddStudents />} />
            <Route path="/Students/EditStudents/:id" element={<AddStudents />} />
            <Route path="/Teachers" element={<Teachers />} />
            <Route path="/Teachers/AddTeachers" element={<AddTeachers />} />
            <Route path="/Teachers/EditTeachers/:id" element={<AddTeachers />} />
            <Route path="*" element={<Home />}></Route>
        </Routes>
      </div>
  );
}

export default App;
