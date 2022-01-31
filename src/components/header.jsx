import React, { useRef } from 'react'

export default function Header({ lists, listForm, toggleListForm, addNewList, selectedListId }) {
  const inputRef = useRef()
  const handleOnSubmit = event => {
    event.preventDefault()
    const title = inputRef.current.value
    if (!title) return alert('Please, set an Title for the new List.')
    inputRef.current.value = null
    addNewList(title)
  }
  const handleLinkId = event => {
    event.preventDefault()
    const id = event.target.id
    selectedListId(id)
  }
  return (
    <>
      <h1 className="uk-h3 uk-margin-large-top uk-text-uppercase uk-text-muted uk-text-center">To do lists</h1>
      <div className="uk-flex uk-flex-middle">
        <ul className="uk-flex-auto uk-tab uk-margin-remove-bottom uk-margin-small-top" data-uk-switcher="connect: .switcher-section; animation: uk-animation-slide-bottom-small">
          {lists.map(list => (
            <li key={list.id}>
              <a onClick={handleLinkId} href={`#list-section-${list.id}`} id={list.id}>
                {list.title}
              </a>
            </li>
          ))}
        </ul>
        {(listForm && (
          <button
            onClick={toggleListForm}
            className="uk-button uk-button-icon uk-margin-small-left uk-padding-remove-horizontal uk-text-success uk-icon"
            type="button"
            data-uk-icon="plus"
            data-uk-tooltip="title: Add new list"
            data-uk-scrollspy="cls:uk-animation-slide-left"
          ></button>
        )) || (
          <form onSubmit={handleOnSubmit} className="uk-form uk-flex uk-flex-middle" data-uk-scrollspy="cls:uk-animation-slide-right-small">
            <button
              onClick={toggleListForm}
              className="uk-button uk-button-icon uk-padding-small uk-padding-remove-vertical uk-text-danger uk-icon"
              type="button"
              data-uk-icon="close"
              data-uk-tooltip="title: Cencel"
            ></button>
            <input ref={inputRef} className="uk-input uk-form-small" type="text" placeholder="Add New List" autoFocus />
          </form>
        )}
      </div>
    </>
  )
}
