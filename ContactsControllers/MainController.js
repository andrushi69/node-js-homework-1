const path = require("path")
const fs = require("fs/promises")

const readContent = async () => {
  const content = await fs.readFile(path.join(__dirname, "../db", "contacts.json"))
  return JSON.parse(content)
}

module.exports = {
  readContent
}