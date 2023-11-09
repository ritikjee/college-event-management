import { getUserFromCookie,getTokenFromCookie } from "../lib/auth";

export const deleteEvent = async (id) => {
    try {
        var jwt = getTokenFromCookie();
        if (getUserFromCookie()) {
            const response = await fetch(`http://localhost:1337/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const data = await response.json();
            window.location.href = '/';
        }
    }
    catch (err) {

        console.log(err);
    }

}

export const addComment=async (id,commentData)=>{
    var data1 = {
        data:{
            comment:commentData,
        }
    };
    try{
        var jwt = getTokenFromCookie();
        if(getUserFromCookie()){
            const response = await fetch(`http://localhost:1337/api/events/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${jwt}`,
                },
                body:JSON.stringify(data1),
            });
            const data = await response.json();
            console.log(data);
            window.location.reload();
        }
    }
    catch(err){
        console.log(err);
    }
}