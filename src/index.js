import { signIn } from "./auth.js";
import { getNotes } from "./notes.js";
import supabase from "./supabase.js";

// DOM Elements
const signInButton = document.getElementById("sign-in-btn");
const addNoteForm = document.getElementById("add-note-form");
const saveNoteButton = document.getElementById("save-note-btn");
const noteTitleInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");

// Sign-in Event Listener
signInButton.addEventListener("click", async () => {
	const email = prompt("Enter your email");
	const password = prompt("Enter your password");
	const user = await signIn(email, password);

	if (user) {
		addNoteForm.style.display = "block";

		const notes = await getNotes(user.id);
		displayNotes(notes);
	}
});

// Create a New Note
saveNoteButton.addEventListener("click", async () => {
	const user = supabase.auth.user();

	if (user) {
		const title = noteTitleInput.value;
		const content = noteContentInput.value;

		// Insert new note into Supabase
		const { data, error } = await supabase.from("notes").insert([{ user_id: user.id, title, content }]);

		if (error) {
			console.error("Error saving note:", error.message);
		} else {
			console.log("Note saved:", data);
			noteTitleInput.value = "";
			noteContentInput.value = "";

			// Fetch and display updated notes list
			const notes = await getNotes(user.id);
			displayNotes(notes);
		}
	}
});

// Display Notes in the List
function displayNotes(notes) {
	notesList.innerHTML = notes
		.map(
			(note) => `
    <div>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote('${note.id}')">Delete</button>
      <button onclick="editNote('${note.id}', '${note.title}', '${note.content}')">Edit</button>
    </div>
  `
		)
		.join("");
}

// Edit a Note
function editNote(noteId, title, content) {
	noteTitleInput.value = title;
	noteContentInput.value = content;

	// Change the save button to update the note
	saveNoteButton.innerText = "Update Note";
	saveNoteButton.onclick = async () => {
		const user = supabase.auth.user();

		if (user) {
			const { data, error } = await supabase
				.from("notes")
				.update({ title: noteTitleInput.value, content: noteContentInput.value })
				.eq("id", noteId)
				.eq("user_id", user.id);

			if (error) {
				console.error("Error updating note:", error.message);
			} else {
				console.log("Note updated:", data);
				saveNoteButton.innerText = "Save Note"; // Reset button
				saveNoteButton.onclick = createNote;

				// Clear inputs and fetch updated notes
				noteTitleInput.value = "";
				noteContentInput.value = "";
				const notes = await getNotes(user.id);
				displayNotes(notes);
			}
		}
	};
}

// Delete a Note
async function deleteNote(noteId) {
	const user = supabase.auth.user();

	if (user) {
		const { data, error } = await supabase.from("notes").delete().eq("id", noteId).eq("user_id", user.id);

		if (error) {
			console.error("Error deleting note:", error.message);
		} else {
			console.log("Note deleted:", data);
			const notes = await getNotes(user.id);
			displayNotes(notes);
		}
	}
}
