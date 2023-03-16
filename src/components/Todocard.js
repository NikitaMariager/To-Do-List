import React from "react";
import useGetData from "../hooks/useGetData";
import Error from "../components/Error";
import Loader from "./loader/loader";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

function Todocard({ id }) {
  const { error, loading, data, getData } = useGetData();

  useEffect(() => {
    getData(
      "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC/" + id,
      {
        Authorization: "Bearer " + "keypJpuWWvXgrg8ka",
        "Content-Type": "application/json",
      }
    );
  }, []);

  return (
    <div className="cool__link">
      {data && (
        <div className="task">
          <div className="todo-content">
            <p>{data.fields.todos}</p>
            <p>{data.fields.Name}</p>
          </div>
          <p className="date">
            {new Date(data.createdTime).toLocaleString("da-dk", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default Todocard;
