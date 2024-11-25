const https = require("https");
const fs = require("fs");
const path = require("path");

// Lista de códigos de países (ISO 3166-1 alpha-2)
const countryCodes = [
  "ad", "ae", "af", "ag", "ai", "al", "am", "ao", "ar", "as", "at", "au", "aw",
  "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn",
  "bo", "br", "bs", "bt", "bw", "by", "bz", "ca", "cd", "cf", "cg", "ch", "ci",
  "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cy", "cz", "de", "dj", "dk",
  "dm", "do", "dz", "ec", "ee", "eg", "er", "es", "et", "fi", "fj", "fm", "fr",
  "ga", "gb", "gd", "ge", "gh", "gm", "gn", "gq", "gr", "gt", "gw", "gy", "hk",
  "hn", "hr", "ht", "hu", "id", "ie", "il", "in", "iq", "ir", "is", "it", "jm",
  "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "kz", "la",
  "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md",
  "me", "mg", "mh", "mk", "ml", "mm", "mn", "mr", "mt", "mu", "mv", "mw", "mx",
  "my", "mz", "na", "ne", "ng", "ni", "nl", "no", "np", "nr", "nz", "om", "pa",
  "pe", "pg", "ph", "pk", "pl", "pt", "pw", "py", "qa", "ro", "rs", "ru", "rw",
  "sa", "sb", "sc", "sd", "se", "sg", "si", "sk", "sl", "sm", "sn", "so", "sr",
  "ss", "st", "sv", "sy", "sz", "td", "tg", "th", "tj", "tl", "tm", "tn", "to",
  "tr", "tt", "tv", "tz", "ua", "ug", "us", "uy", "uz", "va", "vc", "ve", "vn",
  "vu", "ws", "ye", "za", "zm", "zw"
];

// Base URL de las banderas en Cloudflare
const baseUrl = "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3";

// Directorio donde se guardarán las imágenes
const outputDir = path.resolve(__dirname, "flags");

// Crear el directorio si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Función para descargar una bandera
const downloadFlag = (code) => {
  const url = `${baseUrl}/${code}.svg`;
  const outputPath = path.join(outputDir, `${code}.svg`);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Descargado: ${code}.svg`);
          resolve();
        });
      } else {
        console.error(`Error al descargar ${code}.svg: ${response.statusCode}`);
        file.close();
        fs.unlinkSync(outputPath); // Eliminar archivo incompleto
        reject(new Error(`Error ${response.statusCode}`));
      }
    }).on("error", (err) => {
      console.error(`Error de red al descargar ${code}.svg:`, err.message);
      reject(err);
    });
  });
};

// Descargar todas las banderas
const downloadAllFlags = async () => {
  console.log("Descargando banderas...");
  for (const code of countryCodes) {
    try {
      await downloadFlag(code);
    } catch (error) {
      console.error(`Falló la descarga de ${code}.svg:`, error.message);
    }
  }
  console.log("Descarga completada.");
};

// Ejecutar el script
downloadAllFlags();
