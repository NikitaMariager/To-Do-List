import React from "react";
import useGetData from "../../hooks/useGetData";
import { useEffect } from "react";

import Todocard from "../../components/Todocard";

function GetDone() {
  const {
    error: errorCat,
    loading: loadingCat,
    data: dataCat,
    getData: getCatData,
  } = useGetData();

  useEffect(() => {
    //Henter kategori
    getCatData(
      "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblgGKL0djEzVeqzm",
      {
        Authorization: "Bearer keypJpuWWvXgrg8ka",
      }
    );
    console.log("To do " + dataCat);
  }, []);

  return (
    <div className="pagecontainer">
      {dataCat &&
        dataCat.records[0].fields.todos.map((c) => (
          <div key={c} className="done">
            <Todocard id={c} />
          </div>
        ))}
    </div>
  );
}

export default GetDone;
