import { useDispatch } from 'react-redux'
import { NAME_ASC, NAME_DESC, NEW_FIRST, PRICE_ASC, PRICE_DESC } from '../../../redux/utils/constants'
import { sortBy } from '../../../redux/actions/actionSorter'

export default function Sort() {
  const dispatch = useDispatch()

  function onSelectChange(e) {
    e.preventDefault()
    dispatch(sortBy(e.target.value))
  }
  return (
    <div className='ccc'>
      <select name='select' onChange={onSelectChange} className="bg-white text-gray-600 py-3 px-6 shadow-md rounded inline mt-0 mr-1 ml-1 font-semibold racking-wider">
        <option value=''>Ordenamiento</option>
        <option value={NEW_FIRST}>Nuevos primero</option>
        <option value={NAME_ASC}>A-Z</option>
        <option value={NAME_DESC}>Z-A</option>
        <option value={PRICE_ASC}>$ ASC</option>
        <option value={PRICE_DESC}>$ DES</option>
      </select>
    </div>
  )
}
