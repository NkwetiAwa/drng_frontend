import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export default function NavBar(){
  const navigate = useNavigate();

  return(
    <Styles>
      <Navbar variant="light" className="navbar-toggle" expand="lg">
        <div className="intro">
          <Navbar.Brand href="/">
            <h5>DrNg | PATIENTS</h5>
          </Navbar.Brand>
        </div>
      </Navbar>
    </Styles>
  )
}

const Styles = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100vw;
  height: 8vh;

  .navbar-toggle{
    background-color: #424242;
    color: white;
    height: 8vh;
    padding: 0px;
  }

  .intro{
    background-color: skyblue;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0px 130px 0px 20px;
    border-bottom-right-radius: 100px;
  }

  h5{
    color: white;
  }

  @media screen and (max-width: 770px){
  }
    
`;