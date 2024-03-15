import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import { styled } from "styled-components";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져올 때(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    // 여러 영화 중 영화 하나의 ID를 가져올 때
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정 영화의 더 상세한 정보를 가져올 때(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  // str, n = String, Number
  // 문자열 자르기, 자르는 위치 지정
  const truncate = (str, n) => {
    return str?.lengt > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (!isClicked) {
    return (
      /*uI 부분 */
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          {/* Title*/}
          <h1 className="banner_title">
            {movie.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>
          {/* Div > 2 BUTTONS */}
          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
          {/* Description */}
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return <Container>clicked</Container>;
  }
}

const Container = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContianer = styled.div`
  width: 100%;
  height: 100%;
`;
