import Radar from "../assets/radar.png";
import Map from "../assets/map.png";
import List from "../assets/list.png";
import Load from "../assets/load2.gif";
import { useSelector } from "react-redux";

const Header = ({ setShowMapView, showMapViev }) => {
  const state = useSelector((store) => store);
  console.log(state);
  return (
    <header className="head">
      <div className="head-img">
        <a href="/">
          <img src={Radar} className="logo" />
        </a>
      </div>
      <div className="d-flex align-items-center">
        <h1 className="text-white fs-5">
          Radar App:
          <span className="fs-5 text-warning ">
            {state.isLoading ? (
              <img src={Load} style={{ height: "60px" }} />
            ) : (
              ` ${state.flights.length} uçuş gösteriliyor...`
            )}
          </span>
        </h1>
      </div>

      <div className="view-buttons">
        <button
          className={showMapViev ? "active button" : "button"}
          onClick={() => setShowMapView(true)}
        >
          <img className="head-img" src={Map} />
          Harita
        </button>
        <button
          className={showMapViev ? "button" : "active button"}
          onClick={() => setShowMapView(false)}
        >
          <img className="head-img" src={List} />
          Liste
        </button>
      </div>
    </header>
  );
};

export default Header;
