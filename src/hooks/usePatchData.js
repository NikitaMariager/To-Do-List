import { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

const usePatchData = () => {
  //states til håndtering af data, loading, og error.
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //hvis headers ikke kommer med er de null - "man kan sende en header med ellers er den null, payload er de data der skal postet/oprettes"
  const PatchData = (url, payload = null, headers = null, params = null) => {
    setLoading(true);

    axios
      .patch(url, payload, { headers: headers, params: params })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log("error");
        setError(true);
        setData();
      })
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };
  //det der 'udbydes' fra hooket her
  return { PatchData, error, loading, data };
};

export default usePatchData;
