import React from 'react'
import { useParams } from "react-router-dom";

export default (Task = () => {
  let { id } = useParams();
  return <h3>User Detail for Id : {id}</h3>;
});
