import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addContact, deleteContact } from '../store/contact';
import { Contact } from '../store/contact'
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { BiPlusMedical } from 'react-icons/bi';
import { LuEdit } from 'react-icons/lu';



const ContactList: React.FC = () => {

    //calling useDispatch hooks to use  reducer's actions
    const dispatch = useDispatch();

    //Gettting contact list array from rootstate of redux store
    const contacts = useSelector((state: RootState) => state.contacts.contacts);

    //State Declaration
     const [nextId, setNextId] = useState(1);
     const [createMode, setCreateMode]=useState(false);
    const [newContact, setNewContact] = useState<Contact>({
        id: ' ',
        firstName: ' ',
        lastName: ' ',
        status: true
    })

    //Function to get  status value after every radio button choice made
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'status') {
    setNewContact((prevState) => ({
      ...prevState,
      status: value === 'true'? true : false,
    }));
        } else {
            setNewContact((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };


    //Function to handle form submission of adding a contact
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newContact.firstName && newContact.lastName ) {
const stat =newContact?.status === true?true:false
              const contactWithId: Contact = {
        ...newContact,
        id: String(nextId), 
         status: newContact?.status ===true?true:false, 
      };
      setNextId(()=>nextId + 1);
            dispatch(addContact(contactWithId));
            setNewContact({
                id: ' ',
                firstName: ' ',
                lastName: ' ',
                status: true,
            });
        }
        setCreateMode(false)
    }

    //Function for removing  the already listed contacts
    const handleDelete = (id: string) => {
        dispatch(deleteContact(id));
    };

    //Function to format String 
    const formatString=(str: string)=> {
    if (typeof str !== 'string') {
        return str;
    }
    
    const lowercaseStr = str.toLowerCase();
    const formattedStr = lowercaseStr.charAt(0).toUpperCase() + lowercaseStr.slice(1);
    
    return formattedStr;
    }

    return (
        <div className=' flex flex-col gap-y-16 w-[90vw]'>

            {/* Create Mode to toggle add contact section */}
            { createMode && <div className='add-contact-section' >
                <div className="add-contact-section text-xl font-bold text-gray-600 mb-2">
                    Add Contact
                </div>
                <hr />
                <form className='w-100 flex p-6 justify-between items-center gap-x-8'  onSubmit={handleSubmit}>
                    <div className="input-field-container">
                    <label>First Name:
                        <input className=' border-2 h-10 rounded-md ml-2  placeholder:text-gray-400 p-2' placeholder='John' type='text' name='firstName' value={newContact.firstName} onChange={handleChange} required />
                    </label>
                    </div>
                      <div className="input-field-container">
                    <label>Last Name:
                        <input type='text'  className=' border-2 h-10 rounded-md ml-2  placeholder:text-gray-400 p-2' placeholder='Doe' name='lastName' value={newContact.lastName} onChange={handleChange} />
                    </label>
                    </div>
                     <div className="input-field-container flex gap-x-4">
                    <label>Status:</label>
                    <label>Active:
                        <input className='ml-2' type='radio' name='status' value={'true'} checked={newContact?.status=== true} onChange={handleChange} />
                    </label>
                    <label>Inctive:
                        <input type='radio' className='ml-2'  name='status' value={'false'} checked={newContact?.status === false} onChange={handleChange} />
                    </label>
                    </div>
                    <div>
                        <button className='w-36 flex  text-center items-center gap-x-2 p-2 h-10 text-md font-semibold rounded-md bg-blue-700 text-white' type='submit'> <span><BiPlusMedical /></span> Add Contact</button>
                    </div>
                </form>
            </div>}
            <div className="contact-list-section">
                <div className="flex justify-between items-center">
            <div className='text-xl font-bold text-gray-600 mb-2'>ContactList</div>
          {  createMode || contacts?.length !== 0 && <div className="mb-4"> <button className='w-36 flex  text-center items-center gap-x-2 p-2 h-10 text-md font-semibold rounded-md bg-blue-700 text-white' onClick={()=>setCreateMode(true)}> <span><BiPlusMedical /></span> Add Contact</button></div>}
            </div>
            <hr/>

            {/* Contact list to display all stored contacts */}
            { contacts?.length>0 ?(<ul className=' flex  flex-col gap-y-4  w-full h-72 overflow-y-scroll'>
                {
                    contacts.map((contact: Contact, index: number) => {
                        return (<li className="border-b-2  h-24 flex items-center"key={"a" + index}>
                                <div className="contact-list-item-container w-96 h-14 rounded-md shadow-l-md flex justify-between items-center  border-2 p-4  ">
                                    <div className="contact-item-left flex gap-x-4">
                                        <div className="contact-icon w-10 h-10 rounded-full flex bg-blue-500 text-white justify-center text-md items-center">{`${contact?.firstName[0].toUpperCase()} ${contact?.lastName[0].toUpperCase()}`}</div>
                                        <div className="contact-detail text-md ">
                                            <div className="first-name font-semibold text-gray-700">{formatString(contact?.firstName)}</div>
                                            <div className="last-name  text-sm font-regular text-gray-500">{formatString(contact?.lastName)}</div>
                                        </div>
                                    </div>
                                    <div className="contact-item-right w-10 ">
                                        <div className={`actve-indicator flex w-14 justify-center h-4 rounded-lg text-xs  p-1  items-center font-bold  ${contact.status?'bg-green-300 text-green-800':'bg-red-300 text-red-800'}`}>{contact.status?'Active':'InActive'}</div>
                                </div>
                                    <div className="contact-item-right w-16 flex gap-x-2">
                                      <Link to={`/contacts/${contact.id}`} >  <div className='w-6 h-6 flex bg-gray-300 rounded-full place-items-center place-content-center z-1' ><LuEdit size={14} /></div> </Link>
                                       <button className='w-6 h-6 flex bg-gray-300 rounded-full place-items-center place-content-center z-1' onClick={() => handleDelete(contact.id)}><RxCross2 /></button> 
                                         </div>
                                </div>
                        </li>)
                    })
                }
            </ul>):(
                 <div className='flex flex-col justify-center items-center h-96 gap-y-8'>
                <div className="text-2xl font-bold text-gray-400 flex justify-center items-center text-center h-fit">No Contacts. <br/>Click on Create Contact Button to Add Contact</div>
                        <button className='w-40 flex  text-center items-center gap-x-2 p-2 h-10 text-md font-semibold rounded-md bg-blue-700 text-white' onClick={()=>setCreateMode(true)}> <span><BiPlusMedical /></span> Create Contact</button>
                    </div>
            )}
            </div>

        </div>
    )
}

export default ContactList;