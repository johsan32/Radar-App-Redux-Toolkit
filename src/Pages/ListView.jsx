import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux"

const ListView = ({openDetail}) => {

const state = useSelector((store) => store)
const [itemOffset, setItemOffset] = useState(0);
const  itemsPerPage = 10;
const endOffset = itemOffset + itemsPerPage;
const currentItems = state?.flights.slice(itemOffset, endOffset);
const pageCount = Math.ceil(state?.flights.length / itemsPerPage);

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % state?.flights.length;
  setItemOffset(newOffset);
};

  return (
    <div className="list-view px-5">
      <table className="table table-hover table-striped ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
          currentItems.map((fly) => (
            <tr key={fly.id}>
              <td>{fly.id}</td>
              <td>{fly.code}</td>
              <td>{fly.id ? fly.tailNumber : fly.tail}</td>
              <td>{fly.lat}</td>
              <td>{fly.lng}</td>
              <td><button className="list-btn" onClick={() =>openDetail(fly.id)}>Detay</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
      className="paginate"
        breakLabel="..."
        nextLabel="Sonraki...>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Önceki"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default ListView
