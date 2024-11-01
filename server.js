const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://lenu0215:ahlam08@cluster0.1asuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));
const bcrypt = require('bcryptjs');
   const User = require('./modals/user');

   app.post('/register', async (req, res) => {
     const { username, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({ username, password: hashedPassword });
     await user.save();
     res.json({ message: 'User registered successfully' });
   });
   const jwt = require('jsonwebtoken');

   app.post('/login', async (req, res) => {
     const { username, password } = req.body;
     const user = await User.findOne({ username });
     if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }
     const token = jwt.sign({ id: user._id }, 'secretkey');
     res.json({ token });
   });

app.listen(5000, () => console.log('Server running on port 5000'));
