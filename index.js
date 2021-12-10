const {Command} = require('commander');
const chalk = require("chalk")
const {listContacts, getContactById, removeContact, addContact} = require("./contacts")


const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.log(chalk.bgBlack("Here is the list of contacts"))
      console.table(contacts)
      break;

    case 'get':
      const contactById = await getContactById(id)
      if (contactById) {
        console.log(chalk.bgBlack("You find contact by id"))
        console.table(contactById)
      } else {
        console.warn(chalk.red("No found contact"));
      }
      break;

    case 'add':
      const contact = await addContact(name, email, phone, id)
      console.log(chalk.bgBlack("Add new contact!"))
      console.table(contact)
      break;

    case 'remove':
      const deleteContact = await removeContact(id)
      console.log(chalk.bgBlack("Remove successful"))
      break;

    default:
      console.warn(chalk.red("Unknown action type"));
  }
}

invokeAction(argv).then(() => console.log(chalk.green("Success operation"))).catch(() => console.log(chalk.red("Error")))