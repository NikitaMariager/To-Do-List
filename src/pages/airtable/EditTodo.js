import React from "react";
import useGetData from "../../hooks/useGetData";
import { useState, useEffect } from "react";
import Error from "../../components/Error";
import Loader from "../../components/loader/loader";
import usePatchData from "../../hooks/usePatchData";

function Edit({ id }) {
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
    getCatData("https://api.airtable.com/v0/appYdrJIQqgZg8eGB/Category", {
      Authorization: "Bearer keypJpuWWvXgrg8ka",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let updateMsg = {
      fields: {
        Status: [updateCat],
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

  return (
    <div>
      <div className="msgcontainer">
        {/*Hvis der er error eller errorDelete */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      {data && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                placeholder={data.fields.todos}
                onInput={(e) => setUpdatet(e.target.value)}
              ></input>
            </label>

            {/* choose categori */}
            <label>
              <select
                defaultValue={data.fields.Category}
                onChange={(e) => setUpdateCat(e.target.value)}
              >
                {dataCat &&
                  dataCat.records.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.fields.Name}
                    </option>
                  ))}
              </select>
            </label>

            <button type="submit">Gem rettelse</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Edit;
