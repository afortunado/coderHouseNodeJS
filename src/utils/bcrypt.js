import bcrypt from 'bcrypt'

const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

const correctPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password)
}
export default { createHash, correctPassword }