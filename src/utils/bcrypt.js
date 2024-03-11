import bcrypt from 'bcrypt'

export const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

export const correctPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password)
}
