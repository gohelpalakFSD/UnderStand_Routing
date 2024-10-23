
import {useEffect, useState} from 'react';




function Student(){
    let [data,setData] = useState({});

    let [list,setList] = useState([]);
    let [pos,setPos] = useState(-1);
    let [city,setCity] = useState(["surat","vadodara","Rajkot","Navasari","Bharuch"])
    let [hob,setHob]= useState([]);
    let [search, setSearch] = useState("");
    let [symbol, setSymbol] = useState('');
    let [errors, setErrors] = useState({});

    let [image,setImage] = useState(null);
    let [currentPage, setCurrenPage] = useState(1);
    let [perPage, setPerPage] = useState(2);
    let [ArrayPages,setArrayPages] = useState([]); 
  
    useEffect(()=>{
          pagination();
       
    },[setList,currentPage])


  
    let changeInput = (e) =>{
      

          let name = e.target.name;
          let value = e.target.value;
          let hoData = [...hob];
          if(name=='hobby'){
             if(e.target.checked){
                hoData.push(value);
             }
             else{
                 let index= hoData.findIndex((v,i)=>v==value);
                 hoData.splice(index,1);
             }
             value = hoData;
             setHob(value);
          }

          if(name=='image'){
            let file = e.target.files[0];
            let reader = new FileReader();

            reader.onload = () =>{
                let image_render =reader.result;
                setImage(image_render)
            }

            if(file){
               reader.readAsDataURL(file)
            }
          }

          console.log(name,value);
          setData({...data,[name]:value});     
    }
  
    let Validate = () =>{
        let newError = {};
        let validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

        if(!data.name){
            newError.name = "name is required";
        }
        else if(!(data.name.length>2)){
            newError.name = "Minimum 3 or more character required";
        }

        if(!data.password){
            newError.password = "password is required"
        }

        if(!data.city){
          newError.city = "City is required";
        }

        if(hob.length ==0){
           newError.hobby = "any one of hobby required";
        }

        return newError;
    }


    let submitData =(e) =>{
        e.preventDefault();
        let stList = JSON.parse(localStorage.getItem("stdlist"));
        let newStlist=stList?stList:[];

        let validationErrors = Validate();

        if(Object.keys(validationErrors).length >0 ){
          setErrors(validationErrors);
        }
        else{

          data = {...data,['image']:image};
          setErrors({});
          if(pos!=-1){
            newStlist.map((v,i)=>{
               if(i==pos){
                newStlist[i] = data;
               }
            })
            localStorage.setItem('stdlist',JSON.stringify([...newStlist]))
          }
          else{
            let updateData = [...newStlist,data];
            setList(updateData);
            localStorage.setItem('stdlist',JSON.stringify(updateData))
          }


         pagination();
 
            
          setPos(-1);
          setData({});
          setHob([]);
          setImage(null);
            }
      }

    let pagination = () =>{
        let stList = JSON.parse(localStorage.getItem("stdlist"));
         let newStlist=stList?stList:[];

         let totalPages = Math.ceil(newStlist.length/perPage)
          let pages = [];
          for(let i=1; i<=totalPages; i++){
            pages.push(i);
          }

          setArrayPages(pages?pages:[])

          
                                        
         let lastIndex = currentPage*perPage;
         let firstIndex = lastIndex - perPage;

         let newArray = newStlist.slice(firstIndex,lastIndex);

         setList(newArray?newArray:[]);
    }
    
    let deleteStd = (pos) =>{
        list.splice(pos,1);
        localStorage.setItem('stdlist',JSON.stringify([...list]));
        setList([...list]);
    }
  
    let updateStd = (pos) =>{
        setPos(pos);
        let record = list.filter((v,i)=>{
            if(i==pos){
              return v;
            }
        })
        console.log(record[0]);
        setData(record[0]);
        setHob(record[0]['hobby'])
  
    }


    let searchingData= (e) =>{
      e.preventDefault();
      console.log(e.target.search.value);
      setSearch(e.target.search.value);
    }

    let sortByAge = (e) =>{
        let sortAge = e.target.value;
        console.log(sortAge);
        let newList = [...list];
        if(sortAge == 'ascending' ){
          newList.sort((a,b)=>a.age-b.age);
        }
        else if(sortAge =='descending'){
          newList.sort((a,b)=>b.age-a.age);
        }
        setList(newList);
    }

    let sortBy = (type) =>{
        let newList = [...list];
        
        if(type=='name')
        {
          if(symbol == '' || symbol =='^'){
            newList.sort((a,b)=>a.name.localeCompare(b.name));
            setSymbol('v');
          }
          else{
            newList.sort((a,b)=>b.name.localeCompare(a.name));
            setSymbol('^');
          }
        }
        else if(type=='gender'){
          if(symbol == '' || symbol =='^'){
            newList.sort((a,b)=>a.gender.localeCompare(b.gender));
            setSymbol('v');
          }
          else{
            newList.sort((a,b)=>b.gender.localeCompare(a.gender));
            setSymbol('^');
          }
        }
        else if(type=='age'){
          if(symbol == '' || symbol =='^'){
            newList.sort((a,b)=>a.age-b.age);
            setSymbol('v');
          }
          else{
            newList.sort((a,b)=>b.age-a.age);
            setSymbol('^');
          }
        }

        setList(newList)
    }
  
  
  
    return (
      <>
         <div >
                <h1 style={{textAlign:"center"}}>Student Form</h1>
                
                <form method='post' onSubmit={(e)=>submitData(e)}>
                  <table border={1} align="center">
                      <tr>
                        <td>enter Name</td>
                        <td>
                          <input type="text" name="name" value={data.name?data.name:""} onChange={(e)=>changeInput(e)}/>
                          {errors.name && <p>{errors.name}</p>}
                        
                        </td>
                      </tr>
  
                      <tr>
                        <td>enter password</td>
                        <td><input type="password" name="password" value={data.password?data.password:""}  onChange={(e)=>changeInput(e)}/>
                        {errors.password && <p>{errors.password}</p>}</td>
                      </tr>

                      <tr>  
                        <td>enter age</td>
                        <td><input type="text" name="age" value={data.age?data.age:""}  onChange={(e)=>changeInput(e)}/></td>
                      </tr>
  
                      <tr>
                        <td>enter Gender</td>
                        <td>
                          <input type="radio" name="gender" value="male" checked={data.gender=='male'?"checked":""} onChange={(e)=>changeInput(e)}/>Male
                          <input type="radio" name="gender" value="female" checked={data.gender=='female'?"checked":""} onChange={(e)=>changeInput(e)}/>Female
                        </td>
                      </tr>
  
                      <tr>
                        <td>City</td>
                        <td>
                          <select name="city" onChange={(e)=>changeInput(e)}>
                              <option value="">--select city--</option>
                              {city.map((v,i)=>{
                                return(
                                  <option value={v} selected={data.city==v?data.city:""}>{v}</option>
                                )
                              })}
                          </select>

                          {errors.city && <p>{errors.city}</p>}
                        </td>
                      </tr>

                      <tr>
                        <td>Select Hobby</td>
                        <td>
                          <input type="checkbox" value="reading" name="hobby" checked={hob.includes('reading')?"checked":""} onChange={(e)=>changeInput(e)}/>Reading
                          <input type="checkbox" value="cycling" name="hobby" checked={hob.includes('cycling')?"checked":""} onChange={(e)=>changeInput(e)}/>Cycling
                          <input type="checkbox" value="adventure" name="hobby" checked={hob.includes('adventure')?"checked":""} onChange={(e)=>changeInput(e)}/>Adventure

                          {errors.hobby && <p>{errors.hobby}</p>}
                        </td>
                      </tr>

                      <tr>
                        <td>Upload Image</td>
                        <td><input type="file"  name="image" onChange={(e)=>changeInput(e)}/>
                        {image && <img src={image}  height="100" />}
                        </td>
                      </tr>
  
                      <tr>
                        <td></td>
                        <td><input type="submit" name="submit" value={pos==-1?"submit":"Edit"}/></td>
                      </tr>
                  </table>
                </form>
  
                <br/><br/><br/>
                <div style={{textAlign:'center'}}>
                  <form method='post' onSubmit={(e)=>searchingData(e)}>
                   <input type="text" name="search"  />
                   <button type="submit" value="search" >Search</button>
                   </form>
                </div>


                <select name="sorting" onChange={(e)=>sortByAge(e)}>
                    <option value=""></option>
                    <option value="ascending">Low to high</option>
                    <option value="descending">High to Low</option>
                </select>


                <table border={1} align='center' key="sd">
                    <tr key='stat'>
                      <td><button onClick={()=>sortBy('name')}>Name {symbol}</button></td>
                      <td>password</td>
                      <td><button onClick={()=>sortBy('age')}>age</button></td>
                      <td><button onClick={()=>sortBy('gender')}>gender {symbol}</button></td>
                      <td>City</td>
                      <td>HObby</td>
                      <td>image</td>
                      <td>Actions</td>
                    </tr>
                    {list
                    .filter((v,i)=>{
                        if(search===''){
                          return v;
                        }
                        else if(v.name.toLocaleLowerCase().match(search.toLocaleLowerCase())){
                          return v;
                        }
                    })
                    .map((v,i)=>{
                        return(
                          <tr key={i}>
                            <td>{v.name}</td>
                            <td>{v.password}</td>
                            <td>{v.age}</td>
                            <td>{v.gender}</td>
                            <td>{v.city}</td>
                            <td>{v.hobby}</td>
                            <td><img src={v.image}  height={100}/></td>
                            <td>
                              <button onClick={()=>deleteStd(i)}>Delete</button>
                          ||
                              <button onClick={()=>updateStd(i)}>Update</button>
                              </td>
                          </tr>
                        )
                    })}

                    <tr>
                      <td>
                           {ArrayPages.map((v,i)=>{
                            return(
                                <button onClick={()=>setCurrenPage(v)}>{v}</button>
                            )
                           })}
                      </td>
                    </tr>

                   
                </table>
         </div>   
      </>
    );
}

export default Student;