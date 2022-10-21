import React from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


function App() {

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const url  = 'http://localhost:8000/posts'

 
    const getData  = async ()=>{
     await axios.get(url)
     .then(res=>{
         setPosts(res.data)
     })
     .catch(error=>{ console.error(`Error ${error}`)})
    }

    const addPost = async (e)=>{
        e.preventDefault()
        await axios.post(url, {
            title,
            author
        })
        .then(res =>{
            const data = res.data
            setPosts([...posts, data])
            setTitle('')
            setAuthor('')
        })
        .catch(error=>{ console.error(`Error ${error}`)})

    }

    const deletePost = async  (id)=>{
     await axios.delete(`http://localhost:8000/posts/${id}`)
        .then(setPosts(posts.filter(post=> post.id !== id)))
    }

    useEffect(()=>{
        getData()
    },[])



  return (
    <div>App

 
        <form>
            <input type='text' placeholder='enter title'  value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type='text' placeholder='enter author'  value={author} onChange={(e)=>{setAuthor(e.target.value)}}/>
            <button onClick={addPost}>ADD...</button>
        </form>

        {posts.map( post => {
            return <h3 key={post.id}>TITLE: {post.title} ________ AUTHOR: {post.author} <button onClick={()=>{deletePost(post.id)}}>DELETE</button></h3>
        })}
    </div>
  )
}

export default App