async function getConditionJSON(problem_id) {
    return fetch('http://localhost:8000/problems/' + problem_id, {
        method: 'get' 
    }).then(function (response) {
        if (!response.ok) {
            console.log("Not found problem!");
            return null;
            // throw new Error("HTTP status " + response.status);
          }
        return response.json();
    })
}

export default getConditionJSON;
