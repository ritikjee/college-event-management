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