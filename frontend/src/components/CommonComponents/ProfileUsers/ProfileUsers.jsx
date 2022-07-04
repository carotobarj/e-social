import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { usuarioCreated, usuarioProfile } from '../../../redux/actions/actionCreatedUser'
import { getReview } from '../../../redux/actions/actionOrder'
import NavBar from '../NavBar/NavBar'
import PaginadoUser from './PaginadoUser'
import ProfileBook from './ProfileBooks'
import ProfileReview from './ProfileReview'

const ProfileUsers = () => {
  const { id } = useParams()
  const [dispatch, navigate] = [useDispatch(), useNavigate()]
  const user = useSelector(state => state.usuarioProfile)
  const book = useSelector(state => state.booksCreated)
  const review = useSelector(state => state.allReviews)
  const token = localStorage.getItem("token")

  if (!token) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(usuarioCreated(id))
    dispatch(usuarioProfile(id))
    dispatch(getReview(id))
  }, [dispatch])

  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize,] = useState(1);
  const indexOfLastBook = pageCurrent * pageSize;
  const indexOfFirstBook = indexOfLastBook - pageSize;
  const curr = book.slice(indexOfFirstBook, indexOfLastBook);

  const page = (pageNumber) => {
    setPageCurrent(pageNumber)
  }

  const goToNextPage = () => {
    if (pageCurrent < book.length) {
      setPageCurrent(pageCurrent + 1);
    }

  }

  const goToPreviousPage = () => {
    if (pageCurrent > 1) setPageCurrent(pageCurrent - 1)
  }
  return (
    <>
      <NavBar />
      <div className="portfoliocard">
        <div className="coverphoto"></div>
        <div className="profile_picture"><img className="imageRR" src={user.image?.url} alt="" /></div>
        <div className="contenedorcol">
          <div className="left_col">
            <div className="followers">
              {curr?.map(e => {
                return (
                  <ProfileBook
                    id={e._id}
                    order={e.order}
                    nombre={e.nombre}
                    autor={e.autor}
                    image={e.image}
                  />
                )
              })}

              <PaginadoUser
                pageSize={pageSize}
                allBooks={book.length}
                page={page}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
              />
            </div>

          </div>
          <div className="right_col">
            <h2 className="name">{user.nombre}</h2>
            <h3 className="location ">{user.email}</h3>

            <h3 className='location '>Ver Reviews</h3>
            <div>
              {
                review?.map((i, u) => {
                  return (
                    <ProfileReview
                      key={u}
                      description={i.description}
                      score={i.score}
                      title={i.title}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div >
        <div>

        </div>

      </div>
    </>
  )
}


export default ProfileUsers