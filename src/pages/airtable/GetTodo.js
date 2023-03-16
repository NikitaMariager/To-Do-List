import React from "react";
import Titel from "../../components/Titel";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { useState, useEffect } from "react";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import usePatchData from "../../hooks/usePatchData";
import { Link } from "react-router-dom";
import useDeleteData from "../../hooks/useDeletData";
import Modal from "../../components/Modal";

function GetTodo({ id }) {
  const {
    error: errorDelete,
    loading: loadingDelete,
    data: dataDelete,
    deleteData,
  } = useDeleteData();

  //henter to do der skal rettes
  const { error, loading, data, getData } = useGetData();
  //henter kategorier
  const {
    error: errorCat,
    loading: loadingCat,
    data: dataCat,
    getData: getCatData,
  } = useGetData();

  const {
    error: patchError,
    loading: PatchLoading,
    data: patchData,
    PatchData,
  } = usePatchData();

  const [updatet, setUpdatet] = useState();
  const [updateCat, setUpdateCat] = useState();

  //henter den to do der skal rettes
  useEffect(() => {
    getData(
      "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC/" + id,
      {
        Authorization: "Bearer " + "keypJpuWWvXgrg8ka",
        "Content-Type": "application/json",
      }
    );

    //Henter kategori
    getCatData(
      "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblgGKL0djEzVeqzm/",
      {
        Authorization: "Bearer keypJpuWWvXgrg8ka",
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let updateMsg = {
      fields: {
        Status: ["recbQkzCIhUpKyraD"],
      },
    };

    PatchData(
      "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC/" + id,

      updateMsg,
      {
        Authorization: "Bearer " + "keypJpuWWvXgrg8ka",
        "Content-Type": "application/json",
      }
    );
  };

  /* sletter to do */
  const handleDelete = (todosid) => {
    if (window.confirm("er du sikker på at du vil slette?")) {
      deleteData(
        "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC/" +
          todosid,
        {
          Authorization: "Bearer keypJpuWWvXgrg8ka",
        }
      );
    }
  };

  const [open, setOpen] = useState(false);
  const [todoId, setToDoId] = useState(0);
  const openModal = (id) => {
    setOpen(true);
    setToDoId(id);

    /*  const timer = setTimeout(() => {
      let getElementYPos = document
        .querySelector(".modal")
        .getBoundingClientRect().top;
      gsap.to(".modal", {
        duration: 0.5,
        top: getElementYPos + 250,
        ease: "elastic.out",
        onComplete: () => {
          gsap.to(".modal", {
            duration: 0.3,
            rotation: 5,
            transformOrigin: "center",
          });
        },
      });
    }, 10); */
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      {data && (
        <div>
          <div className="editToDo hidden">
            <Link onClick={() => openModal(data.id)}>
              <button>
                {" "}
                <AiTwotoneEdit />
              </button>
            </Link>

            <button onClick={() => handleDelete(data.id)}>
              <AiTwotoneDelete />{" "}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="cool__link">
            <div className="task">
              <span>
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
              </span>
            </div>
            <button type="submit">Done</button>
          </form>
        </div>
      )}
      <Modal isOpen={open} onClose={closeModal} tId={todoId} />
    </div>
  );
}

export default GetTodo;
