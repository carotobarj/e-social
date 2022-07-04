const DetailsField = (
  {
    constant,
    clase,
    title
  }) => {
  return (
    <div>
      {
        constant ?
          (<>
            <h5 className={clase}>{title}</h5> {constant}
          </>)
          : null
      }
    </div>)
}

export default DetailsField
