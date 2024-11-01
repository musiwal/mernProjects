import { readFileSync, writeFileSync } from 'node:fs'
const users = [{ name: 'Adam Ondra', email: 'adam.odra@climd.ing' }]
const usersJson = JSON.stringify(users)
writeFileSync('backend/users.json', usersJson)
const readUsersJson = readFileSync('backend/users.json')
const readUsers = JSON.parse(readUsersJson)
console.log(readUsers)
