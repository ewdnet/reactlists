import React, { useRef, useState } from 'react'

export default function Header(props) {
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
      <ul className="uk-flex-auto uk-tab uk-margin-remove-bottom" data-uk-switcher>
        <li>
          <a href="#">Item</a>
        </li>
        {lists.map(list => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>

      {(props.listForm && (
        <button
          onClick={props.toggleListForm}
          className="uk-button uk-button-icon uk-padding-remove-horizontal uk-text-success"
          type="button"
          data-uk-icon="plus"
          data-uk-scrollspy="cls:uk-animation-slide-right-small"
        ></button>
      )) || (
        <form onSubmit={props.addNewList} className="uk-form" data-uk-scrollspy="cls:uk-animation-slide-right-small">
          <input ref={newListTitleRef} className="uk-input uk-text-small" type="text" placeholder="Add New List" autoFocus />
        </form>
      )}
    </>
  )
}
