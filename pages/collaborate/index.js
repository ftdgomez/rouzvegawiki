import { signIn, signOut, useSession } from "next-auth/client"
import { CollaborateForm } from "@components/CollaborateForm"
import { Login } from "@components/Login"

export default function Page() {
  const [session, loading] = useSession()

  return (
    <>
      {!session && (
        <>
          <Login />
          {/* Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button> */}
        </>
      )}
      {session && (
        <>
          {/* Signed in as {session.user.email} <br /> */}
          <CollaborateForm />
          {/* <button onClick={() => signOut()}>Sign out</button> */}
        </>
      )}
    </>
  )
}