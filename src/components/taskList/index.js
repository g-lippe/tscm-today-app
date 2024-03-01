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

  const data = new Date()
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return (
    <div className={styles.task_list}>

      {task_data && task_data.map(task => (

        <div key={task.id} className={styles.task}>
          <h4>{task.title}</h4>
          
          <div className={styles.task_descr}>
            <p>{task.description}</p>
            <p>{data.toLocaleDateString("en-gb", options)}</p>
          </div>

          <CloseIcon styles={styles} size={'20'} func={() => delTarefaMutation.mutate(task.id)} />
        </div>

      ))}

      {task_data && task_data.length < 1 && <h2>All done! No tasks remaining</h2>}

      {isLoading && 'Carregando Tarefas...'}

      {isError && 'Erro ao carregar as tarefas'}
    </div>
  )
}