

interface AlertProps {
  type:string;
  icon:string;
  msg:string;
}

export const Alert = ({ type, icon, msg }:AlertProps) => {
  return (
    <div style={
      {
        position:'relative', 
        top:'calc(80px + 30px)', 
        width:'calc(100% - 140px)', 
        margin: '0 auto'
      }
    } className={ `alert alert-${ type } d-flex align-items-center justify-content-center gap-2` } role="alert">
      <i className={`bx bxs-${ icon } fs-4`}></i>
      <div>
        <span style={{fontWeight:'600'}} >{ msg }</span>
      </div>
    </div>
  )
}
