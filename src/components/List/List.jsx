import React from 'react'
import Item from './Item'

export default function List({ list, toggleCheched, itemDelete, editedInputValue }) {
  return (
    <section className="uk-margin uk-padding-small uk-padding-remove-horizontal">
      <ul className="uk-list">
        {list.map(item => {
          return <Item key={item.id} toggleCheched={toggleCheched} itemDelete={itemDelete} item={item} editedInputValue={editedInputValue} />
        })}
      </ul>
    </section>
  )
}
