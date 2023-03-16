import React from "react";
import Titel from "../../components/Titel";
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/loader/loader";
import Error from "../../components/Error";
import ToDoCreate from "./toDoCreate";
import { useEffect } from "react";
import Eyes from "../../components/eyes/eyes";
import GetTodos from "./GetTodos";
import GetDone from "./GetDone";
import { AiTwotoneEdit, AiFillFileAdd } from "react-icons/ai";

import "./sidenav.scss";

function ToDo() {
  const { error, loading, data, getData } = useGetData();

  useEffect(() => {
    getData("https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC", {
      Authorization: "Bearer " + "keypJpuWWvXgrg8ka",
    });
  }, []);

  const myFunction = () => {
    let x = document.querySelectorAll(".editToDo");

    x.forEach(function (el) {
      el.classList.toggle("hidden");
    });
  };

  const openNav = () => {
    document.querySelector(".sidenav").style.width = "100%";
  };

  const closeNav = () => {
    document.querySelector(".sidenav").style.width = "0";
  };

  return (
    <div className="main">
      <div className="header">
        <Titel headline="To Do List" />

        <div className="msgcontainer">
          {/* error */}
          {error && <Error />}

          {/* loading */}
          {loading && <Loader />}
        </div>

        <Eyes />
      </div>

      <div className="toDo">
        <button className="edit" onClick={() => myFunction()}>
          <span>Edit To do list</span> <AiTwotoneEdit />
        </button>
        <button onClick={() => openNav()} className="sidebar-icon">
          <AiFillFileAdd />
        </button>

        <div className=" sidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => {
              closeNav();
            }}
          >
            &times;
          </a>
          <ToDoCreate />
        </div>

        <div className="status">
          <h2>Do:</h2>
          <div className="allTodos">
            <GetTodos />
          </div>
        </div>

        <div className="status">
          <h2>Done:</h2>
          <div className="allTodos">
            <GetDone />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
