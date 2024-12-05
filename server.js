const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db"); // Import the database connection function
const groceriesRouter = require("./routes/groceries");
const Transport = require("./Routes/Transport")
const Event = require("./Routes/events")
const Accommodation = require('./Routes/Accommodation')
const User = require("./Routes/User")

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the database connection function

// Routes
app.use("/api/events",Event)
app.use("/api/groceries", groceriesRouter);
app.use("/api/transport", Transport);
app.use('/api/accommodation',Accommodation)
app.use('/api/user',User)


// app.get('/dummy', (req, res) =>{
//     res.send("This si the dummy model API");
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
