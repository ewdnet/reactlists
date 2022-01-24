import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import List from './components/List/List'
import Footer from './components/Footer/Footer'

const data = [
  { id: 1, check: false, text: 'Lorem ipsum dolor sit amet ... 1' },
  { id: 2, check: false, text: 'Lorem ipsum dolor sit amet ... 2' },
  { id: 3, check: true, text: 'Lorem ipsum dolor sit amet ... 3' },
  { id: 4, check: false, text: 'Lorem ipsum dolor sit amet ... 4' },
]

function App() {
  const [list, setList] = useState([])
  const [listForm, setListForm] = useState(true)
  const [itemForm, setItemForm] = useState(true)

  function toggleListForm() {
    setListForm(prevListForm => (prevListForm = !prevListForm))
    setItemForm(itemForm => (itemForm = true))
  }
  function toggleItemForm() {
    setItemForm(prevItemForm => (prevItemForm = !prevItemForm))
    setListForm(listForm => (listForm = true))
  }

  function handleAddNewList(event) {
    event.preventDefault()
    setListForm(prevListForm => (prevListForm = !prevListForm))
  }
  function handleAddNewItem(text) {
    setItemForm(prevItemForm => (prevItemForm = !prevItemForm))

    const item = { id: Date.now(), check: false, text: text }
    setList(prevList => [...prevList, item])
  }

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('listTitle'))
    if (storedList) setList(storedList)
  }, [])

  useEffect(() => {
    localStorage.setItem('listTitle', JSON.stringify(list))
  }, [list])

  function handleToggleCheched(id) {
    const newList = [...list]
    const item = newList.find(item => item.id === id)
    item.check = !item.check
    setList(newList)
  }
  function handleItemDelete(id) {
    const newList = list.filter(item => item.id !== id)
    setList(newList)
  }
  function handleEditedInputValue(id, text) {
    const newList = [...list]
    const item = newList.find(item => item.id === id)
    item.text = text
    setList(newList)
  }

  return (
    <>
      <header className="uk-container uk-container-xsmall uk-flex uk-flex-bottom">
        <Header listForm={listForm} addNewList={handleAddNewList} toggleListForm={toggleListForm} />
      </header>
      <div className="uk-container uk-container-xsmall">
        <section className="uk-padding">
          <Form toggleItemForm={toggleItemForm} itemForm={itemForm} inputValue={handleAddNewItem} />
          <List list={list} toggleCheched={handleToggleCheched} itemDelete={handleItemDelete} editedInputValue={handleEditedInputValue} />
        </section>
      </div>
      <footer className="uk-container uk-container-xsmall">
        <Footer />
      </footer>
    </>
  )
}

export default App
