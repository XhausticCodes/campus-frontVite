import React from "react";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
const StudentMenu = () => {
  return (
    <div className=".container">
      <br />
      <div align="center" style={{ backgroundColor: "pink" }}>
        <h1 className="text-center" style={{ color: "magenta" }}>
          <u>
            <i>Lost Found Student Menu</i>
          </u>
        </h1>
      </div>

      <Navbar expand="lg" bg="warning">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Items" id="collasible-nav-dropdown">
              <b>Items</b>
              <NavDropdown.Item href="">
                Lost Item Registration
              </NavDropdown.Item>
              <NavDropdown.Item href="">Found Item Submission</NavDropdown.Item>
              <NavDropdown.Item href="">Lost Item Track</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">
              <b>Logout</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar expand="lg" bg="warning">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Student" id="collasible-nav-dropdown">
              <b>Student</b>
              <NavDropdown.Item href="">Student List</NavDropdown.Item>
              <NavDropdown.Item href="">Remove Student</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Lost-Item" id="collasible-nav-dropdown">
              <b>Lost Items</b>
              <NavDropdown.Item href="">
                Lost Item Registration
              </NavDropdown.Item>
              <NavDropdown.Item href="">Lost Item List</NavDropdown.Item>
              <NavDropdown.Item href="">Lost Item Track</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Found-Item" id="collasible-nav-dropdown">
              <b>Found Items</b>
              <NavDropdown.Item href="">Found Item Submission</NavDropdown.Item>
              <NavDropdown.Item href="">Found Item List</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Report" id="collasible-nav-dropdown">
              <b>Report</b>
              <NavDropdown.Item href="">Found Item Report</NavDropdown.Item>
              <NavDropdown.Item href="">Lost Item Report</NavDropdown.Item>
              <NavDropdown.Item href="">Lost Found Analysis</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/">
              <b>Logout</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default StudentMenu;
