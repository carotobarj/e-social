import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import ban01 from "../../../assets/images/ban1.webp"
import ban02 from "../../../assets/images/ban2.webp"
import ban03 from "../../../assets/images/ban3.webp"
import ban04 from "../../../assets/images/ban4.webp"
import ban05 from "../../../assets/images/ban5.webp"
import ban06 from "../../../assets/images/ban6.webp"
import ban07 from "../../../assets/images/ban7.webp"
import ban08 from "../../../assets/images/ban8.webp"
import ban09 from "../../../assets/images/ban9.webp"
import ban10 from "../../../assets/images/ban10.webp"
import ban11 from "../../../assets/images/ban11.webp"
import ban12 from "../../../assets/images/ban12.webp"
import ban13 from "../../../assets/images/ban13.webp"
import ban14 from "../../../assets/images/ban14.webp"

const Carousell = () => {
  const images = [ban01, ban02, ban03, ban04, ban05, ban06, ban07, ban08, ban09, ban10, ban11, ban12, ban13, ban14, ban01]

  return (
    <div class="slider">

      <div class="slide-track">
        {images?.map((e, i) => {
          return (
            <div class="slide" key={i}>
              <img src={e} key={i}/>
            </div>
          )
        })}
      </div>

    </div>)
}

export default Carousell
