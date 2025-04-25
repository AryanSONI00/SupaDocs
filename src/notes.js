import supabase from "./supabase.js";

const getNotes = async (userId) => {
	const { data, error } = await supabase.from("notes").select("*").eq("user_id", userId);

	if (error) {
		console.error("Error fetching notes:", error.message);
	} else {
		return data;
	}
};

export { getNotes };
