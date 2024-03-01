import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'https://api.chucknorris.io/jokes/random'

const fetchData = async () => {
  const response = await axios.get(API_URL)
  return response?.data?.value
}

export function useChuckNorris() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['norris-joke'],
    queryFn: fetchData,
    // refetchInterval: 5000
  })

  if (isLoading) return 'Loading...'
  if (error) return 'Ocorreu um erro: ' + error.message
  return data;
}
