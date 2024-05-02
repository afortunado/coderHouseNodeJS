import bcrypt from 'bcrypt'

export const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

export const correctPassword = async (userPass, dbPass) => {
    return await bcrypt.compare(dbPass, userPass)
}
