// import NextAuth, { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from "next-auth/providers/facebook";
// import LineProvider from "next-auth/providers/line";
// import { JWT } from 'next-auth/jwt';
// import AzureADProvider from "next-auth/providers/azure-ad";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       // allowDangerousEmailAccountLinking: true,
//       // authorization: {
//       //   params: {
//       //     prompt: "consent",
//       //     access_type: "offline",
//       //     response_type: "code"
//       //   },

//       // }
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID!,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           // access_type: "offline",
//           response_type: "code",
//           scope: "public_profile,email"
//         }
//       }
//     }),
//     LineProvider({
//       clientId: process.env.LINE_CLIENT_ID!,
//       clientSecret: process.env.LINE_CLIENT_SECRET!
//     }),
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: '/',
//     // signOut: '/landing',
//     error: '/',
//   },
  
//   callbacks: {
    
//     // async redirect({ url, baseUrl }) {
//     //   // Check if the URL is an error URL
//     //   console.log("url", url);
//     //   if (url.startsWith(`${baseUrl}/api/auth/signin?error=`)) {
//     //     // Redirect to your custom error page
//     //     return `${baseUrl}/landing`
//     //   }
//     //   return url.startsWith(baseUrl) ? url : baseUrl
//     // },
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//       }
//       return token
//     },
//     async session({ session, token }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken
//       return session
//     }
//   },

// };

// export default NextAuth(authOptions);

// // Extend the built-in session types
// declare module "next-auth" {
//   interface Session {
//     accessToken?: string
//   }
// }

// // Extend the built-in JWT types
// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string
//   }
// }