import React from 'react';
import Letter from './Letter';

const Test = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col text-center'>
                    HOLA
                </div>
            </div>
            <div className='row'>
                <div className='col'></div>
                <div className='col text-center'>
                    <div className="row mx-auto" style={{width: '300px'}}>
                        <div className={`col m-1 border border rounded-circle d-flex justify-content-center align-items-center`} style={{ width: "50px", height: "50px" }}>
                            A
                        </div>
                        <div className={`col m-1 border border rounded-circle d-flex justify-content-center align-items-center`} style={{ width: "50px", height: "50px" }}>
                            B
                        </div>
                        <div className={`col m-1 border border rounded-circle d-flex justify-content-center align-items-center`} style={{ width: "50px", height: "50px" }}>
                            C
                        </div>
                        <div className={`col m-1 border border rounded-circle d-flex justify-content-center align-items-center`} style={{ width: "50px", height: "50px" }}>
                            D
                        </div>
                        <div className={`col m-1 border border rounded-circle d-flex justify-content-center align-items-center`} style={{ width: "50px", height: "50px" }}>
                            E
                        </div>
                    </div>
                </div>
                <div className='col'></div>
            </div>
        </div>
    );
};

export default Test;