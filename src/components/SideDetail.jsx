import { useEffect, useState } from "react";
import Power from "../assets/power-on.png";
import Plane from "../assets/flight-route.png";
import Ext from "../assets/delay.webp";
import Load from "../assets/load.gif";
import { options2 } from "../helpers/constants";
import axios from "axios";
import { setRoute } from "../redux/flightSlice";
import { useDispatch } from "react-redux";

const SideDetail = ({ detailId, setShowDetail }) => {
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setDetail(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        setDetail(res.data);
        dispatch(setRoute(res.data.trail));
      });
  }, [detailId]);
  console.log(detail);
  return (
    <div className="detail">
      <div className="detail-inner">
        <div className="detail-head">
          <h5>
            {detail?.identification?.callsign}
            <span className="ms-2 bg-info px-2 rounded-2">
              {detail?.identification?.number?.default}
            </span>
          </h5>
          <img onClick={() => setShowDetail(false)} src={Power} />
        </div>
        {!detail ? (
          <img src={Load} className="loading"  />
        ) : (
          <>
          <div>
            <div className="d-flex flex-column">
            <span>REGISTRATION {detail.aircraft?.registration}</span>
              <p className="text-warning">
                AIRCRAFT TYPE ({detail.aircraft.model?.code})
                
              </p>
              <span>{detail.aircraft.model?.text}</span>
            </div>

            <h5 className="mt-3">{detail.airline?.name}</h5>
            {detail.owner?.name ? (<p>Operated by {detail.owner?.name}</p>) : ("")}
            <img
              className="rounded-3"
              src={detail.aircraft?.images.large[0]?.src}
              style={{ width: "100%", height: "100" }}
            />
            <div className="d-flex align-items-center justify-content-space-between gap-1 mt-3">
              <div
                className="plane-info border rounded-2"
                style={{ width: "180px" }}
              >
                <h1>{detail.airport.origin?.code?.iata}</h1>
                <p
                  className="p-2  border-top  w-100"
                  style={{ fontSize: "14px" }}
                >
                  {detail.airport.origin?.name}
                </p>
                <p className="border-top  text-uppercase fs-5  w-100">
                  {detail.airport.origin?.position?.country?.name}
                </p>
              </div>

              <div className="plane-info justify-content-center ">
                <img src={Plane} alt="" />
              </div>
              <div
                className="plane-info  border rounded-2"
                style={{ width: "180px" }}
              >
                <h1>{detail.airport.destination?.code?.iata}</h1>
                <p
                  className="p-2 border-top  w-100"
                  style={{ fontSize: "14px" }}
                >
                  {detail.airport.destination?.name}
                </p>
                <p className="border-top text-uppercase fs-5  w-100">
                  {detail.airport.destination.position?.region?.city}
                </p>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-start mt-4 justify-content-center">
              <img src={Ext} style={{ width: "32px", height: "32px" }} />
              <p
                className="px-2 fs-5"
                style={{ background: detail.status?.icon, borderRadius: "7px" }}
              >
                {detail.status?.text}  {detail.status?.type}
              </p>
            </div>
          </div>
            </>
        )}
      </div>
    
    </div>
  );
};

export default SideDetail;
