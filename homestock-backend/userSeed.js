import User from "./models/user";
import bcrypt from 'bcrypt'

const userRegister = async () => {
    try {

      const hashPassword = await bcrypt.hash("admin", 10);
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password : hashPassword
      })
      await newUser.save()
    } catch (error) {
      console.log(error);
    }
  }

  userRegister();
  
