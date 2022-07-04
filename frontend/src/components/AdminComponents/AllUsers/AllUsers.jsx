import React, { useEffect } from 'react'
import { getAllUsers, deleteUser, adminAnUser } from '../../../redux/actions/actionAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { cleanData, getBooks } from '../../../redux/actions/actionBooks'
import { Link } from 'react-router-dom'
import NavBar from '../../CommonComponents/NavBar/NavBar'
import profile from '../../../assets/images/avatar2.png'
import Pagination from '../../CommonComponents/Pagination/Pagination'
import s from './AllUsers.module.css'
import Remove from '../../../Iconos/Remove.jsx'
import Edit from '../../../Iconos/Edit.jsx'
import { isAdmin } from '../../../redux/actions/actionIsAdmin'

import swal from 'sweetalert';


function AllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsuarios);
  const userActu = useSelector((state) => state.usuarioActual);
  const adminState = useSelector((state) => state.isAdmin);


  console.log("soy el usuario actuaaaaal", adminState);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getBooks());
    dispatch(isAdmin());
    return () => {
      dispatch(cleanData());
    };
  }, []);
  


  const handleEdit = (e, id, moderador) => {
    e.preventDefault();
    console.log("id es ", id, moderador);
    
    if(userActu._id === id) {
      swal("No puedes editarte a ti mismo!");
    } else {
      if(moderador !== false){
        swal("No podes quitarle el permiso de administrador a este usuario")
      }else {
        dispatch(adminAnUser({id: id, moderador: true}))
        swal("Ahora el usuario tiene permisos de administrador!");
      }
      } 

  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (userActu._id === id) {
      swal("No puedes eliminarte a ti mismo");
    } else {
      if (
        window.confirm("¿Estás seguro que quieres eliminar este usuario? Si lo eliminas, no podrás deshacer esta acción.") ===
        true
      ) {
        dispatch(deleteUser(id));
        swal("Usuario eliminado correctamente.");

        window.location.reload();
      }
    }
  };
  return (
    <div>
      <NavBar />

      {adminState ? (
        <div>
          <Link to="/Admin">
                    <button className="btnAtras">Atrás</button>
                  </Link>
          <div className={s.container}>
            <table class="listado">
              <thead className="tituloTabla">
                <tr>
                  <th>NOMBRE</th>
                  <th>IMAGEN</th>
                  <th>VERIFICADO</th>
                  <th>BLOQUEADO</th>
                  <th>MODERADOR</th>
                  <th colspan="2">OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                { 
                allUsers?.map((u, i) => {
                  console.log("a ver qué trae", u)
                  return (
                    <tr key={i} className={s.containerInfo}>
                      <td className={s.id}>{u.id}</td>
                      <td className={s.name}>{u.name}</td>
                      <td>
                        <img
                          className="image-e"
                          src={u.image.url || profile}
                          alt="No disponible"
                        />
                      </td>
                      <td className={s.verified}>{u.verified}</td>
                      <td className={s.moderator}>{u.moderador?"SÍ":"NO"}</td>
                      <td className={s.blocked}>{u.blocked}</td>
                      <td className={s.actions}>
                        <button
                          onClick={(e) => handleEdit(e, u.id, u.moderador)}
                          className="btn-edita"
                        >
                          <Edit />
                        </button>

                        <button
                          onClick={(e) => handleDelete(e, u.id)}
                          // className={s.deleteBtn}
                        >
                          <Remove />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      ) : (
        <div>
          
          <h2>Cargando...</h2>
        </div>
      )}
    </div>
  );
}

export default AllUsers
