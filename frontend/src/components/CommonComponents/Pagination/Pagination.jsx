import React from "react"

export default function Pagination({ pageSize, allBooks, page, pageCurrent}) {

  let pageNumbers = []

  let Paginas = Math.ceil(allBooks / pageSize)
  for (let i = 1; i <= Paginas; i++) {
    pageNumbers.push(i)
  }
  
  return (
        <nav className="nav2">
          <div className="pag">
            {Paginas > 1 ? <>
            {pageCurrent - 1 > 0 ? (
            <button className="num" onClick={() => page(pageCurrent = 1)}> {"<<"} </button> 
            ) : null }

            {pageCurrent >= 3 ? <li><button className="num" onClick={() => page(pageCurrent - 2)}>{pageCurrent - 2}</button></li> : null}

            {pageCurrent >= 2 ? <li><button className="num" onClick={() => page(pageCurrent - 1)}>{pageCurrent - 1}</button></li> : null}

              <li><button className="num1" onClick={() => page(pageCurrent)}>{pageCurrent}</button></li>
            {pageCurrent <= pageNumbers.length - 1 ? <li><button className="num" onClick={() => page(pageCurrent + 1)}>{pageCurrent + 1}</button></li> : null}

            {pageCurrent <= pageNumbers.length - 2 ? <li><button className="num" onClick={() => page(pageCurrent + 2)}>{pageCurrent + 2}</button></li> : null}

            {pageCurrent < Paginas ? (
              <button className="num" onClick={() => page(pageCurrent = Paginas)}> {">>"} </button>  
            ) : null }
            
            </> : null }
          </div>
        </nav>
  )
}

