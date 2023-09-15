import ListView from "./Pages/ListView";
import MapView from "./Pages/MapView";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { getFlights } from "./redux/actions";
import { useDispatch } from "react-redux";
import SideDetail from "./components/SideDetail";

function App() {
  const [showMapViev, setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());
  }, []);

  const openDetail = (id) => {
    setDetailId(id);
    setShowDetail(true)
  }

  return (
    <>
      <Header setShowMapView={setShowMapView} showMapViev={showMapViev} />
      {showDetail && <SideDetail detailId={detailId}  setShowDetail={setShowDetail} />}
      {showMapViev ? (
        <MapView setShowDetail={setShowDetail} openDetail={openDetail}/>
      ) : (
        <ListView setShowDetail={setShowDetail} openDetail={openDetail}/>
      )}
    </>
  );
}

export default App;
