import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:3004/completed'

const fetchData = async () => {
  const response = await axios.get(API_URL)
  return response?.data.quantity
}

export function useTasksCompleted() {
  const query = useQuery({
    queryKey: ['get-completed'],
    queryFn: fetchData,
  })

  return {
    ...query,
    tasks_completed: query.data
  }
}
