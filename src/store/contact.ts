import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    status: boolean;
};

interface ContactsState {
    contacts: Contact[ ];
}

//Intial State Decalaration  for storing  contacts
const initialState: ContactsState = {
    contacts: [ ],
};


//Contact Slice which containe all reducer action related to add, remove, edit a contact
const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        //For adding a contact in redux layer
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },

        //For editing a contact in redux layer
        editContact: (state, action: PayloadAction<Contact>) => {
            const { id, firstName, lastName, status } = action.payload;
            const contactIndex = state.contacts.findIndex((contact) => contact.id === String(id));
            if (contactIndex === -1) {
                state.contacts[contactIndex] = {
      ...state.contacts[contactIndex],
      firstName,
      lastName,
      status,
    };
        }else{
                state.contacts[contactIndex]=  action.payload;
            }  
        },

        //For deleting a contact in redux layer
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        }
    }
});


export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;