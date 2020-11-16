const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
