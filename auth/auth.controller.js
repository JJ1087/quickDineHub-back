const User = require('./auth.model');
const jwt = require('jsonwebtoken');//Se requiere eljsaon web token para las incriptaciones de contraseñas
const bcrypt = require('bcryptjs');
const secret_key = '123';
const mongoose = require("mongoose");


//Funcion para registrar a los usuarios en la BD
exports.createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: `El correo ${email} se encuentra registrado`,
      });
    }
    
    // Crear nuevo usuario
    const user = new User({
      nombre: req.body.nombreCompleto,
      email: req.body.correo,
      contraseña: bcrypt.hashSync(req.body.contrasena),//Encriptacion de contraseña con hash
      telefono: req.body.telefono,
      edad: req.body.edad
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Responder con éxito y el usuario creado
    res.status(201).json({ message: 'Usuario creado correctamente. Se ha enviado un correo de verificación.' });

  } catch (err) {
    // Manejar errores
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//--------------------------------------------------------

// Recuperación de datos del formulario login
exports.loginUser = async (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log('Lo que llego carnal: ', userData);

  try {
    // Buscar que el usuario exista en la BD
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      res.status(409).send({ message: 'Datos G erróneos ingresados' });//Buena practica, nunca especificar que dato es el incorrecto
    } else {
      // Comparación de contraseñas
      const isPasswordValid = await bcrypt.compare(userData.password, user.contraseña);

      if (isPasswordValid) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, secret_key, { expiresIn: expiresIn });

        // Respuesta al frontend, datos que se muestran en consola, contraseña no por seguridad
        const dataUser = {
          nombre: user.nombre,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }

        res.send({ dataUser });


      } else {
        res.status(409).send({ message: 'Datos C erróneos ingresados' });
      }
    }
  } catch (error) {
    console.error('Error al autenticar el usuario TITE:', error);
    res.status(500).send('Error del servidor BROU :(' + error.message);
  }
};





