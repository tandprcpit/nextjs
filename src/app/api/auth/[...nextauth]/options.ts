import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import TPOModel from "@/model/Tpo";
import TPCModel from "@/model/Tpc";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "student-credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error('No user found with this email')
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account before login')
                    }

                    // console.log("login user: ",user);
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error('Incorrect Password')
                    }

                } catch (err: any) {
                    throw new Error(err)
                }
            }
        }),
        CredentialsProvider({
            id: "tpo-credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    console.log("Gopal Bharat Patil",credentials.identifier);
                    const tpo = await TPOModel.findOne({ email: credentials.identifier });

                    if (!tpo) {
                        throw new Error("No TPO found with this email");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, tpo.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect Password");
                    }

                    return tpo;
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
        CredentialsProvider({
            id: "tpc-credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
    
                    const tpc = await TPCModel.findOne({ email: credentials.identifier });

                    if (!tpc) {
                        throw new Error("No TPO found with this email");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, tpc.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect Password");
                    }

                    return tpc;
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.role = user.role;
                token.username = user.username;
                token.isProfileComplete = user.isProfileComplete;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
                session.user.role = token.role;
                token.isProfileComplete = token.isProfileComplete;
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECREY 
}


