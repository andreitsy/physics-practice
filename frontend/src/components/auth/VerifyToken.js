
async function GetResponseJSON() {
    const tokenString = sessionStorage.getItem('token');
    return fetch('http://localhost:8000/users/me', {
        headers: new Headers({
            'Authorization': 'Bearer '+ tokenString
          }), 
        method: 'get' 
    }).then(function (response) {
        if (!response.ok) {
            console.log("Not authorizated!");
            return null;
            // throw new Error("HTTP status " + response.status);
          }
        return response.json();
    })
}

export default GetResponseJSON;
