import React from 'react'

const Alert = (props) => {
    return (
        <>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Holy guacamole! {props.error}</strong>
            </div>
            
        </>
    )
}

export default Alert