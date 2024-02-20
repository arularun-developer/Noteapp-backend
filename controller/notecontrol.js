import { Note } from "../models/note.js";

export function getAllUserDocs(req){
    return Note.find({user:req.user._id}).populate( "user","title document date");               

}

