import {useEffect, useState} from "react";
import axios from "axios";

export default function useGetTasks(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getData() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(url);
        if (isMounted) {
          setData(res.data);
        }
      } catch (err) {
        isMounted && setError(err);
      } finally {
        isMounted && setLoading(false);
      }
    }

    getData();

    return () => (isMounted = false);
  }, [url]);

  return {data, loading, error};
}
