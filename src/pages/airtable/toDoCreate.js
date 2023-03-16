import { useState, useEffect } from "react";
import Titel from "../../components/Titel";
import usePostData from "../../hooks/usePostdata";
import useGetData from "../../hooks/useGetData";

function ToDoCreate() {
  //hook til post/opret data
  const {
    error: postError,
    loading: PostLoading,
    data: PostData,
    postData,
  } = usePostData();

  const {
    error: errorCat,
    loading: loadingCat,
    data: dataCat,
    getData,
  } = useGetData();

  //state til at rumme ny to do (fra input felt)
  const [newtodo, setNewtodo] = useState("");

  const [cat, setCat] = useState(); //valg af kategori id fra dropdown

  useEffect(() => {
    getData("https://api.airtable.com/v0/appYdrJIQqgZg8eGB/Category", {
      Authorization: "Bearer keypJpuWWvXgrg8ka",
    });
  }, []);

  useEffect(() => {
    if (PostData) setNewtodo("");
    document.querySelector("form").reset();
  }, [PostData]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault(); //stop fra at reload hele side in submit

    let ny = {
      fields: {
        todos: newtodo,
        Category: [cat],
        Status: ["recdMIeIH8uE4cacx"],
      },
    };
    //send til hook der sender til API

    postData(
      "https://api.airtable.com/v0/appYdrJIQqgZg8eGB/tblECrVoUhPApepSC",
      ny,
      {
        Authorization: "Bearer keypJpuWWvXgrg8ka",
        "Content-Type": "application/json",
      }
    );
  };

  return (
    //Todo tøm input efter post (hvis data -ellers ikke)

    <div className="toDo-card createTodo">
      <h2>Create to do:</h2>

      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          <input
            type="text"
            placeholder="type in a task"
            value={newtodo}
            onInput={(e) => setNewtodo(e.target.value)}
          ></input>
        </label>

        <label>
          <select
            defaultValue="DEFAULT"
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              {" "}
              Vælg en kategori
            </option>
            {dataCat &&
              dataCat.records.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.fields.Name}
                </option>
              ))}
          </select>
        </label>

        <button type="submit">Opret to do</button>
      </form>
    </div>
  );
}

export default ToDoCreate;
