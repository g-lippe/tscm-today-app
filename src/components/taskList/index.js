import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTasks } from "../../hooks/useTasks";
import axios from "axios";
import styles from './tasklist.module.scss';
import CloseIcon from './closeIcon';


export default function TaskList({ total_completed }) {
  const queryClient = useQueryClient()
  const { task_data, isLoading, isError } = useTasks()


  // Remover tarefa no JSON
  const delTarefaMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3004/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get-tasks'])
      addCompletadas.mutate({ quantity: total_completed + 1 })
    }
  })


  // Add +1 a completadas no JSON
  const addCompletadas = useMutation({
    mutationFn: (valor) => {
      return axios.put('http://localhost:3004/completed', valor)
    },
    onSuccess: () => { queryClient.invalidateQueries(['get-completed']) }
  })


  return (
    <div className={styles.task_list}>
      {task_data && task_data.map(task => (
        <div key={task.id} className={styles.task}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <CloseIcon styles={styles} size={'20'} func={() => delTarefaMutation.mutate(task.id)}/>
        </div>
      ))}

      {isLoading && 'Carregando Tarefas...'}

      {isError && 'Erro ao carregar as tarefas'}
    </div>
  )
}