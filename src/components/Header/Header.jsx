import React, { useRef, useState } from 'react'

export default function Header({ listForm, toggleListForm, addNewList }) {
  const [lists, setLists] = useState([])
  const newListTitleRef = useRef()

  function addList() {
    const list = {
      id: Date.now(),
      title: newListTitleRef.current.value,
    }
    setLists([...lists, list])
  }

  return (
    <>
      <h1 className="uk-text-muted uk-text-center">To do lists</h1>
      <div className="uk-flex uk-flex-middle">
        <ul className="uk-flex-auto uk-tab uk-margin-remove-bottom uk-margin-small-top" data-uk-switcher>
          <li>
            <a href="#">Item</a>
          </li>
          {lists.map(list => (
            <li key={list.id}>{list.title}</li>
          ))}
        </ul>

        {(listForm && (
          <button
            onClick={toggleListForm}
            className="uk-button uk-button-icon uk-padding-remove-horizontal uk-text-success uk-icon"
            type="button"
            data-uk-icon="plus"
            data-uk-tooltip="title: Add new list"
            data-uk-scrollspy="cls:uk-animation-slide-left"
          ></button>
        )) || (
          <form onSubmit={addNewList} className="uk-form uk-flex uk-flex-middle" data-uk-scrollspy="cls:uk-animation-slide-right-small">
            <button
              onClick={toggleListForm}
              className="uk-button uk-button-icon uk-padding-small uk-padding-remove-vertical uk-text-danger uk-icon"
              type="button"
              data-uk-icon="close"
              data-uk-tooltip="title: Cencel"
            ></button>
            <input ref={newListTitleRef} className="uk-input uk-text-small" type="text" placeholder="Add New List" autoFocus />
          </form>
        )}
      </div>
    </>
  )
}
