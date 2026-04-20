import { supabase } from "../lib/supabaseClient";

export const orderApi = {
  async fetchAll() {
    const { data, error } = await supabase
      .from("order")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async deleteById(id) {
    const { error } = await supabase
      .from("order")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

