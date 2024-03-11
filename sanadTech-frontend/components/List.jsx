import React, {useEffect,useState} from 'react';
import ListElement from './ListElement';


function List({data}) {
    
    // useEffect(() => {
        
    //     setUsernames(prev => [...prev,...data]);


    // }, [data]);

    

    return (
        <div className="bg-white w-[98%] m-auto">
            
            <div>
                
                {
                    data 
                    && 
                    (
                        console.log(typeof data)
                        // data.map((item, index) => {
                        //     // return <ListElement key={index} data={item} />
                        //     return <span key={index}>${item.username}</span>
                        // })
                    )
                   
                }
                
            </div>
        </div>
    );
};

export default List;