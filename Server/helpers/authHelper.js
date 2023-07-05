import bcrypt from 'bcryptjs'

// password hashing during signin
export const hashedPassword =  async(password)=>{
    // const salt = await bcrypt.genSalt(process.env.SALT_ROUND);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}
// password compare for login
export const passwordCompare = async (password,hashedPassword)=>{
    const result = bcrypt.compare(password,hashedPassword)
    return result;
}