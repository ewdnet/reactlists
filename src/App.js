import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import List from './components/List/List'
import Footer from './components/Footer/Footer'

function App() {
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])
  const [listForm, setListForm] = useState(true)
  const [taskForm, setTaskForm] = useState(true)

  function toggleListForm() {
    setListForm(prevListForm => (prevListForm = !prevListForm))
    setTaskForm(true)
  }
  function toggleTaskForm() {
    setTaskForm(prevTaskForm => (prevTaskForm = !prevTaskForm))
    setListForm(true)
  }

  function handleAddNewList(title) {
    setListForm(prevListForm => (prevListForm = !prevListForm))

    const list = {
      id: Date.now(),
      title: title,
    }
    setLists([...lists, list])
  }
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('Lists')) || []
    if ('Lists') setLists(storedLists)
  }, [])

  useEffect(() => {
    localStorage.setItem('Lists', JSON.stringify(lists))
  }, [lists])

  function handleAddNewTask(text) {
    setTaskForm(prevTaskForm => (prevTaskForm = !prevTaskForm))

    const task = { id: Date.now(), check: false, text: text }
    setTasks(tasks => [...tasks, task])
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('Tasks')) || []
    if ('Tasks') setTasks(storedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleToggleTaskChech(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.check = !task.check
    setTasks(newTasks)
  }
  function handleTaskDelete(id) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  function handleEditedInputValue(id, text) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.text = text
    setTasks(newTasks)
  }

  return (
    <>
      <header className="uk-container uk-container-xsmall">
        <Header lists={lists} listForm={listForm} toggleListForm={toggleListForm} inputValue={handleAddNewList} />
      </header>
      <div className="uk-container uk-container-xsmall uk-margin-top">
        <Form taskForm={taskForm} toggleItemForm={toggleTaskForm} inputValue={handleAddNewTask} />
        <section className="uk-switcher uk-padding-small uk-padding-remove-horizontal switcher-section">
          <List tasks={tasks} toggleTaskChech={handleToggleTaskChech} taskDelete={handleTaskDelete} editedInputValue={handleEditedInputValue} />
        </section>
      </div>
      <footer className="uk-container uk-container-xsmall">
        <Footer />
      </footer>
    </>
  )
}

export default App
