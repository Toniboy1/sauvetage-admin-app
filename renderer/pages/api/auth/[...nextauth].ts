// pages/api/auth/[...nextauth].ts
import Dexie from "dexie";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
  }
class UserDatabase extends Dexie {
    users: Dexie.Table<IUser, number>;
  
    constructor() {
      super("UserDatabase");
      this.version(1).stores({
        users: 'id, username, password, name, email'
      });
      this.users = this.table("users");
    }
  }
  const db = new UserDatabase();
export default NextAuth({
providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
    authorize: async (credentials): Promise<User | null> => {
            if (!credentials) return null;
            const user = await db.users.where("username").equals(credentials.username).and(user => user.password === credentials.password).first();
            return user ? { ...user, id: user.id.toString() } : null;
    }
    })
],
  // Add any other NextAuth configuration here
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page URL
    error: '/auth/error'      // Error page URL
  }
});
