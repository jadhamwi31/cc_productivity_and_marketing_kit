import React from 'react';
import { useParams } from 'react-router-dom';
export default function Videos() {
  let { id } = useParams();
  return <div>{id}</div>;
}
