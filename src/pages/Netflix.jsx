import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavbarPortrait from "../components/NavbarPortrait";
import Navbar from "../components/Navbar";
import backgroundImageLandscape from "../assets/home1.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded, dispatch, genres]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const isPortrait = window.innerWidth < 572;

  const handleHeroHeight = () => {
    if (isPortrait) {
      return "70vh";
    } else {
      return "100vh";
    }
  };

  return (
    <Container>
      {!isPortrait ? (
        <Navbar isScrolled={isScrolled} />
      ) : (
        <NavbarPortrait isScrolled={isScrolled} />
      )}
      <div className="hero" style={{ height: handleHeroHeight() }}>
        <img
          src={backgroundImageLandscape}
          alt="background"
          className="background-image"
        />
        {isPortrait ? (
          <div className="container-p">
            <div className="logo-p">
              <img src={MovieLogo} alt="" />
            </div>
            <div className="btn-play-p">
              <button onClick={() => navigate("/player")}>
                <FaPlay />
                <span>Play</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="logo">
              <img src={MovieLogo} alt="Movie-Logo" />
            </div>
            <div className="buttons flex">
              <button
                onClick={() => navigate("/player")}
                className="flex j-center a-center btn-play"
              >
                <FaPlay /> Play
              </button>
              <button className="flex j-center a-center btn-info">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div>
          </div>
        )}
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      object-fit: cover;
      filter: brightness(60%);
    }
    img {
      height: 100%;
      width: 100%;
    }
    .container-p {
      position: absolute;
      bottom: 3rem;
      left: 2rem;
      .logo-p {
        img {
          width: 70%;
          height: 70%;
          justify-content: center;
          align-items: center;
        }
      }
      button {
        text-align: center;
        font-size: 1.1rem;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        margin-top: 1rem;
        transition: 0.2s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        span {
          margin-left: 0.3rem;
        }
      }
    }
    .container {
      position: absolute;
      bottom: 5rem;
      left: 2rem;
      .logo {
        img {
          width: 70%;
          height: 70%;
        }
        margin-bottom: 1rem;
      }
      .buttons {
        gap: 1rem;
        .btn-play {
          width: 120px;
        }
        .btn-info {
          width: 160px;
        }
        button {
          text-align: center;
          font-size: 1.1rem;
          gap: 0.5rem;
          border-radius: 0.2rem;
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Netflix;
