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
        className="uk-button uk-button-icon uk-padding-remove-horizontal uk-text-success"
        type="button"
        data-uk-icon="plus"
        data-uk-scrollspy="cls:uk-animation-slide-right-small"
      ></button>
    )) || (
      <form onSubmit={handleInputValue} className="uk-form uk-margin">
        <input ref={textInputValueRef} className="uk-input" type="text" placeholder="Add New Task" autoFocus />
      </form>
    )
  )
}
