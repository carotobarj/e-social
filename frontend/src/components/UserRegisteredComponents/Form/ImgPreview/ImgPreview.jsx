import { useState } from "react"
import Loading from '../../../CommonComponents/Loading/Loading'

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null)

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    setPreview(reader.result)
  }

  return (
    <div>
      {preview
        ? <img src={preview} alt="preview" className="previewF" />
        : <Loading />}
    </div>
  )
}

export default PreviewImage
