const fs = require("fs");
const path = require("path");

// const contactsPath = path.resolve("./db/contacts.json");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// function listContacts() {
//   fs.readFile(contactsPath, "utf-8", function (err, content) {
//     if (err) {
//       return console.log(err);
//     } else {
//       const contacts = JSON.parse(content);
//       console.table(contacts);
//     }
//   });
// }

const listContacts = async function () {
  const contacts = await fs.promises.readFile(contactsPath, "utf8");
  console.table("contacts :>> ", JSON.parse(contacts));
};

const getContactById = async function (contactId) {
  try {
    const response = await fs.promises.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(response);
    const foundContact = contacts.find((item) => item.id === contactId);
    console.log("foundContact :>> ", foundContact);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
// function getContactById(contactId) {
//   fs.readFile(contactsPath, "utf-8", function (err, content) {
//     if (err) {
//       return console.log(err);
//     } else {
//       const contacts = JSON.parse(content);

//       const contact = contacts.find((item) => item.id === contactId);
//       console.table(contact);
//     }
//   });
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, "utf-8", function (err, content) {
//     if (err) {
//       return console.log(err);
//     } else {
//       const contacts = JSON.parse(content);
//       const newContacts = contacts.filter((item) => item.id !== contactId);
//       fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
//         if (err) {
//           throw err;
//         }
//         console.table(newContacts);
//       });
//     }
//   });
// }

const addContact = async function (name, email, phone) {
  try {
    const response = await fs.promises.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(response);
    const id = Math.max(...contacts.map((item) => item.id)) + 1;
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("Succesfully saved:", newContact);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const removeContact = async function (contactId) {
  try {
    const response = await fs.promises.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(response);
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    await fs.promises.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log("Succesfully deleted:", contactId);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf-8", function (err, content) {
//     if (err) {
//       return console.log(err);
//     }
//     const contacts = JSON.parse(content);

//     contacts.push({
//       id: contacts.length - 1,
//       name: name,
//       email: email,
//       phone: phone,
//     });
//     console.table(contacts);

//     fs.writeFile(contactsPath, JSON.stringify(contacts), function (
//       err,
//       content
//     ) {
//       if (err) {
//         return console.log(err);
//       }
//     });
//   });
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
