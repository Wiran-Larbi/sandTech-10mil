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
          const flattenArray = (arr) => {
            return arr.reduce((acc, item) => {
              if (Array.isArray(item)) {
                return acc.concat(flattenArray(item));
              } else {
                return acc.concat(item);
              }
            }, []);
          }
   
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const chunks = [];
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
                setLoading(false);
                console.log('Stream complete');
                const flatten = Array.prototype.flat.call(chunks);
                console.log(typeof flatten);
                console.log(flatten);
              break;
            }
            const decodedChunk = decoder.decode(value, { stream: true });
            const array = flattenArray(decodedChunk.split('\n'));
            // console.log("what : " + typeof array);
            // chunks.push(array);  
            console.log(array);          
          }
          // setData(chunks.split('\n'));
           
        } catch (error) {
          setLoading(false);
          setData([]);
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
      
        // (console.log(data))
        <List data={data} />
      }
    </div>
      
    </>
  )
}

export default App
