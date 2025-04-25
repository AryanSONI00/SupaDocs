import supabase from "./supabase.js";

const signIn = async (email, password) => {
	const { user, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		console.error("Error signing in:", error.message);
	} else {
		console.log("User signed in:", user);
		return user;
	}
};

export { signIn };
