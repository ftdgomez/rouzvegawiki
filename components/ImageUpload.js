import { useState } from "react";
import { Text, Grid, Box, Image as Picture } from "@chakra-ui/react";
// import pica from "pica";
const pica = require('pica')()

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}


export const ImageUpload = ({ onChange:handler, withIcon, imgExtension }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isDroping, setIsDroping] = useState(false);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Box
        as="label"
        border="1px solid"
        borderRadius="md"
        borderColor="gray.200"
        color="white"
        alignItems="center"
        justifyContent="center"
        htmlFor="fileuploader"
        display="flex"
        flexDirection="column"
        textAlign="center"
        p="2rem 1rem"
      >
        <Picture
          src="/UploadIcon.svg"
          alt="upload icon"
          display="block"
          mx="auto"
        />
        Dropea aquí la imagen o haz click para seleccionar una
        <input
          id="fileuploader"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            background: "#1994d8",
          }}
          onChange={(e) => {
            setError("");
            // console.log('this first runss')
            if (!e.target.files[0]) {
              return;
            }
            const file = e.target.files[0];
            // const fileSize = (file.size / 1024 / 1024).toFixed(2);
            // if (fileSize > 2) {
            //   setError("El tamaño máximo es de 2mb.");
            //   setFiles([]);
            // }
            if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
              setError("Solo se permiten imagenes en jpg, jpeg, png o gif");
              setFiles([]);
            }
            // console.log(file)
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                // const p = pica()
                let image = new Image()
                image.src = reader.result
                image.onload = async function() {
                    const offscreenCanvas = document.getElementById('outputcanvas')
                    const newSize = calculateAspectRatioFit(this.width, this.height, 500, 500)
                    offscreenCanvas.width = newSize.width
                    offscreenCanvas.height = newSize.height
                    try {
                        const result = await pica.resize(image, 
                            offscreenCanvas, {
                            quality: 1,
                        })
                        const blob = await pica.toBlob(result, 'image/jpeg', 0.9)
                        const finalfile = await blobToBase64(blob)
                        setFiles([finalfile]);
                        handler(finalfile)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            reader.onerror = function () {
                console.log(reader.error)
            }
          }}
          type="file"
        />
      </Box>

      <Grid
        gridTemplateColumns="420px"
        gap="1rem"
      >
        {files.length > 0 &&
          files.map((file, i) => {
            return <Picture key={`j-${i}`} src={file} alt="uploaded" />;
          })}
      </Grid>
      <canvas style={{ display: 'none' }} id='outputcanvas' width={480} height={480}></canvas>
      {error && <Text color="red.500">{error}</Text>}
    </div>
  );
};
