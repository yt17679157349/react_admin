import React from 'react'
import './linkButton.less'
export default function LinkButton(props) {
    return (
        <>
            <button className='link-button' onClick={props.onClick}>
                <span>{props.children}</span>
            </button>
        </>
    )
}
