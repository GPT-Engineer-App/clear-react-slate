import { useState, useEffect } from "react";
import { Box, Button, Input, List, ListItem, Text } from "@chakra-ui/react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetch("https://mnwefvnykbgyhbdzpleh.supabase.co/notes", {
      headers: {
        "Content-Type": "application/json",
        apikey: "YOUR_API_KEY",
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
    })
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleAddNote = () => {
    fetch("https://mnwefvnykbgyhbdzpleh.supabase.co/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "YOUR_API_KEY",
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
      body: JSON.stringify({ note: newNote }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes([...notes, data]);
        setNewNote("");
      })
      .catch((error) => console.error("Error adding note:", error));
  };

  const handleDeleteNote = (id) => {
    fetch(`https://mnwefvnykbgyhbdzpleh.supabase.co/notes?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apikey: "YOUR_API_KEY",
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
    })
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <Box>
      <Input placeholder="Add a new note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <Button onClick={handleAddNote}>Add Note</Button>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id}>
            <Text>{note.note}</Text>
            <Button onClick={() => handleDeleteNote(note.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotesPage;
