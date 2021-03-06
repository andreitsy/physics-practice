
async function VerifyUserJSON() {
    const tokenString = sessionStorage.getItem('token');
    return fetch('http://localhost:8000/users/me', {
        headers: new Headers({
            'Authorization': 'Bearer '+ tokenString
          }), 
        method: 'get' 
    }).then(function (response) {
        if (!response.ok) {
            return null;
            // throw new Error("HTTP status " + response.status);
          }
        return response.json();
    })
}

export async function isVerifiedUser() {
  var res = VerifyUserJSON()
  res.then(json => {
    if (json !== null && json !== '' && json !== undefined) {
      return true;
    } else {
      return false;
    }
    
  })
}

export default VerifyUserJSON;
