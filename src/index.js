import { signIn } from "./auth.js";
import { getNotes } from "./notes.js";

// Handle the sign-in button
document.getElementById("sign-in-btn").addEventListener("click", async () => {
	const email = prompt("Enter your email");
	const password = prompt("Enter your password");

	const user = await signIn(email, password);
	if (user) {
		const notes = await getNotes(user.id);
		const notesList = document.getElementById("notes-list");
		notesList.innerHTML = notes.map((note) => `<p>${note.title}</p>`).join("");
	}
});
