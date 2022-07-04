import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getCategories } from '../../../redux/actions/actionCategories.js'

export default function FilterCategories() {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    return () => {
    }
  }, [dispatch])

  const handleCategorySelect = (e) => {
    e.preventDefault()
    dispatch(filterByCategory(e.target.value))
  }

  return (
    <div className="ccc">
      <select className="bg-white text-gray-600 py-3 px-6 shadow-md rounded inline mt-0 mr-1 ml-1 font-semibold racking-wider"
       onChange={handleCategorySelect}>
        <option value={''}>Todas las categorías</option>
        {categories?.map((g, i) => {
          return (
            <option value={g} key={i}>{g}</option>
          )
        })}
      </select>
    </div>
  )
}
