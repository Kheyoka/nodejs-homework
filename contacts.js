const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.promises.readFile(contactsPath, "utf8");
  console.table(JSON.parse(contacts));
}

async function getContactById(contactId) {
  try {
    const response = await fs.promises.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(response);
    const foundContact = contacts.find((item) => item.id === contactId);
    console.log(foundContact);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const response = await fs.promises.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(response);
    const id = Math.max(...contacts.map((item) => item.id)) + 1;
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(newContact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.promises.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(response);
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    await fs.promises.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(contactId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
