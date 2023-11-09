import {  useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../compnents/Loading"
import Navbar from "../compnents/Navbar"
import Footer from "../compnents/Footer"
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { AiFillDelete } from 'react-icons/ai'
import Comment from "../compnents/Comment"
import { getIdFromCookie,getUserFromCookie, getRoleFromCookie } from "../lib/auth"
import { deleteEvent , addComment} from "../controller/controller"
import { Link } from "react-router-dom"


function EventPage() {
  const postComment = []
  const param = useParams()


  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [comments, setComment] = useState([])
  const [commentText, setCommentText] = useState('')
  const [commentData, setCommentData] = useState({
    userName: getUserFromCookie(),
    description:'',
  
  })




  const handleChange = (e) => {
    setCommentText(e.target.value)
    setCommentData({
      ...commentData,
      description: e.target.value
    })
    
  }
  const handleSubmit =  (e) => {
    e.preventDefault()
    for(let i=0;i<comments.length;i++){
      postComment.push({
        userName: comments[i].userName,
        description: comments[i].description
      })
    }

    postComment.push(commentData)

    setCommentText('')
    console.log(postComment)
    addComment(param.id,postComment)
  }

  
  const imageLink = `http://localhost:1337${image}`
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:1337/api/events/${param.id}?populate=*`)
        const data = await res.json()
        setData(data)
        setComment(data.data.attributes.comment)
        setImage(data.data.attributes.posterLink.data.attributes.url)

      }
      catch (err) {
        console.log(err)
        setError(err)
      }

      setLoading(false)
    }


    fetchEvent()
  }, [])
  return (

    <>
    
      {
        loading && !error ? <Loading /> : <>

          <Navbar />
          <div className="mx-2 sm:mx-20">
            <div className="sm:text-3xl py-5 flex justify-between">
              <p>{data.data.attributes.name}</p>
              <div className="flex hover:cursor-pointer gap-5">
                {getRoleFromCookie() === 'true' ?
                  <>
                    <AiFillDelete onClick={() => {
                      deleteEvent(param.id);
                    }} className="sm:text-2xl" />
                  </> :
                  null
                }

              </div>
            </div>
            <div className="flex justify-center">
              <img src={imageLink} className="w-[600px] py-10" alt="posterL" />
            </div>
            <p className="py-5">
              {data.data.attributes.description}
            </p>
            <div className="flex justify-between">
              <div className="flex items-center gap-5 py-5">
                <FaCalendarAlt className="text-3xl" />
                <div>
                  <p>{data.data.attributes.date.startDate}</p>
                  <p>{data.data.attributes.date.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <FaLocationDot className="text-3xl" />
                <p>{data.data.attributes.location}</p>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold py-5">Comments ({comments.length})</div>
              {comments ? <>
                <>
                  {
                    comments.map((comment) => (
                      <Comment name={comment.userName} comment={comment.description}  key={comment.id} />
                    ))
                  }
                </>
              </> : <h1 className="text-lg">No comments</h1>}
            </div>
          </div>
          {getIdFromCookie() ?
          <div className="flex flex-col items-center">
          <div>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" rows="4" name="comment" value={commentText} onChange={(e)=>
            handleChange(e)
            } className="block p-2.5 sm:w-[500px]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

          </div>
          <button className="bg-black text-white font-bold p-2 my-10 rounded-lg" onClick={handleSubmit} >Add comment</button>
        </div>:
        <h1 className="text-xl flex flex-col items-center my-10 ">
          Please login or register to comment
          <div className="flex  gap-10 py-5"> 
            <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
            <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
          </div>
        </h1>
          }
          <Footer />
        </>

      }
    </>
  )
}


export default EventPage
