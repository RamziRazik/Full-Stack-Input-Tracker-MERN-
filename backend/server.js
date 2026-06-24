import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // 1. Imported Mongoose to communicate with MongoDB
import 'dotenv/config';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGOOSE CONNECTION SETUP

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((error) => console.error('MongoDB connection error:', error));

// DATABASE SCHEMA & MODEL DEFINITION
const inputSchema = new mongoose.Schema({
    textData: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const InputModel = mongoose.model('Input', inputSchema);

// THE ROUTE HANDLER (Turned into an async function)
app.post('/api/save-input', async (req, res) => {
    // Extract the data sent from React
    const { textData } = req.body;

    console.log("Received from React:", textData);

    if (!textData) {
        return res.status(400).json({ message: "Input cannot be empty" });
    }

    try {
        // Create a new document using our Model and save it to MongoDB
        const newInput = new InputModel({ textData: textData });
        await newInput.save();

        // Send a success response back to the frontend
        res.status(200).json({
            success: true,
            message: `Successfully saved to MongoDB: ${textData}`
        });
    } catch (error) {
        console.error("Failed to save data to MongoDB:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error: Database write failed."
        });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));