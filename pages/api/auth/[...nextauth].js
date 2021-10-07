import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    Providers.Twitch({
        clientId: process.env.TWITCH_ID,
        clientSecret: process.env.TWITCH_SECRET,
    }),
  ],
  secret: process.env.SECRET,

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
})