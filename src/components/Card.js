import { useAtom } from 'jotai'
import React from 'react'
import {dataAtom} from '../store/store';

const Card = ({title, company, address, salary, skills}) => {

    const [data, setData] = useAtom(dataAtom)
  return (
    <div>
        <h1>{title}</h1>
        <p>{company}</p>
        <p>{address}</p>
        <p>{salary}</p>
        <p>{skills}</p>
    </div>
  )
}

export default Card