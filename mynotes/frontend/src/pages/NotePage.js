import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg';

const NotePage = ({match}) => {
    const {id} = useParams();
    const navigate = useNavigate()

    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    },[id])

    let getNote = async () => {
        if (id === 'new') return

        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
      fetch(`/api/notes/create/`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(note)
      })
    }

    let updateNote = async () => {
      fetch(`/api/notes/${id}/update/`, {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(note)
      })
    }

    let handleSubmit = () => {
      if (id !== 'new' && note.body === ''){
        deleteNote()
      } else if (id !== 'new'){
        updateNote()
      } else if (id === 'new' && note !==null && note.body!==''){
        createNote()
      }
      navigate('/')
    }

    let deleteNote = async () => {
      fetch(`/api/notes/${id}/delete/`, {
        method: 'DELETE',
        'headers': {
          'Content-Type': 'application/json'
        }
      })
      navigate('/')
    }


  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
            <Arrowleft onClick={handleSubmit}/>
        </h3>
        {id !== 'new'? (
          <button onClick={deleteNote}>Delete</button>
        ): (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  );
}

export default NotePage;
