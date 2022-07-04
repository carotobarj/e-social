const BotonGenerico = (
  {
    className,
    title,
    onClick
  }) => {
    return (
      <button className={className} onClick={onClick}> {title} </button>
    )
}

export default BotonGenerico
