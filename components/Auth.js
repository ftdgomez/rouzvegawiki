import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Button } from "./styled";

export default function Auth() {
  async function signInWithTwitch() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "twitch",
    });
    console.log(user,session,error);
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Iniciar Sesión</h1>
        <p className="description">
          Inicia sesión con twitch para poder atribuir tu colaboración
        </p>
        <div>
          <Button onClick={signInWithTwitch}>Iniciar Sesión Con Twitch</Button>
        </div>
      </div>
    </div>
  );
}
