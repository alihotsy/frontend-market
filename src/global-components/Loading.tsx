

interface LoadingProps {
  height?:string | number | undefined;
}


export const Loading = ({ height }:LoadingProps) => {
  return (
    <div style={{ height: height ? 'auto' : '100vh', width:'100%' }} className="d-flex justify-content-center align-items-center">
         <span 
            style={{width:'90px',height:'90px',color:'#FF5733', fontSize:'32px'}} 
            className="spinner-border" 
            role="status" 
            aria-hidden="true"
        >
        </span>
    </div>
  )
}
