import React, { useState, useRef } from 'react'

export default function Item({ item, toggleCheched, itemDelete, editedInputValue }) {
  const [itemEditable, setItemEditable] = useState(false)
  const textInputValueRef = useRef()
  const [inputValue, setInputValue] = useState(textInputValueRef)

  function handleItemClick() {
    toggleCheched(item.id)
  }
  function handleItemDelete() {
    itemDelete(item.id)
  }
  function handleInputValue(event) {
    event.preventDefault()
    const id = item.id
    const text = inputValue.current.value
    if (text === '') return alert('Task Text is required!')
    setItemEditable(itemEditable => (itemEditable = !itemEditable))
    editedInputValue(id, text)
  }
  let checkColor = 'uk-margin-small-right uk-icon-button uk-text-'
  checkColor += item.check ? 'success uk-margin-left' : 'warning'
  let inputClass = 'uk-input uk-flex-auto'
  inputClass += item.check ? ' uk-text-muted' : ''
  return (
    <>
      {(itemEditable && (
        <li className="uk-flex uk-flex-middle">
          <span className={checkColor} data-uk-icon="pencil"></span>
          <input className={inputClass} type="text" defaultValue={item.text} ref={textInputValueRef} autoFocus />
          <span onClick={handleInputValue} className="uk-margin-small-left uk-icon-button uk-text-success" data-uk-icon="check"></span>
          <span
            onClick={() => {
              setItemEditable(itemEditable => (itemEditable = !itemEditable))
            }}
            className="uk-margin-small-left uk-icon-button uk-text-danger"
            data-uk-icon="close"
          ></span>
        </li>
      )) || (
        <li className="uk-flex uk-flex-middle">
          <span onClick={handleItemClick} className={checkColor} data-uk-icon="check"></span>
          <input className={inputClass} type="text" value={item.text} readOnly />
          <span
            onClick={() => {
              setItemEditable(itemEditable => (itemEditable = !itemEditable))
            }}
            className="uk-margin-small-left uk-icon-button"
            data-uk-icon="pencil"
          ></span>
          <span onClick={handleItemDelete} className="uk-margin-small-left uk-icon-button uk-text-danger" data-uk-icon="trash"></span>
        </li>
      )}
    </>
  )
}
