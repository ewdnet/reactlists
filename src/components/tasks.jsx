import Task from './task'

export default function Tasks({ tasks }) {
  return (
    <>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </>
  )
}
