import React from 'react';



function Submit(props)
{
    props.data.map(data=>{
        console.log(data.original);
    });
    return(
        <div className='row'>
            <button className='btn btn-success'>submit</button>
        </div>
    );
}

export default Submit;
