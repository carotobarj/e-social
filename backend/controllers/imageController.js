import { uploadImage } from "../libs/cloudinary.js"
import fs from "fs-extra"

const postBookImage = async (req, res) => {
  const formatos = ["png", "jpg", "jpeg", "webp", "gif"]
  if (
    !formatos.includes(
      req.files.image.name.split(".")[
      req.files.image.name.split(".").length - 1
      ]
    )
  ) {
    return res.status(400).send({ msgError: "Solo se aceptan los sgtes. formatos: jpg, jpeg, png, webp or gif" })
  }

  try {
    if (req.files.image) {
      const response = await uploadImage(req.files.image.tempFilePath) // comentar y descomentar lo sgte p/no subir al pepe ---v
      // const response = {
      //   secure_url: 'dummy_secure_url',
      //   public_id: 'dummy_public_id'
      // }
      // // ----------------------------
      await fs.remove(req.files.image.tempFilePath)

      const image = {
        url: response.secure_url,
        public_id: response.public_id,
      }

      res.json(image.url)
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  postBookImage
}
