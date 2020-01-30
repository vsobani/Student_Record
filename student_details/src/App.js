import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class AddDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      skills:''
    } 
    this.addItems = this.addItems.bind(this)
    // this.handleChange -this.handleChange.bind(this)
    
  }

  addItems(){
  // let skill = this.state.skills.split(',');
  // let final_state = this.state;
  // final_state['skills'] = skill;
  
  // if(this.state.firstName !=='' && this.state.lastName!==''){
    this.props.studentinfo(this.state);
    this.setState({
      firstName:'',
      lastName:'',
      skills:''
    })

  // }
  }

  render() {
    return (
      <div className="form">
        <div className='form'>
        
       <input type='text' placeholder="firstname" className='' onChange={(event)=>this.setState({firstName:event.target.value})} />
        
       <input type='text' placeholder="lastname" className='' onChange={(event)=>this.setState({lastName:event.target.value})} />
        
      <input type='text' placeholder="skills" className='' onChange={(event)=>this.setState({skills:event.target.value})} />
        <button onClick={this.addItems}>Add</button>
        
        

        
        </div>
      </div>
    );
  }
}



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      students : [
        {
          'firstName': 'Pramod',
          'lastName': 'Ray',
          'skills': ['Python','HTML','CSS']
        },
        {
          'firstName': 'Sachin',
          'lastName': 'Suresh',
          'skills': ['Python', 'HTML', 'CSS', 'CAT']
        },
        {
          'firstName': 'Samarth',
          'lastName': 'Hegde',
          'skills': ['Python', 'Git', 'CSS']
        }
      ],
      searchfirstname:'',
      searchlastname:''
    }

    this.textshow = this.textshow.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.sorteditems= this.sorteditems.bind(this);
    this.sortedlastName= this.sortedlastName.bind(this);
    this.sortedskills= this.sortedskills.bind(this);
    this.searchfirstName= this.searchfirstName.bind(this);
    this.searchlastName = this.searchlastName.bind(this);
  }

  textshow(text)
  {
    axios.post("http://127.0.0.1:8000/students/create/",text)
    // this.setState({
    //   students: [...this.state.students,text]
    // })
  }

  sorteditems(){
    let sortedfirstName= this.state.students.sort(function(a,b){
      let x = a.firstName.toLowerCase();
      let y = b.firstName.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    this.setState(
      {
        students:sortedfirstName
        
        })
      
  }

  sortedlastName(){
    let sortedlastName= this.state.students.sort(function(a,b){
     return a.lastName.localeCompare(b.lastName)})
   this.setState(
     {
       students:sortedlastName
       
       })
     
 }

  sortedskills(){
    let sortedskills = this.state.students.sort(function(a,b){
      if (a.skills.length > b.skills.length) {
        return -1;
      }
      if (a.skills.length < b.skills.length) {
        return 1;
      }
        return 0;
    });
    this.setState({
      students:sortedskills
  });}
  
  searchfirstName(event){
  let inputData = event.target.value
   this.setState({
    searchfirstname:inputData
   })
}
  searchlastName(event){
    let inputData =event.target.value
    this.setState({
      searchlastname : inputData
    })
  }

  // handleChange = event => {
  //   this.setState({ students: event.target.value });
  // }

  // handleSubmit = event => {
  //   event.preventDefault();

   

  componentDidMount(){
    axios.get("http://127.0.0.1:8000/students/").then(res => {this.setState({students:res.data});
  })
  }

  updateData(){
    axios.post("http://127.0.0.1:8000/students/create/")
  }

  deleteData(id){
    axios.delete("http://127.0.0.1:8000/students/"+id.toString()+"/delete/",id).then(()=>{this.textshow()})
  }
  render() {
    return (
      <div className="App">
        <AddDetails studentinfo={this.textshow} />    
        <input className="fname" type="text" placeholder="Search by firstname" onChange={this.searchfirstName}/>
       
           
        <table className="table">
          <thead>
          {/* <input type="text" name="id" onChange={this.handleChange} /> */}
       
          {/* <input type="text" placeholder="Search by firstname" onChange={this.searchlastName}></input> */}
          <tr className="table-row">
            <th onClick={this.sorteditems}>Firstname</th>
            <th onClick={this.sortedlastName}>Lastname</th> 
            <th onClick={this.sortedskills}>Skills</th>
            
          </tr> 
          </thead>
         
          <tbody>
          {this.state.students.filter(name=>{return name.firstName.toLowerCase().includes(this.state.searchfirstname.toLowerCase());})
          .map((item,index)=>(<tr key={index} >
          {/* {this.state.students.filter(name=>{return name.lastName.toLowerCase().includes(this.state.searchlastname.toLowerCase());}).map((item,index)=>(
           <tr key={index} >    */}
          
             
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                <ul>
                  {item.skills.map((item,index)=>
                  
                    <li key={item}>{item}</li>
                  
                  )
                  }
                  </ul>
                  <button type="button" onClick={(event)=>this.deleteData(item.id)}>Delete</button>
                  </td>
              </tr>     
          ))}
       </tbody>
       </table>  
               
      </div>
    );
  }
}


export default App;
