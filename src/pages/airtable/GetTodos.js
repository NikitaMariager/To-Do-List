import React from "react";
import useGetData from "../../hooks/useGetData";
import { useEffect } from "react";
import Loader from "../../components/loader/loader";
import Error from "../../components/Error";
import GetTodo from "./GetTodo";

function GetTodos() {
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
  }, []);

  return (
    <div className="pagecontainer">
      <div>
        {dataCat &&
          dataCat.records[1].fields.todos.map((c) => (
            <div key={c}>
              <GetTodo id={c} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default GetTodos;
