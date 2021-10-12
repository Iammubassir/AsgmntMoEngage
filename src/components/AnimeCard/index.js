import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function AnimeCard({ cardDetails }) {
  const animeDetails = {
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
  const title = cardDetails.titles.en;
  const id = cardDetails.id;

  return (
    <Link to={`/anime-search/${id}/${title}`} className="link-item">
      <li className="animecontainer">
        <div className="animecard">
          <img src={animeDetails.coverImage} alt="" className="cover-image" />
          <h1 className="animeheading">{animeDetails.titles.en}</h1>
        </div>
      </li>
    </Link>
  );
}

export default AnimeCard;
