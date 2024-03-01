import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:3004/tasks'

const fetchData = async () => {
  const response = await axios.get(API_URL)
  return response?.data
}

export function useTasks() {
  const query = useQuery({
    queryKey: ['get-tasks'],
    queryFn: fetchData,
  })

  return {
    ...query,
    task_data: query.data
  }
}
