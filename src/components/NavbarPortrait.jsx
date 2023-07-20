import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logoPortrait.png";
import signout from "../assets/signoutAvatar.jpg";
import { firebaseAuth } from "../utils/firebase-config";

export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    // { name: "My List", link: "/mylist" },
  ];

  return (
    <Container>
      <Nav className={`${isScrolled ? "scrolled" : ""}`}>
        <div className="top">
          <div className="logo">
            <img src={logo} alt="netflix" className="logo-img" />
          </div>
          <div className="signout">
            <img
              src={signout}
              alt="sign-out"
              className="signout-img"
              onClick={() => signOut(firebaseAuth)}
            />
          </div>
        </div>

        <ul className="categories">
          {links.map(({ name, link }) => {
            return (
              <li key={name}>
                <Link className="link" to={link}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Nav>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 1;
  .scrolled {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Nav = styled.nav`
  padding: 1rem;
  background: none;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-img {
    height: 45px;
  }

  .signout-img {
    height: 30px;
    cursor: pointer;
  }

  .categories {
    display: flex;
    padding-left: 0;
  }

  .categories li {
    list-style: none;
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  .categories .link {
    text-decoration: none;
    color: white;
  }
`;
