import React from 'react'
import Navbar from '../compnents/Navbar'
import EventList from '../compnents/EventList';
import Footer from '../compnents/Footer'
import Loading from '../compnents/Loading';

function Home() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch("http://localhost:1337/api/events?populate=posterLink,date")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setEvents(data.data);
        }
        setLoading(false);
        console.log(data.data[0].attributes.posterLink.data.attributes.url);
      });
  }, []);
 
  return (
   <>
   {
    loading&&!error?<Loading/>:<>
    <Navbar/>
    <EventList events={events}/>
    <Footer/>
    </>
   }
   </>
    
  )
}

export default Home