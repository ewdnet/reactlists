import React, { useRef } from 'react'

export default function Form({ toggleItemForm, itemForm, inputValue }) {
  const textInputValueRef = useRef()

  function handleInputValue(event) {
    event.preventDefault()
    const text = textInputValueRef.current.value
    if (text === '') return alert('Task Text is required!')
    textInputValueRef.current.value = null
    inputValue(text)
  }

  return (
    (itemForm && (
      <button
        onClick={toggleItemForm}
        className="uk-button uk-button-icon uk-margin-small-left uk-padding-remove-horizontal uk-text-success"
        type="button"
        data-uk-icon="plus"
        data-uk-tooltip="title: Add new task"
        data-uk-scrollspy="cls:uk-animation-slide-right"
      ></button>
    )) || (
      <form onSubmit={handleInputValue} className="uk-form uk-width-xlarge uk-flex uk-flex-middle" data-uk-scrollspy="cls: uk-animation-slide-left-small">
        <button
          onClick={toggleItemForm}
          className="uk-button uk-button-icon uk-margin-small-left uk-margin-small-right uk-padding-remove-horizontal uk-padding-remove-vertical uk-text-danger uk-icon"
          type="button"
          data-uk-icon="close"
          data-uk-tooltip="title: Cencel"
        ></button>
        <input ref={textInputValueRef} className="uk-input" type="text" placeholder="Add New Task" autoFocus />
      </form>
    )
  )
}
