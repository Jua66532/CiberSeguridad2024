const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express()

// Middleware para analizar los datos del formulario
app.use(express.urlencoded({ extended: true }));
// Middleware de logging
app.use(morgan('dev'));

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://servinjuan665:<password>@clusterciberseg.43zf6hd.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCiberSeg', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a MongoDB Atlas establecida');
})
.catch((err) => {
  console.error('Error al conectar a MongoDB Atlas:', err);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})


// Definir el esquema de datos
const Schema = mongoose.Schema;
const contactSchema = new Schema({
  pwd: String,
  email: String
});

// Crear el modelo Contact basado en el esquema
const Contact = mongoose.model('Contact', contactSchema);

app.listen(3000,()=>{
console.log("escuchando ando")
})

// Manejar la solicitud POST para /contact
app.post('/contact', async function (req, res) {
  const { name, email, message } = req.body;
  // Crear una nueva instancia de Contact con los datos recibidos
  const newContact = new Contact({
    pwd,
    email
    
  });
  try {
    // Guardar el nuevo contacto en la base de datos
    await newContact.save();
    console.log('Nuevo contacto guardado en la base de datos:', newContact);
    res.send('Mensaje enviado correctamente');
  } catch (err) {
    console.error('Error al guardar el contacto en la base de datos:', err);
    res.status(500).send('Error al guardar el contacto en la base de datos');
  }
});