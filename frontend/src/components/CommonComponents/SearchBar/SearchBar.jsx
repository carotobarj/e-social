import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { cleanData, searchByName } from "../../../redux/actions/actionBooks"

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(searchByName(name))
    dispatch(cleanData())
  }

  return (
    <div className="searchBar">
      <form
        className="formbusqueda"
        role="search"
      >
        <label className="labelB" htmlFor="search">
          Buscar
        </label>
        <input
          className="inputB"
          id="search"
          type="search"
          placeholder="Buscar..."
          onChange={(e) => handleInputChange(e)}
          autoFocus
          required
        />
        <button
          className="buttonB"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          GO!
        </button>
      </form>
    </div>
  )
}
