import express from 'express';
import { getAllUserDocs } from '../controller/notecontrol.js';
import { Note } from '../models/note.js';

const route = express.Router();

// Get all user documents
route.get('/all', async (req, res) => {
    try {
        const note = await getAllUserDocs(req);
        if (!note || note.length <= 0) {
            return res.status(404).json({ message: "Content not available" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new user document
route.post('/add', async (req, res) => {
    try {
        const { title, document, date } = req.body; // Destructure title and doc from req.body

        const newdoc = new Note({ title, document,date, user: req.user._id }); // Simplify document creation

        await newdoc.save();

        res.status(201).json({ message: "Document added successfully", doc: newdoc }); // Return the added document in the response
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" }); // Improved error message
    }
});

route.get('/edit/:id', async (req, res) => {
    try {
        const editdata = await Note.findById(req.params.id);
        if (editdata) {
            res.status(200).json(editdata);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Edit a user document
route.put('/edit/:id', async (req, res) => {
    try {
        const { title, document, date } = req.body; // Destructure title and doc from req.body
        const updatedDoc = await Note.findByIdAndUpdate(req.params.id, { title, document, date }, { new: true });
        res.status(200).json({ message: "Document Update Successful", updatedDoc });
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a user document
route.delete('/delete/:id', async (req, res) => {
    try {
        const deletedDoc = await Note.findByIdAndDelete(req.params.id);
        if (!deletedDoc) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json({ message: "Document deleted successfully", deletedDoc });
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export const NoteRouter = route;
