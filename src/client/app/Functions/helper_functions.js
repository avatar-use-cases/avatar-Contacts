import Papa from 'papaparse'

export const turnIdsToUsernames = (allUsers, event, key) =>{
  let thisList = event[key].map((id)=>{
    let this_person = allUsers.find((thisUser)=>{
      return thisUser.userId === id
    })
    return this_person.username;
  })
  return thisList
}

export const turnUsernamesToIds = (allUsers, event, key) => {
    let thisList = event[key].map((username) => {
      let person = allUsers.find((user)=>{
           return user.username === username
      })
      return person.userId;
    })
  return thisList
}

export const findContactsWithUserId = (allContacts, userId) => {
  let contactList =  allContacts.map((contact)=>{
        if (contact.userId === userId) {
            return contact
        }
    })
    return contactList;
}
export const matchContactsWithAddresses = (allContacts, allAddresses) => {
  let newList = allContacts
   newList.map((contact)=>{
        allAddresses.map((address)=>{
            if (address.addressId === contact.address) {
                contact.address = address;
            }
        })
    })
    return newList;
}



export const findUsernameWithId = (allUsers, id)=>{
  let person = allUsers.find((user)=>{
       return user.userId === id
  })
  return person.username
}

export const findIdWithUsername = (allUsers, username)=>{
  let person = allUsers.find((user)=>{
       return user.username === username
  })
  return person.userId
}
