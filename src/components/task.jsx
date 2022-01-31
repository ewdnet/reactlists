import { useRef, useState } from 'react'

export default function Task({ task, toggleTaskChech, taskDelete, editedInputValue }) {
  const [taskEditable, setTaskEditable] = useState(false)
  const textInputValueRef = useRef()

  const handleItemClick = () => {
    toggleTaskChech(task.id)
  }
  const handleItemDelete = () => {
    taskDelete(task.id)
  }
  const handleInputValue = event => {
    event.preventDefault()
    const id = task.id
    const text = textInputValueRef.current.value
    if (text === '') return alert('Task Text is required!')
    setTaskEditable(taskEditable => (taskEditable = !taskEditable))
    editedInputValue(id, text)
  }

  let checkColor = 'uk-margin-small-right uk-icon-button uk-text-'
  checkColor += task.check ? 'success uk-margin-large-left' : 'warning'
  const checkStatus = task.check ? 'title: Mark task as current' : 'title: Mark task as completed'

  return (
    <>
      {(taskEditable && (
        <li className="uk-flex uk-flex-middle">
          <span className={checkColor} data-uk-icon="pencil" data-uk-tooltip="title: Item is editable"></span>
          <form onSubmit={handleInputValue} className="uk-flex-auto uk-flex uk-flex-middle">
            <input className="uk-input uk-flex-auto" type="text" defaultValue={task.text} ref={textInputValueRef} autoFocus />
            <span onClick={handleInputValue} className="uk-margin-small-left uk-icon-button uk-text-success" data-uk-icon="check" data-uk-tooltip="title: Save the new text"></span>
          </form>
          <span
            onClick={() => {
              setTaskEditable(taskEditable => (taskEditable = !taskEditable))
            }}
            className="uk-margin-small-left uk-icon-button uk-text-danger"
            data-uk-icon="close"
            data-uk-tooltip="title: Cencel editing"
          ></span>
        </li>
      )) || (
        <li className="uk-flex uk-flex-middle">
          <span onClick={handleItemClick} className={checkColor} data-uk-icon="check" data-uk-tooltip={checkStatus}></span>
          <span className="uk-flex-auto uk-flex uk-flex-middle">
            <input className="uk-input uk-flex-auto uk-text-muted" type="text" value={task.text} readOnly />
            <span
              onClick={() => {
                setTaskEditable(taskEditable => (taskEditable = !taskEditable))
              }}
              className="uk-margin-small-left uk-icon-button"
              data-uk-icon="pencil"
              data-uk-tooltip="title: Edit the text"
            ></span>
          </span>
          <span onClick={handleItemDelete} className="uk-margin-small-left uk-icon-button uk-text-danger" data-uk-icon="trash" data-uk-tooltip="title: Delete the task"></span>
        </li>
      )}
    </>
  )
}
