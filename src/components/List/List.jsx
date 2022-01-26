import React from 'react'
import Task from './Task'

export default function List({ tasks, toggleTaskChech, taskDelete, editedInputValue }) {
  return (
    <>
      <ul className="uk-tasks uk-list uk-margin-top uk-padding-remove-horizontal">
        {tasks.map(task => {
          return <Task key={task.id} toggleTaskChech={toggleTaskChech} taskDelete={taskDelete} task={task} editedInputValue={editedInputValue} />
        })}
      </ul>
    </>
  )
}
