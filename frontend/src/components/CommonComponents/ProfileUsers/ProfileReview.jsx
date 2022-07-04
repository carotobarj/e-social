import React, { useState } from 'react'

const ProfileReview = ({ title, description, score }) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="containerr">
        <div className="accordion">
          <div className="accordion-item">
            <button className="accordion-button" onClick={() => setIsActive(!isActive)} id="accordion-button-1" >
              {isActive ? "Ver Menos" : "Ver Mas"}
              <span className="icon" ></span>
            </button>
            <div className="condicion">
              {!isActive ? <>{null}</> :
                (<p className="condicionTexto">
                  {title}
                  {description}
                  {
                    score === 1 ? <p>⭐</p> :
                      score === 2 ? <p>⭐⭐</p> :
                        score === 3 ? <p>⭐⭐⭐</p> :
                          score === 4 ? <p>⭐⭐⭐⭐</p> :
                            <p>⭐⭐⭐⭐⭐</p>
                  }
                </p>)
              }
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ProfileReview 
