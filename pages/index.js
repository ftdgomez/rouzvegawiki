import {
  Grid,
  Image,
  Box,
  Text,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { HomeLayout } from "@layout/HomeLayout";
import Link from "next/link";

function translateWordType(wordType) {
  if (wordType === "noun") {
    return "Sustantivo";
  }
  if (wordType === "verb") {
    return "Verbo";
  }
  if (wordType === "adjective") {
    return "Adjetivo";
  }
  if (wordType === "adverb") {
    return "Adverbio";
  }
  if (wordType === "pronoun") {
    return "Pronombre";
  }
  if (wordType === "preposition") {
    return "Preposición";
  }
  return "palabra";
}

export default function Home({ data }) {
  return (
    <HomeLayout>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "1fr 2fr 1fr",
        }}
        gap={4}
        maxW="7xl"
        mx="auto"
        color="white"
      >
        <Box
          display={{
            base: "none",
            md: "block",
          }}
        >
          <Box
            p="1rem"
            bg="gray.700"
            borderRadius="md"
            shadow="xl"
            alignSelf="start"
          >
            <Heading as="h2" size="md" mb="1rem">
              Diccionario &quot;Larouz&quot;
            </Heading>
            {data.words?.map(({ _id, word, definition, wordType }) => (
              <Flex key={_id} mb="1rem">
                <Box p={2}>
                  <Link passHref href={`/word/${_id}`}>
                    <Flex justifyContent="space-between">
                      <Heading
                        as="h3"
                        size
                        textTransform="capitalize"
                        fontWeight="bold"
                        color="#FF8F57"
                      >
                        {word}
                      </Heading>
                      <Text
                        as="span"
                        color="#FF8F57"
                        fontSize="sm"
                      >
                        {translateWordType(wordType)}
                      </Text>
                    </Flex>
                  </Link>
                  <Text fontSize="xs" color="gray.300" fontStyle="italic">
                    def: {definition}
                  </Text>
                </Box>
              </Flex>
            ))}
            <Link href="/collaborate">
              <a>Colaborar con el diccionario +</a>
            </Link>
            <Link passHref href="/collaborate">
              <Button
                variant="outline"
                color="#FF8F57"
                borderColor="#FF8F57"
                size="sm"
                w="100%"
                mt="1rem"
              >
                Ver Todas Las Palabras
              </Button>
            </Link>
          </Box>
          <Box p="1rem" mt="2rem">
            <Heading as="h2" size="md" mb="1rem">
              About this wiki
            </Heading>
            <Text fontSize="sm" color="gray.300" mb="1rem">
              Este es el sitio no oficial (hasta que se diga lo contrario) sobre
              el lore de Rouz Vega.
            </Text>
            <Text fontSize="sm" color="gray.300" mb="1rem">
              Verás, en el stream de Rouz pasan muchas cosas. Tantas, que era
              necesario catalogarlas y organizarlas en algún sitio. Este es ese
              sitio. La wiki de Rouz Vega, que es Rouz, que es nuestra streamer.
            </Text>
            <Text fontSize="sm" color="gray.300" mb="1rem">
              Estamos un poquito mal de cabeza. Pero es bonito.
            </Text>
          </Box>
        </Box>
        <Box bg="gray.700" borderRadius={{
          base: "none",
          md: "md",
        }} shadow="xl">
          <Flex
            justifyContent="space-between"
            borderBottom="1px solid #FF8F57"
            flexDirection={{
              base: "column-reverse",
              md: "row",
            }}
          >
            <Box 
              px="2rem" 
              pb={{
                base: "1.4rem",
                md: "0"
              }}
            >
              <Image alt="Rouz vega profile picture" mt="1rem" src="/profile.png" />
              <Heading as="h2" size="md" mt="1rem">
                Rouz Vega
              </Heading>
              <Text mt="4px" fontSize="sm" color="gray.300">
                a.k.a Dj Resyna - a.k.a Graciela Vergas
              </Text>
            </Box>
            <Image
            maxW="220px"
            alt=""
             height="100%" width="auto" src="/bannermb.jpg" />
          </Flex>
          <Box p="1rem">
            <Heading as="h2" size="sm" my="1rem">
              Timeline
            </Heading>
              {
                data.posts?.map(post => <Flex 
                    display={{
                      base: "block",
                      md: "flex",
                    }}
                key={post._id} >
                  <Box id='timelineDeco'>
                    <Flex
                    width='120px' height='100%' pr='1rem'>
                      <Text
                        fontSize="sm"
                        color="gray.300"
                        pr="1rem"
                      >
                        {Intl.DateTimeFormat('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).format(new Date(post.date))}
                      </Text>
                      <Flex 
                        justifyContent='center'
                        align='center'
                        height='100%'
                        flexDir='column'
                      >
                        <Image 
                          alt=""
                          height='21px'
                          width='21px'
                          src='/iconTimeline.svg'
                        />
                        <Box height='100%' width='2px' border='1px solid #FF8F57'></Box>
                      </Flex>
                    </Flex>
                  </Box>
                  <Box 
                      width='100%'
                  >
                    <Text
                      color="gray.400"
                      fontSize="sm"
                      mb=".5rem"
                    >
                      Añadido por {post.user.name}
                    </Text>
                  {post.type === 'quote' && (<Box bgImage='/quote.jpg'
                    borderRadius="lg"
                    mb="1rem"
                    shadow="md"
                    bgPos="center"
                    height='300px' bgSize='cover'>
                      <Flex 
                        alignItems="flex-end"
                        borderRadius="lg"
                        height='100%'
                        bgGradient='linear(to-b, rgba(0,0,0,.2), black)'
                        p='2rem'
                      >
                        <Heading as="h3" size="md" color="white">
                        &quot; {post.quote} &quot; <Text fontSize='sm' as='span'>Rouz Vega. {new Date(post.createdAt).getFullYear()}</Text>
                        </Heading>
                      </Flex>
                    </Box>)}
                { post.type === 'moment' && (<Box
                      borderRadius="lg"
                      mb="1rem"
                      shadow="md"
                      key={post._id}
                    >
                      <Heading as="h3" size="md" color="white" mb='1rem'>
                        {post.title}
                      </Heading>
                      <Box
                        bgImage={post.picture}
                        bgRepeat="no-repeat"
                        borderRadius="lg"
                        height='300px'
                        width='100%'
                        display={{
                          base: 'none',
                          md: 'block',
                        }}
                      ></Box>
                      <Image 
                      alt=""
                      display={{
                        base: 'block',
                        md: 'none',
                      }}
                      src={post.picture} />
                    </Box>)}
                  </Box>
            </Flex>)}
          </Box>
        </Box>
        <Box
          display={{
            base: "none",
            md: "block",
          }}
        >
          <Box
            p="1rem"
            bg="gray.700"
            borderRadius="md"
            shadow="xl"
            alignSelf="start"
          >
            <Heading as="h2" size="md" mb="1rem">
              Personajes
            </Heading>
            <Grid templateColumns="1fr 1fr" mb="1rem">
              {data.characters?.map(({ _id, image, name }) => (
                <Link passHref key={_id} mb="1rem" href={`/word/${_id}`}>
                  <Flex
                    bgImage={image}
                    bgSize="cover"
                    bgPos="center"
                    align="end"
                    height="130px"
                    width="130px"
                    borderRadius="md"
                    p={2}
                  >
                    <Heading
                      as="h3"
                      size
                      bg="#FF8F57"
                      borderRadius="md"
                      px={3}
                      py={".2rem"}
                      textTransform="capitalize"
                      fontWeight="bold"
                      color="white"
                      fontSize="xs"
                    >
                      {name}
                    </Heading>
                  </Flex>
                </Link>
              ))}
            </Grid>

            <Link href="/collaborate">
              <a>Colaborar con los personajes +</a>
            </Link>
            <Link passHref href="/collaborate">
              <Button
                variant="outline"
                color="#FF8F57"
                borderColor="#FF8F57"
                size="sm"
                w="100%"
                mt="1rem"
              >
                Ver Todos Los Personajes
              </Button>
            </Link>
          </Box>

          <Box
            p="1rem"
            bg="gray.700"
            borderRadius="md"
            mt="2rem"
            shadow="xl"
            alignSelf="start"
          >
            <Heading as="h2" size="md" mb="1rem">
              Quieres aportar algo a esta web?
            </Heading>
            <Text>Eventualmente aquí habrá algo más</Text>
            <Link passHref href="/collaborate">
              <Button
                variant="outline"
                color="#FF8F57"
                borderColor="#FF8F57"
                size="sm"
                w="100%"
                mt="1rem"
              >
                Aportar algo a la wiki
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </HomeLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "/populate");
  const dataJson = await res.json();
  const data = dataJson.data;
  if (dataJson.success) {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
