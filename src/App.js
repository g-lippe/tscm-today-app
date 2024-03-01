import './App.scss';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <h1>To<span>day</span></h1>
        <p>Wake up , go ahead , do the thing not tomorrow, do <strong>to</strong>day.</p>
      </div>

      <div className='cont_main'>
        <div className='cont_tasks'>
          <h3>To do</h3>

          <div className='task_list'>
            <div className='task'>
              <h4>Task Name</h4>
              <p>This is the task description</p>
            </div>
            <div className='task'>
              <h4>Task Name #2</h4>
              <p>This is the task description of the second one</p>
            </div>
          </div>

        </div>

        <div className='cont_right'>
          <div className='finished'>
            <h3> Finished tasks quantity </h3>
            <h1>00</h1>
          </div>

          <div className='cont_form'>
            <h3> Add new to do </h3>

          </div>
        </div>

      </div>
      <div>
        <p>"Chuck Norris Phrase"</p>
        <p>By Chuck Norris</p>
      </div>

    </div>
  );
}

export default App;
