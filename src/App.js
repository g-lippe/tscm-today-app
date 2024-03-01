import './App.scss';
import TaskForm from './components/form';
import TaskList from './components/taskList';
import { useChuckNorris } from './hooks/useChuckNorris';
import { useTasksCompleted } from './hooks/useTasksCompleted';


function App() {
  const data_joke = useChuckNorris();
  const { tasks_completed, isLoading, isError } = useTasksCompleted();


  return (
    <div className="App">

      <h1>To<span>day</span></h1>
      <p>Wake up , go ahead , do the thing not tomorrow, do <strong>to</strong>day.</p>

      <div className='cont_main'>

        <div className='cont_todo'>
          <h3>To do</h3>
          {tasks_completed && <TaskList total_completed={tasks_completed} /> }
          {isLoading && <p>Loading...</p> }
          {isError && <p>Error</p> }
        </div>

        <div className='cont_right'>

          <div className='finished'>
            <h3> Finished tasks quantity </h3>
            <h1>{String(tasks_completed).padStart(2, '0')}</h1>
          </div>

          <TaskForm />

        </div>
      </div>

      {data_joke.isLoading && <h1>Loading...</h1>}

      {data_joke.isError && <pre>{JSON.stringify(data_joke.error)}</pre>}

      {data_joke &&
        <div className='cont_joke'>
          <p>"{data_joke}"</p>
          <span><strong>By api.chucknorris.io</strong></span>
        </div>
      }

      <div className='cont_signature'>
        <h5>@Made with ❤ by g-lippe</h5>
      </div>

    </div>
  );
}

export default App;
