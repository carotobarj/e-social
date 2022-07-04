import React from "react"
import NavBar from "../NavBar/NavBar"
import sebas from "../../../assets/images/Sebas.jpg"
import caro from "../../../assets/images/Caro.jpg"
import malu from "../../../assets/images/Malu.jpg"
import manu from "../../../assets/images/Manu.jpg"
import ceci from "../../../assets/images/ceci.jpeg"
import yona from "../../../assets/images/yona.jpeg"; 
import  mati from "../../../assets/images/mati.jpeg"
import avatar2 from "../../../assets/images/avatar2.png"
import LinkedIn from "../../../Iconos/LinkedIn"
import GitHubAbout from "../../../Iconos/GitHubAbout"
import Footer from "../Footer/Footer"

export default function About() {
  return (
    <><NavBar />
      <section className="info-about">
        <div className="row-about">
          <div className="card-about">
            <h2 className="h2-about about">About</h2>
            <p className="p-about">Somos un grupo de alumnos de Henry realizando nuestro proyecto final, el cual es una app de e-commerce de libros. El objetivo es que los usuarios pueden comprar, vender, seguir
              usuarios populares, dejar reseñas del producto y hacer comentarios del vendedor después de la compra.
              La idea es agregarle más funcionalidades apuntando a fomentar el crecimiento de la comunidad que interactúa. Como usuario, vamos a poder agregar productos en nuestro
              perfil, editar y borrar para que otros usuarios puedan ver detalle del producto y agregar en carrito y poder comprar. Para poder aprovechar la máxima funcionalidad de la página
              los usuarios necesitan estar logueados para poder comprar y vender. Como guest el usuario podría solo visualizar la lista de productos general, el detalle del producto y sus
              respectivas reseñas dejadas por usuarios que una vez compraron el producto.</p>
          </div>

        </div>
      </section>

    <section className="todopersonas">
        <h2 className="equipo">Nosotros somos...</h2>
        <div className="personitas">
          <span className="persona" >
            <img className="img" src={malu} alt="" />
            <h3>María Lucía Bidal</h3>
            <div className="linkgit">
              <a className="eachLink" target="_blank" href="https://www.linkedin.com/in/marialuciabidal/">
                <LinkedIn />
              </a>
              <a className="eachLink" target="_blank" href="https://github.com/mlbidal">
                <GitHubAbout />
              </a>
            </div>
          </span>
          <span className="persona">
            <img className="img" src={ceci} alt="" />
            <h3>Cecilia Acevedo</h3>
            <div className="linkgit">
            <a className="eachLink" target="_blank" href="https://www.linkedin.com/in/ceecisool/">
                <LinkedIn />
              </a>
              <a className="eachLink" target="_blank" href="https://github.com/CEECISOOL">
                <GitHubAbout />
              </a>
            </div>
          </span>
          <span className="persona">
            <img className="img" src={caro} alt="" />
            <h3>Carolina Tobar Jaramillo</h3>
            <div className="linkgit">
            <a className="eachLink" target="_blank" href="https://www.linkedin.com/in/carolina-tobar-jaramillo-36459347/">
                <LinkedIn />
              </a>
              <a className="eachLink" target="_blank" href="https://github.com/carotobarj">
                <GitHubAbout />
              </a>
            </div>
          </span>
          <span className="persona">
            <img className="img" src={mati} alt="" />
            <h3>Matías Yosia</h3>
            <div className="linkgit">
            <a className="eachLink" target="_blank" href="https://www.linkedin.com/in/matias-yosia-a32266201/">
                <LinkedIn />
              </a>
              <a className="eachLink" target="_blank" href="https://github.com/matiyosia">
                <GitHubAbout />
              </a>
            </div>
          </span>
        </div>

        <div className="personitas2">
          <span className="persona">
            <img className="img" src={manu} alt="" />
            <h3>Manuel Kloster</h3>
            <div className="linkgit">
            <a className="eachLink" target="_blank" href="https://www.linkedin.com/in/manuel-kloster/">
                <LinkedIn />
              </a>
              <a className="eachLink" target="_blank" href="https://github.com/Nekrocow">
                <GitHubAbout />
              </a>
            </div>
          </span >
          <span className="persona">
            <img className="img" src={yona} alt="" />
            <h3>Jonathan Pelinski</h3>
            <div className="linkgit">
            <a className="eachLink" target="_blank" href="https://www.linkedin.com/in/jonathan-pelinski-70817b211/">
                <LinkedIn />
              </a>
              <a className="eachLink" target="_blank" href="https://github.com/YonY18">
                <GitHubAbout />
              </a>
            </div>
          </span>
          <span className="persona">
            <img className="img" src={sebas} alt="" />
            <h3>Sebastián Acuña</h3>
            <div className="linkgit">
            <a className="eachLink" target="_blank"  href="https://www.linkedin.com/in/sebastianacunam/">
                <LinkedIn />
              </a>
              <a  className="eachLink" target="_blank" href="https://github.com/sebastianacunam">
                <GitHubAbout />
              </a>
            </div>
          </span>
        </div>
      </section>
      <Footer/>
    </>
  )
}
