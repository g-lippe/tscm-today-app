import { useFormik } from "formik";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import styles from './form.module.scss';



export default function TaskForm() {
  const queryClient = useQueryClient()

  // Adicionar nova tarefa no JSON
  const addTarefaMutation = useMutation({
    mutationFn: (novaTarefa) => {
      return axios.post('http://localhost:3004/tasks', novaTarefa)
    },
    onSuccess: () => { queryClient.invalidateQueries(['get-tasks']) }
  })

  const formik = useFormik({
    initialValues: {
      taskName: '',
      taskDescr: ''
    },
    onSubmit: (values) => (
      // console.log('Submitted: ', values)
      addTarefaMutation.mutate({ id: crypto.randomUUID(), title: values.taskName, description: values.taskDescr })
    )
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3> Add new to do </h3>
      <div>
        <label>Task Name: </label>
        <input
          id="taskName"
          name="taskName"
          type="text"
          placeholder="Nome da tarefa"
          onChange={formik.handleChange}
          value={formik.values.taskName}
          required
        />
      </div>

      <div>
        <label>Task description: </label>
        <input
          id="taskDescr"
          name="taskDescr"
          type="text"
          placeholder="Descrição da tarefa"
          onChange={formik.handleChange}
          value={formik.values.taskDescr}
          required
        />
      </div>

      <div>
        <button type="submit">Add Task</button>
      </div>

      <div>
        {addTarefaMutation.isPending && <h6>Adding task...</h6>}
        {addTarefaMutation.isError && <div>An error occurred: {addTarefaMutation.error.message}</div>}
        {/* {addTarefaMutation.isSuccess && <h6>Adding task...</h6>} */}
      </div>

    </form>
  )
}