import { useState } from "react";
import axios from "axios";

const useGetData = () => {
  //states til håndtering af data, loading, og error.
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //hvis headers ikke kommer med er de null - "man kan sende en header med ellers er den null"
  const getData = (url, headers = null, params = null) => {
    setLoading(true);

    axios
      .get(url, { headers: headers, params: params })
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
      });
  };
  //det der 'udbydes' fra hooket her
  return { getData, error, loading, data };
};

export default useGetData;
