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
    quote: "",
    date: "",
    clip: "",
  };
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (values.date === "") {
        values.date = new Date().toISOString();
    }
    if (values.quote === "") {
        return alert('El campo de "cita" está vacío...')
    }
    try {
      const contentR = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/quote`, {
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
                Ah, una de las frases celebres de Rouz... Qué alegría
                </Heading>
                <Image alt="" src="/pepoarrive.gif" width='40px' height='40px' />
          </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <FormLabel color="white">Cita</FormLabel>
            <Input
              color="white"
              value={values.quote}
              onChange={(e) => setValues({ ...values, quote: e.target.value })}
              placeholder="Yo aprendo lento, pero bien y rápido..."
            />
            <FormHelperText color="gray.400">
              Escribe la cita textual de lo que ha dicho
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
