import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeCard from "../AnimeCard";
import Loader from "react-loader-spinner";
import "./index.css";

function HomePage(props) {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const url = "https://api.aniapi.com/v1/anime";
    axios
      .get(url)
      .then((result) => {
        setAnimeList(result.data.data.documents);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderLoader = () => (
    <ul testid="loader" className="loader-container">
      <Loader type="Oval" color="#286ede" height="50" />
    </ul>
  );

  const renderData = () => {
    console.log(animeList);
    return (
      <div>
        <input
          type="text"
          style={{ marginLeft: "300px", width: "50%" }}
          className="input-field"
          placeholder="Search by Anime name"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="carddetails">
          {animeList
            .filter((each) => {
              if (setSearchInput === "") {
                return each;
              } else if (
                each.titles.en.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return each;
              }
            })
            .map((each) => (
              <AnimeCard key={each.id} cardDetails={each} />
            ))}
        </div>
      </div>
    );
  };
  const handleOnClick = () => {
    const { history } = props;
    history.push("/login");
  };

  return (
    <div className="homecontainer">
      <nav className="navcontainer">
        <h1 className="heading" style={{ color: "red", fontSize: "30px" }}>
          Ani<strong>me</strong>
        </h1>
        <button className="logout-btn" onClick={handleOnClick}>
          Logout
        </button>
      </nav>
      {loading ? renderLoader() : renderData()}
    </div>
  );
}

export default HomePage;
