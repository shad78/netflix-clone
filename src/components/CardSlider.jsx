import React, { useRef } from "react";
import styled from "styled-components";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();

  return (
    <Container className="flex column">
      <h1 className="title">{title}</h1>
      <div className="wrapper">
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
      </div>
    </Container>
  );
});

const Container = styled.div`
  gap: 1rem;
  padding: 1rem 0;

  .title {
    margin-left: 20px;
    font-size: 1.5rem;
  }

  @media screen and (min-width: 572px) {
    .title {
      font-size: 1.8rem;
    }
  }

  .wrapper {
    margin-left: 10px;
    -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on iOS devices */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
    padding-bottom: 1rem;
    overflow-y: hidden; /* Hide vertical scroll */

    &::-webkit-scrollbar {
      /* Hide scrollbar for Chrome, Safari, and Opera */
      display: none;
    }

    .slider {
      width: fit-content;
      display: flex;
      gap: 1rem;
      transition: 0.3s ease-in-out;
    }
  }
`;
