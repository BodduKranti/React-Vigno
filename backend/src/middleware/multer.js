// import multer from "multer"

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "./public"),   // folder must exist
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// })

// export const upload = multer({ storage })


import multer from "multer"
import fs from "fs"

fs.mkdirSync("./public", { recursive: true })  // creates it if missing

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})

export const upload = multer({ storage })