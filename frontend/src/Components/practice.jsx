import { useState,useEffect,useCallback } from "react";
import axios from 'axios'
import "./../App.css";


const Practice =()=>{

const initial ={
 title:'',
 body:''
}
const [inputValue,setInputValue] = useState(initial);
const [departmentValue,setDepartment] = useState([]);
const [show,setShow]=useState(false);
const [id,setUp] = useState('');
const handleChangeInputValue =(e)=>{
    const {name,value} = e.target;
    setInputValue({
        ...inputValue,
        [name]:value
    })

}
    useEffect(() =>{
        (async () => {
            try {
              const  {data} = await axios.get(`http://localhost:1337/api/getdata`);
               console.log("working",data)
               setDepartment(data);
            } catch (error) {
              console.log(error);
            }
          })();
    },[])

const onSubmit = async(e)=>{
    e.preventDefault();

const result = await axios.post('http://localhost:1337/api/posts',inputValue);

setInputValue(initial)

}
const editButton = async(id)=>{

    const  {data} = await axios.get(`http://localhost:1337/api/posts/${id}`);
 
    setInputValue(data)
    setShow(true);
    setUp(id)
}

const onUpdateSubmit =async(e)=>{
    e.preventDefault();
  
    const  {data} = await axios.put(`http://localhost:1337/api/update/${id}`,inputValue);
    setInputValue(initial)

}

const removeItem = async(id,index) =>{
    console.log("dddddddd",id)
    // const  {data} = await axios.delete(`http://localhost:1337/api/delete/${id}`);
    let copyArray = [...departmentValue]
    let newPeople = copyArray.filter((el) => el._id !== id);
    console.log("newPeople",newPeople)
    setDepartment(newPeople);



}



    return(
        <>
    {console.log("departmentValue",departmentValue)}
         <br/>
    <div  className="ApllicationBody">
    <form >
    <div className="Information">
        Title:
        <input type="text" name="title" value={inputValue.title} onChange={handleChangeInputValue}/>
        <br/>
        Body:
        <input type="text" name="body" value={inputValue.body} onChange={handleChangeInputValue}/>

     <br/>
     {
        !show ?
        <button type="submit" onClick={onSubmit}>
        submit</button>:      <button type="submit" onClick={onUpdateSubmit}>
        updated</button>
     }
     </div>

    </form>
{/* {console.log("departmentValue",departmentValue)} */}

<table className="styled-table">
            <thead>
                <tr>
                <td>Title: </td>
                <td>Body</td>  
                </tr>
            </thead>
            <tbody>
          {departmentValue && departmentValue.length >0 ? departmentValue.map((pe) => {
            console.log("wondoer",pe)
          const { _id,title,body,index } = pe;
          return (
            
           <tr key={_id}>
               <td>{title}</td>
             <td>{body}</td>
          
        
         
             <td><button onClick={()=>editButton(_id)}>edit</button></td>
             <td><button onClick={() => removeItem(_id,index)}>delete</button></td>
           </tr>
          );
        }):'No Data found'}
                </tbody>
        </table>




        </div>





        </>
    )
}

export default Practice