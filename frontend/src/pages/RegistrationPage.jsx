import { useState } from 'react'
import Navbar from '../compnents/Navbar'
import Footer from '../compnents/Footer'
import { getRoleFromCookie } from '../lib/auth'

function RegistrationPage() {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:1337/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        
      },
      body: JSON.stringify(
        { 
          data: {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            date:{
              data:{
                start: formData.startDate,
                end: formData.endDate
              }
            }
          }
        }
      )
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <>
    {getRoleFromCookie()==='false'?<h1 className='text-center text-2xl font-bold'>You are not authorized to access this page</h1>:
    <>
      <Navbar />
      <div className='flex my-10 flex-col items-center gap-10'>
        <div className='mx-2 md:mx-10 lg:mx-20'>
          <div>
            <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Enter name</label>
            <input type="text" name='name' id="small-input" onChange={handleChange} value={formData.name} className="block w-72 md:w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
          </div>
          <div className="mb-6">
            <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900">Enter description</label>
            <textarea rows={10} type="text" name='description' id="large-input"onChange={handleChange} value={formData.description} className="block w-72  md:w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 " />
          </div>
          <div className='flex w-full flex-wrap flex-col md:flex-row items-center justify-evenly'>
            <div>
              <label for="location" className="block mb-2 text-sm font-medium text-gray-900 ">Enter Event Location</label>
              <input type="text" name='location' id="location"onChange={handleChange} value={formData.location} className="block w-64  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
            </div>
            <div>
              <label for="start-date" className="block mb-2 text-sm font-medium text-gray-900 ">Enter Start Date</label>
              <input type="text" name='startDate' id="start-date"onChange={handleChange} value={formData.startDate} className="block w-64 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
            </div>
            <div>
              <label for="end-date" className="block mb-2 text-sm font-medium text-gray-900 ">Enter End Date</label>
              <input type="text" name='endDate' id="end-date"onChange={handleChange} value={formData.endDate} className="block w-64 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
            </div>
          </div>

        </div>
        <div >
          <button className='p-2 bg-blue-600 text-white rounded-lg hover:cursor-pointer hover:bg-blue-400 font-bold'
          onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <Footer />
      </>
}
    </>
  )
}

export default RegistrationPage