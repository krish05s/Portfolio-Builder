import React from 'react'

export default function Alert(props) {
  return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show position-fixed top-5 end-0 m-3`} role="alert" style={{zIndex: 9999}}>
            <strong>{props.alert.msg}</strong>
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>
  )
}
