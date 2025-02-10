import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchByTag from "./SearchByTag";
import "./css/SearchTabs.css";

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState("versiculo");

  return (
    <div className="search-tabs">
      <div className="search-tabs__buttons">
        <button
          className={`search-tabs__button ${activeTab === "versiculo" ? "active" : ""}`}
          onClick={() => setActiveTab("versiculo")}
        >
          Pesquise por um versículo
        </button>
        <button
          className={`search-tabs__button ${activeTab === "tag" ? "active" : ""}`}
          onClick={() => setActiveTab("tag")}
        >
          Pesquise por uma palavra-chave
        </button>
      </div>

      <div className="search-tabs__content">
        {activeTab === "versiculo" && <SearchBar onSearch={(query) => console.log(query)} />}
        {activeTab === "tag" && <SearchByTag />}
      </div>
    </div>
  );
};

export default SearchTabs;
