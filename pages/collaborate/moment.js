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
import { ImageUpload } from "@components/ImageUpload";
import { Loader } from "@components/Loader";
import { useSession } from "next-auth/client";
import router from "next/router";

export default function Page() {
  const [session] = useSession();
  const initialValues = {
    title: "",
    body: "",
    date: "",
    clip: "",
  };
  const [values, setValues] = useState(initialValues);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const onDrop = (picture) => {
    setImages([...images, picture]);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "image",
      images[0].replace(/^data:image\/[a-z]+;base64,/, "")
    );
    try {
      const imgR = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBBAPIKEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const img = await imgR.json();
      if (!img.success){
        console.log(img);
        throw new Error('Error subiendo la imagen x.x');
      }
      const contentR = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/moment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          date: new Date(values.date).toISOString(),
          picture: img.data.url,
          thumbnail: img.data.thumb.url,
          user: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          },
        }),
      });
      const content = await contentR.json();
      if (content.success) {
        router.push("/success");
        setValues(initialValues);
        setImages([]);
      }
    } catch (error) {
      console.log(error);
      setValues(initialValues);
      setImages([]);
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
                Momentazo?! vamos a inmortalizarlo
                </Heading>
                <Image src="/pepoarrive.gif" width='40px' />
          </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <FormLabel color="white">Titulo</FormLabel>
            <Input
              color="white"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="Un titulo to guapo"
            />
            <FormHelperText color="gray.400">
              Escribe un titulo para tu momentazo
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
            <FormLabel color="white">Descripción del acontecimiento</FormLabel>
            <Textarea
              color="white"
              value={values.body}
              onChange={(e) =>
                setValues({ ...values, body: e.target.value })
              }
              placeholder="Escribe una descripción para tu momentazo"
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
              No es obligatorio, pero si lo tienes, puedes agregar un clip de un
              momentazo
            </FormHelperText>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color="white">
              ¿Tienes foto/imagen/material gráfico?
            </FormLabel>
            {/* <Input
                    color="white"
                    value={values.clip}
                    onChange={(e) => setValues({...values, clip: e.target.value})}
                    placeholder="https://clips.twitch.tv/BreakableScaryPuppyCopyThis-ElJ-YF-SjP-I2xXR"
                /> */}
            <ImageUpload
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            />
            <FormHelperText color="gray.400">
              No es obligatorio, pero si lo tienes, puedes agregar
              foto/imagen/material gráfico de un momentazo
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
