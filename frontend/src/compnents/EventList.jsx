import EventItem from "./EventItem"
import bgImage from '../assets/bgImage.jpg'

function EventList({events}) {
  
  return (
    <>
{
    events.map((event)=>(

        <EventItem id={event.id} key={event.id} title={event.attributes.name} description={event.attributes.description} location={event.attributes.location} startDate={event.attributes.date.startDate} endDate={event.attributes.date.endDate} posterLink={!(event.attributes.posterLink.data===null)?`http://localhost:1337${event.attributes.posterLink.data.attributes.url}`:bgImage} />
    ))
}
    </>
  )
}

export default EventList