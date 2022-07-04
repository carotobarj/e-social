import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../CommonComponents/NavBar/NavBar'
import { getAllReviews } from '../../../redux/actions/actionAdmin'
import { Link } from 'react-router-dom'
import profile from '../../../assets/images/avatar2.png'
import s from './AllReviews.module.css'

function AllReviews() {
    const dispatch = useDispatch()
    const allReviews = useSelector(state => state.allReviews)
    console.log(allReviews)

    useEffect(() => {
        dispatch(getAllReviews())
    }, [])
    return (

        <>
            <NavBar />

            <div className={s.container}>
            <Link to="/Admin">
                    <button className={s.btnAtras}>Atrás</button>
                  </Link>
                <div className={s.flex}>

                    <table className={s.listado}>

                        <thead>
                            <tr>
                                <th className={s.no}>COMPRADOR</th>
                                <th className={s.no}>IMAGEN</th>
                                <th className={s.no}>VENDEDOR</th>
                                <th className={s.no}>IMAGEN</th>
                                <th className={s.no}>SCORE</th>
                                <th className={s.no}>OPINION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allReviews?.map((u, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className={s.containerInfo}
                                    >
                                        <td className={s.name}>{u.comprador?.nombre}</td>
                                        <td className={s.id}><img className={s.foto} src={u.comprador?.image.url || profile} /></td>
                                        <td className={s.name}>{u.vendedor?.nombre}</td>
                                        <td className={s.id}><img className={s.foto} src={u.vendedor?.image.url || profile}/></td>
                                        <td className={s.price}>
                                        {
                                u.score === 1 ? <p className={s.star}>⭐</p> :
                                u.score === 2 ? <p className={s.star}>⭐⭐</p>:
                                u.score === 3 ? <p className={s.star}>⭐⭐⭐</p>:
                                u.score === 4 ? <p className={s.star}>⭐⭐⭐⭐</p>:
                                        <p className={s.star}>⭐⭐⭐⭐⭐</p>
                                }</td>
                                        <td className={s.blocked}>{u.description}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>
            </div>
        </>
    )
}

export default AllReviews
