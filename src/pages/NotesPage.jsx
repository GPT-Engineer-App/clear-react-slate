import { useState, useEffect } from "react";
import { Box, Button, Input, Text, VStack, HStack } from "@chakra-ui/react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const apiUrl = "https://mnwefvnykbgyhbdzpleh.supabase.co";

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`${apiUrl}/notes`);
      const data = await response.json();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    await fetch(`${apiUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: newNote }),
    });
    setNotes([...notes, { note: newNote }]);
    setNewNote("");
  };

  const updateNote = async (id, updatedNote) => {
    await fetch(`${apiUrl}/notes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, note: updatedNote }),
    });
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, note: updatedNote } : note));
    setNotes(updatedNotes);
  };

  const deleteNote = async (id) => {
    await fetch(`${apiUrl}/notes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Input placeholder="Add new note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <Button onClick={addNote}>Add Note</Button>
        {notes.map((note) => (
          <HStack key={note.id}>
            <Text>{note.note}</Text>
            <Button onClick={() => updateNote(note.id, "Updated note content")}>Update</Button>
            <Button onClick={() => deleteNote(note.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default NotesPage;
