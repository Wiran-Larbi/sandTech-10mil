import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import List from '../components/List'
import { RotatingLines } from 'react-loader-spinner';

function App() {
  const [clickedElement, setClickedElement] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:3001/stream');
          if (!response.ok || !response.body) {
            throw response.statusText;
          }
   
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          // console.log(decoder);
          // const usernames = [];
   
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
                setLoading(false);
              break;
            }
   
            const decodedChunk = decoder.decode(value, { stream: true });
            
            // const usernames = decodedChunk
            //                     .split(/\||\n/)
            //                     .filter((item) => item !== '' && item !== '\n')
            //                     .map(element => JSON.parse(element));
            
            setData(prevData => [...prevData, decodedChunk]);
            console.log(decodedChunk);            
          }
           
        } catch (error) {
          // Handle other errors
          setLoading(false);
        }
      };
   
      fetchData();
}, []);


  const handleClickElement = (data) => {
    setClickedElement(data);
  }  

  return (
    <>
    <div className="absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      {loading && <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true}  />}
    </div>
    <div className="bg-slate-100 w-full h-screen">
      <SideBar onClickElement={handleClickElement} />
      {
        data
        &&
        <List data={data} />
       
      }
    </div>
      
    </>
  )
}

export default App
