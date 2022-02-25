import axios from "axios";
import { useEffect, useState } from "react";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default function useFetch(method, endpointUrl, datum) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method,
      url: endpointUrl,
      data: datum,
    })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
}
