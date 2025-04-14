import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

const endpoint = 'https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts';
const initialFormData = {
  author: '',
  title: '',
  body: '',
  public: false,

}

function App() {


  const [books, setBooks] = useState([]);
  const [formData, setForm] = useState(initialFormData);

  function fetchData() {
    axios.get(endpoint)
      .then((res) => setBooks(res.data))
  }

  function handleFormData(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((formData) => ({
      ...formData,
      [e.target.name]: value
    }))
  }



  function handleSubmit(e) {
    e.preventDefault();

    axios.post(endpoint, formData)
      .then(res => {
        setBooks([...books, res.data]);
        console.log(res.data)

        console.log(books)
        setForm(initialFormData);

      })
      .catch(err => {
        console.error("Errore durante l'invio del post:", err);
      })



  }

  useEffect(fetchData, [])


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Nome</label>
        <input type='text' value={formData.author} onChange={handleFormData} placeholder='Inserisci nome dell autore' id='author' name='author' />
        <br />
        <label htmlFor="title">Titolo</label>
        <input type='text' value={formData.title} onChange={handleFormData} placeholder='Inserisci titolo del libro' id='title' name='title' />
        <br />
        <label htmlFor="body">Descrizione</label>
        <input type='text' value={formData.body} onChange={handleFormData} placeholder='Inserisci una descrizione del libro' id='body' name='body' />
        <br />
        <label htmlFor="aviable">Disponibile</label>
        <input type="checkbox" checked={formData.public} onChange={handleFormData} id="aviable" name="public" />
        <br />
        <button>Invia</button>


      </form>

    </>
  )
}

export default App
