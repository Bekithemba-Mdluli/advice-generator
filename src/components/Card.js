import React, { useState, useEffect } from 'react'

import m from '../images/pattern-divider-mobile.svg'
import d from '../images/pattern-divider-desktop.svg'
import dice from '../images/icon-dice.svg'

function Card() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [advice, setAdvice] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const handleClick = () => {
        setRefresh(true)
        setRefresh(false)
    }

    const getData = () => {
        fetch("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setAdvice(result.slip);
          //   console.log(result.slip)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          //   console.log(error)
          }
        )
    }

    useEffect(getData, [])

  return (
    <div className='container center'>
        <div className='card'>
            <div className='card__title'>
                <p>Advice #{advice.id}</p>
            </div>
            <div className='card__body'>
                {isLoaded? <p><q>{advice.advice}</q></p>: <p>Loading...</p>}
            </div>
            <div className='card__divider'>
                <div className='hide-for-desktop'>
                    <img src={m} alt='Mobile divider' />
                </div>
                <div className='hide-for-mobile'>
                    <img src={d} alt='Desktop divider' />
                </div>
            </div>
            <div className='card__footer'>
                <button onClick={getData}><img src={dice} alt='Dice' /></button>
            </div>
        </div>  
    </div>
  )
}

export default Card