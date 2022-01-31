import React, { useState, useEffect } from 'react'
import Header from './components/header'
import Form from './components/form'
import Tasks from './components/tasks'
import Footer from './components/footer'

function App() {
  const [listForm, setListForm] = useState(true)
  const [taskForm, setTaskForm] = useState(true)
  const [listId, setListId] = useState(0)
  const [lists, setLists] = useState([])

  useEffect(() => {
    const storedListId = localStorage.getItem('List ID')
    if (storedListId) setListId(Number(storedListId))
  }, [])
  useEffect(() => {
    localStorage.setItem('List ID', listId)
  }, [listId])

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('Lists')) || []
    if (storedLists) setLists(storedLists)
  }, [])
  useEffect(() => {
    localStorage.setItem('Lists', JSON.stringify(lists))
  }, [lists])

  const handleSelectedListId = id => setListId(id)

  const handleToggleListForm = () => {
    setListForm(prevListForm => (prevListForm = !prevListForm))
    setTaskForm(true)
  }
  const handleToggleTaskForm = () => {
    setTaskForm(prevTaskForm => (prevTaskForm = !prevTaskForm))
    setListForm(true)
  }
  const handleAddNewList = title => {
    setListForm(prevListForm => (prevListForm = !prevListForm))
    const list = {
      id: Date.now(),
      title,
      tasks: [],
    }
    if (lists.length === 0) setListId(list.id)
    setLists([...lists, list])
  }
  const handleAddNewTask = text => {
    setTaskForm(prevTaskForm => (prevTaskForm = !prevTaskForm))
    const task = {
      id: Date.now(),
      check: false,
      text: text,
    }
    let currList = lists.find(list => list.id === listId).tasks.push(task)
    console.log(currList)
    // setLists([...lists, { ...currList }])
    // localStorage.setItem('Lists', JSON.stringify(lists))

    console.log('Listen', lists)
    setLists([...lists])
  }

  return (
    <>
      <header className="uk-container uk-container-xsmall">
        <Header lists={lists} listForm={listForm} toggleListForm={handleToggleListForm} addNewList={handleAddNewList} selectedListId={handleSelectedListId} />
      </header>
      <div className="uk-container uk-container-xsmall uk-margin-top">
        <Form lists={lists} taskForm={taskForm} toggleItemForm={handleToggleTaskForm} addNewTask={handleAddNewTask} />
        <section className="uk-switcher uk-padding-small uk-padding-remove-horizontal switcher-section">
          {lists.map(list => (
            <ol key={list.id} className="uk-tasks uk-list uk-margin-top uk-padding-remove-horizontal">
              <Tasks tasks={list.tasks} />
            </ol>
          ))}
        </section>
      </div>
      <footer className="uk-container uk-container-xsmall">
        <ol className="uk-list uk-switcher switcher-section">
          <Footer lists={lists} />
        </ol>
      </footer>
    </>
  )
}

export default App
