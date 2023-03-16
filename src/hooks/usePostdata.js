import { useState } from "react";
import axios from "axios";

const usePostData = () => {
  //states til håndtering af data, loading, og error.
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //hvis headers ikke kommer med er de null - "man kan sende en header med ellers er den null, payload er de data der skal postet/oprettes"
  const postData = (url, payload = null, headers = null, params = null) => {
    setLoading(true);

    axios
      .post(url, payload, { headers: headers, params: params })
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
  return { postData, error, loading, data };
};

export default usePostData;
