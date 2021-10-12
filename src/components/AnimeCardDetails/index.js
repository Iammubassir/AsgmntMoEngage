import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Comments from "../Comments";
import "./index.css";

function AnimeCardDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [cardDetails, setAnimeDetaails] = useState([]);
  const [loading, setLoading] = useState(true);
  const animeDetailsList = {
    aniListId: cardDetails.anilist_id,
    bannerImage: cardDetails.banner_image,
    coverColor: cardDetails.cover_color,
    coverImage: cardDetails.cover_image,
    endDate: cardDetails.end_date,
    episodesDuration: cardDetails.episode_duration,
    episodesCount: cardDetails.episodes_count,
    geners: cardDetails.geners,
    seasonPeriod: cardDetails.season_period,
    seasonYear: cardDetails.season_year,
    descriptions: cardDetails.descriptions,
    score: cardDetails.score,
    titles: cardDetails.titles,
    trailerUrl: cardDetails.trailer_url,
    id: cardDetails.id,
  };
  const { coverColor } = animeDetailsList;
  // console.log(animeDetailsList.id);
  useEffect(() => {
    axios
      .get(`https://api.aniapi.com/v1/anime/${id}`)
      .then((result) => {
        setAnimeDetaails(result.data.data);
        console.log(result.data.data.id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const renderLoader = () => (
    <ul testid="loader" className="loader-container">
      <Loader type="Oval" color="#286ede" height="50" />
    </ul>
  );
  const renderData = () => {
    return (
      <div>
        <img
          src={animeDetailsList.bannerImage}
          alt=""
          className="anime-image"
        />
        <div className="anime-detailscard">
          <img
            src={animeDetailsList.coverImage}
            alt=""
            className="anime-coverimage"
          />
          <div className="anime-container">
            <h1 className="heading">{animeDetailsList.titles.en}</h1>
            <div className="anime-details" style={{ color: coverColor }}>
              <h1>SeasonYear:{animeDetailsList.seasonYear}</h1>
              <h1>SeasonPeriod:{animeDetailsList.seasonPeriod}</h1>
              <h1>EpisodeDuration:{animeDetailsList.episodesDuration}</h1>
              <h1>EpisodesCount:{animeDetailsList.episodesCount}</h1>
              <h1>Score:{animeDetailsList.score}</h1>
            </div>
          </div>
        </div>
        <Comments animeName={animeDetailsList.titles.en} />
      </div>
    );
  };
  return (
    <div className="specific-card">
      {loading ? renderLoader() : renderData()}
    </div>
  );
}

export default AnimeCardDetails;
