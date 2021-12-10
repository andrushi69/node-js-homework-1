const path = require("path")
const fs = require("fs/promises")
const crypto = require("crypto")
const chalk = require("chalk");

const readContent = async () => {
  const content = await fs.readFile(path.join(__dirname, "db", "contacts.json"))
  return JSON.parse(content)
}

const listContacts = async () => {
  return await readContent()
}

const getContactById = async (contactId) => {
  const contacts = await readContent()
  const [contact] = contacts.filter(contact => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await readContent()
  const deletedContact = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(path.join(__dirname, "db", "contacts.json"), JSON.stringify(deletedContact, null, 2))
  console.log(chalk.bgBlack("New contacts list:"))
  console.table(deletedContact)
}

const addContact = async (name, email, phone) => {
  const contacts = await readContent()
  const newContacts = {id: crypto.randomUUID(), name, email, phone}
  contacts.push(newContacts)
  await fs.writeFile(path.join(__dirname, "db", "contacts.json"), JSON.stringify(contacts, null, 2))
  return newContacts
}

module.exports = {
  listContacts, getContactById, removeContact, addContact
}