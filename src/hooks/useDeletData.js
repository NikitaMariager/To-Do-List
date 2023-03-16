import { useState } from "react";
import axios from "axios";

const useDeleteData = () => {
  //states til håndtering af data, loading, og error.
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //hvis headers ikke kommer med er de null - "man kan sende en header med ellers er den null"
  const deleteData = (url, headers = null, params = null) => {
    setLoading(true);

    axios
      .delete(url, { headers: headers, params: params })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setData();
      })
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };
  //det der 'udbydes' fra hooket her
  return { deleteData, error, loading, data };
};

export default useDeleteData;
