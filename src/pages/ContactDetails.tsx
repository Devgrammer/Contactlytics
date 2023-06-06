import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {editContact , Contact} from '../store/contact'
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { BiPlusMedical } from 'react-icons/bi';
import { LuEdit} from 'react-icons/lu';
import { BsFillSaveFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';



const ContactDetails: React.FC=()=>{
   
    const {id} = useParams();
    

  
    const contact =  useSelector((state: RootState)=>state?.contacts?.contacts?.find((c: Contact )=> c?.id === id));


    //Defining  states to control edit mode 
    const [editMode, setEditMode]= useState(false);
    const [editedContact, setEditedContact]= useState<Contact | null>(null);

     useEffect(() => {
    contact && setEditedContact(contact);
  }, [contact]);

    //Function for editing contacts
    const handleEdit =()=>{
        setEditMode(true);
        if(contact){
    setEditedContact(contact);
        }
    
    };


    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
const {name, value} = e.target;
const stat =value==='true'?true:false
if(editedContact){
    setEditedContact(prevState=>({
        ...prevState!,
        [name]: stat
    }));
}
    };

     const dispatch = useDispatch();

//Function for  Submitting the Contact Edit form
 const handleSubmit=(e: React.ChangeEvent<HTMLFormElement>)=>{
  
    e.preventDefault();
    if(editedContact){
      const updatedContact: Contact = {
      ...editedContact,
      status: editedContact?.status === true ,
    };
    
        dispatch(editContact(updatedContact));
        setEditMode(false);
    }
 };

 if( !contact){

    return <div className="flex flex-col justify-center items-center w-[90vw] h-screen gap-y-8">
    <div className="text-2xl font-bold text-gray-400 flex justify-center items-center text-center h-fit">Contact Not Found!</div>
       <Link to={`/`} >  <div className='w-40 flex  text-center items-center gap-x-2 p-2 h-10 text-md font-semibold rounded-md bg-blue-700 text-white' ><BiPlusMedical size={14} />Create Contact</div> </Link>
    </div>

 };







    return(

        <div className='w-[90vw]'>
             <div className="add-contact-section text-xl font-bold text-gray-600 mb-2">
                   {     !editMode ?'Contact Details:':'Edit Contact'}
                </div>
                <hr className="mb-2"/>
            {
                !editMode ?(
                      <>
            
          <p className='text-gray-700 border-b-2'><span className='font-semibold text-lg '>First Name: </span>{contact.firstName}</p>
          <p className='text-gray-700 border-b-2'><span className='font-semibold text-lg '>Last Name: </span>{contact.lastName}</p>
          <p className='text-gray-700 border-b-2'><span className='font-semibold text-lg '>Status: </span>{contact.status?"Active":"Inactive"}</p>
        
          <button className='w-36 flex  mt-4 text-center items-center gap-x-2 p-2 h-10 text-md font-semibold rounded-md bg-blue-700 text-white'  onClick={handleEdit}><span><LuEdit/></span> Edit Contact</button>
        </>
                ):(
      <div className='add-contact-section' >
                <form className='w-100 flex p-6 justify-between items-center gap-x-8'  onSubmit={handleSubmit}>
                    <div className="input-field-container">
                    <label>First Name:
                        <input className=' border-2 h-10 rounded-md ml-2  placeholder:text-gray-400 p-2' placeholder='John' type='text' name='firstName' value={editedContact?.firstName || ' '} onChange={handleChange} required />
                    </label>
                    </div>
                      <div className="input-field-container">
                    <label>Last Name:
                        <input type='text'  className=' border-2 h-10 rounded-md ml-2  placeholder:text-gray-400 p-2' placeholder='Doe' name='lastName' value={editedContact?.lastName || ' '} onChange={handleChange} />
                    </label>
                    </div>
                     <div className="input-field-container flex gap-x-4">
                    <label>Status:</label>
                    <label>Active:
                        <input className='ml-2' type='radio' name='status' value={'true'} checked={editedContact?.status === true} onChange={handleChange} />
                    </label>
                    <label>Inctive:
                        <input type='radio' className='ml-2'  name='status' value={'false'} checked={editedContact?.status === false} onChange={handleChange} />
                    </label>
                    </div>
                    <div>
                        <button className='w-36 flex  text-center items-center gap-x-2 p-2 h-10 text-md font-semibold rounded-md bg-blue-700 text-white' type='submit'> <span><BsFillSaveFill/></span>Save Contact</button>
                    </div>

                </form>
            </div>
                )
            }
        </div>
    )
}

export default ContactDetails;