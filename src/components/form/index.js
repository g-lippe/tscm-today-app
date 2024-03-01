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
    onSubmit: (values) => {
      addTarefaMutation.mutate({ id: crypto.randomUUID(), title: values.taskName, description: values.taskDescr, datestamp:data.toLocaleDateString("en-gb", options) })
      values.taskName = ''
      values.taskDescr = ''
    }
  })

  // Definir formato da data
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
    <form onSubmit={formik.handleSubmit}>
      <h3> Add new to do </h3>
      <div className={styles.cont_input}>
        <label htmlFor='taskName'>Task Name : </label>
        <input
          id="taskName"
          name="taskName"
          type="text"
          placeholder="Give the task a name"
          onChange={formik.handleChange}
          value={formik.values.taskName}
          maxlength="50"
          required
        />

        <label htmlFor='taskDescr'>Task description : </label>
        <input
          id="taskDescr"
          name="taskDescr"
          type="text"
          placeholder="Give the task a description"
          onChange={formik.handleChange}
          value={formik.values.taskDescr}
          maxlength="150"
          required
        />
        
        <button type="submit">Create Todo</button>
      </div>

      <div>
        {addTarefaMutation.isPending && <h6>Adding task...</h6>}
        {addTarefaMutation.isError && <div>An error occurred: {addTarefaMutation.error.message}</div>}
      </div>

    </form>
  )
}