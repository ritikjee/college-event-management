import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import dateCompare from '../helper/dateCompare'


function EventItem({startDate,endDate,location,description,posterLink,title,id}) {
  const d = new Date();
  const dd= d.getFullYear().toString()+"-"+(d.getMonth()+1).toString()+"-"+d.getDate().toString();
  const status = dateCompare(startDate,endDate,dd);
  const abc = status==="COMPLETED"?{backgroundColor:"rgb(254 240 138)",borderRight: "solid 4px yellow"}:{backgroundColor:"rgb(187 247 208)",borderRight: "solid 4px green"}

  const handleClick = (id) => {
    return () => {
      window.location.href = `/event/${id}`
    }
  }



  return (
    
    <>
      <div className="flex justify-center items-center sm:items-start sm:flex-row flex-col sm:m-10 my-10 " >
        <img src={posterLink} className="w-[300px] h-[400px] rounded-l-md " alt="posterLink" />
        <div className="w-[300px] sm:w-[600px] py-2 sm:px-10  sm:h-[400px] " style={abc}>
          <p className='font-bold'>
            {status}
          </p>
          <p className="text-gray-900 font-bold text-xl mb-2 py-2 md:py-5">
            {title}
          </p>
          <p className="text-gray-700 text-base py-2 md:pb-3 sm:overflow-y-auto sm:h-[150px]">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fuga laboriosam ducimus hic doloremque reprehenderit dignissimos quos consequuntur alias? Placeat enim ducimus asperiores non fuga doloremque similique corrupti perferendis. A?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias pariatur ratione nesciunt expedita inventore cupiditate quod vitae, tempora debitis eius facere enim provident, totam cumque voluptates rem, cum similique iure. */}
            {description}
          </p>
          <div className='flex justify-between items-center px-3 py-2'>
            <div className='flex items-center gap-3 pb-4'>
              <FaCalendarAlt className='text-lg ' />
              <div>
                <p>
                  {startDate}
                </p>
                <p>
                  {endDate}
                </p>
              </div>
            </div>
            <div className=' flex flex-col items-center md:px-10'>
              <FaLocationDot />
              <p>{location}</p>
            </div>

          </div>
          <button onClick={handleClick(id)} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Read more</button>
        </div>
      </div>
    </>
  )
}

export default EventItem