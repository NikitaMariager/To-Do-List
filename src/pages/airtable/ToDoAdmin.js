import React from "react";
import Titel from "../../components/Titel";
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/loader/loader";
import Error from "../../components/Error";
import useDeleteData from "../../hooks/useDeletData";
import { Link } from "react-router-dom";

//icons
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

import { useEffect } from "react";

function ToDoAdmin({ t }) {
  const { error, loading, data, getData } = useGetData();

  const {
    error: errorDelete,
    loading: loadingDelete,
    data: dataDelete,
    deleteData,
  } = useDeleteData();

  useEffect(() => {
    getData("https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC", {
      Authorization: "Bearer keypJpuWWvXgrg8ka",
    });
  }, [dataDelete]);

  const handleDelete = (id) => {
    if (window.confirm("er du sikker på at du vil slette?")) {
      deleteData(
        "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC/" + id,
        {
          Authorization: "Bearer keypJpuWWvXgrg8ka",
        }
      );
      console.log(id);
    }
  };

  return (
    <div>
      <Titel headline="Admin To do" />

      <div className="msgcontainer">
        {/*Hvis der er error eller errorDelete */}
        {(error || errorDelete) && <Error />}

        {/* loading */}
        {(loading || loadingDelete) && <Loader />}
      </div>

      <div className="toDo">
        {data &&
          data.records.map((t) => (
            <div key={t.id} className="toDo-card">
              <h4>To do:</h4>

              <p>{t.fields.Name}</p>

              <p className="task">{t.fields.todos}</p>
              <p className="date">
                {new Date(t.createdTime).toLocaleString("da-dk", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div>
                <Link to={"/todoEdit/" + t.id}>
                  <button>
                    {" "}
                    <AiTwotoneEdit />
                  </button>
                </Link>

                {/* arrowfucntione kommes på så onclick ikke køre flere gang kun når den faktisk bliver klikket på */}
                <button onClick={() => handleDelete(t.id)}>
                  <AiTwotoneDelete />{" "}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ToDoAdmin;
