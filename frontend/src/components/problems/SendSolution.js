async function SendSolution(solution) {
    const tokenString = sessionStorage.getItem('token');
    return fetch('http://localhost:8000/user_solutions/add_solution', {
        headers: new Headers({
            'Authorization': 'Bearer '+ tokenString,
            'Content-type': 'application/json; charset=UTF-8'
          }),
        method: 'put',
        body: JSON.stringify(solution) 
    }).then(function (response) {
        if (!response.ok) {
            alert("Empty answer or " + response.statusText + " please put something in answer");
            return null;
            // throw new Error("HTTP status " + response.status);
          }
        return response.json();
    })
}

export default SendSolution;
