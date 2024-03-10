import React, {useEffect,useState} from 'react';
import ListElement from './ListElement';


function List({data}) {
    const [usernames, setUsernames] = useState([]);
    
    useEffect(() => {
        
        setUsernames(prev => [...prev,...data]);


    }, [data]);

    

    return (
        <div className="bg-white w-[98%] m-auto">
            
            <div>
                
                {
                    usernames 
                    && 
                    (
                        console.log(usernames)
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