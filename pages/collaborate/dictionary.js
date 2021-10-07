import {
  Heading,
  FormControl,
  Select,
  Flex,
  Image,
  FormLabel,
  Textarea,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { Protected } from "@layout/Protected";
import { MainLayout } from "@layout/MainLayout";
import { useState } from "react";
import { Button } from "@components/Button";
import { Loader } from "@components/Loader";
import { useSession } from "next-auth/client";
import router from "next/router";

export default function Page() {
  const [session] = useSession();
  const initialValues = {
    date: "",
    clip: "",
    word: "",
    definition: "",
    wordType: "",
    example: "",

  };
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (values.date === "") {
        values.date = new Date().toISOString();
    }
    try {
      const contentR = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/dictionary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          date: new Date(values.date).toISOString(),
          user: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          },
        }),
      });
      const content = await contentR.json();
      if (content.success) {
        setValues(initialValues);
        router.push("/success");
      }
    } catch (error) {
      console.log(error);
      setValues(initialValues);
      alert("Oh no... Algo salió mal :(");
      setLoading(false);
    }
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <Protected>
      <MainLayout>
          <Flex>
                <Heading as="h1" size="xl" color="white">
                    Lo volvió a hacer, verdad?
                </Heading>
                <Image alt="" src="/pepoarrive.gif" width='40px' height='40px' />
          </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <FormLabel color="white">Palabra</FormLabel>
            <Input
              color="white"
              value={values.word}
              onChange={(e) => setValues({ ...values, word: e.target.value })}
              placeholder="Suscribito"
            />
            <FormHelperText color="gray.400">
                Escribe la palabra que se ha inventado
            </FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="white">Definición</FormLabel>
            <Input
              color="white"
              value={values.definition}
              onChange={(e) => setValues({ ...values, definition: e.target.value })}
              placeholder="Nadie lo sabe, pero lo dijo"
            />
            <FormHelperText color="gray.400">
                Escribe qué significa la palabra que se ha inventado
            </FormHelperText>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color="white">Tipo de palabra</FormLabel>
            <Select
              color="white"
              value={values.wordType}
              onChange={(e) => setValues({ ...values, wordType: e.target.value })}
            >
              <option style={{color: 'black'}} value="">Selecciona una opción</option>
              <option style={{color: 'black'}} value="noun">Sustantivo</option>
              <option style={{color: 'black'}} value="verb">Verbo</option>
              <option style={{color: 'black'}} value="adjective">Adjetivo</option>
              <option style={{color: 'black'}} value="adverb">Adverbio</option>
              <option style={{color: 'black'}} value="pronoun">Pronombre</option>
              <option style={{color: 'black'}} value="preposition">Preposición</option>
              <option style={{color: 'black'}} value="conjunction">Conjuncion</option>
              <option style={{color: 'black'}} value="interjection">Interjección</option>
              <option style={{color: 'black'}} value="article">Artículo</option>
              <option style={{color: 'black'}} value="numeral">Numeral</option>
              <option  style={{color: 'black'}} value="other">Yo que sé, una palabra, Gómez, madre mía chaval, basta...</option>
            </Select>
            <FormHelperText color="gray.400">
              Define si la palabra es un verbo, sustantivo, etc etc etc.
            </FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="white">Ejemplo en una oración</FormLabel>
            <Input
              color="white"
              value={values.example}
              onChange={(e) => setValues({ ...values, example: e.target.value })}
              placeholder="Suscribito al canal no sé qué triki ti"
            />
            <FormHelperText color="gray.400">
                Escribe una oración usando la palabra
            </FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor='date' color="white">Fecha en la que ocurrió</FormLabel>
            <Input
              id='date'
              type="date"
              color="white"
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.target.value })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color="white">¿Tienes un clip?</FormLabel>
            <Input
              color="white"
              value={values.clip}
              onChange={(e) => setValues({ ...values, clip: e.target.value })}
              placeholder="https://clips.twitch.tv/BreakableScaryPuppyCopyThis-ElJ-YF-SjP-I2xXR"
            />
            <FormHelperText color="gray.400">
              No es obligatorio, pero si lo tienes, puedes agregar un clip como prueba
            </FormHelperText>
          </FormControl>

          <Button size="md" w="full" mt="4" disabled={false} type="submit">
            Enviar
          </Button>
        </form>
      </MainLayout>
    </Protected>
  );
}
