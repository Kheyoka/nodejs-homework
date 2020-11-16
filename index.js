const argv = require("yargs").argv;

const contactsImport = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsImport.listContacts();
      break;

    case "get":
      contactsImport.getContactById(id);
      break;

    case "add":
      contactsImport.addContact(name, email, phone);
      break;

    case "remove":
      contactsImport.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
