// services/clientApi.js
import { supabase } from "../lib/supabaseClient";

export const clientApi = {
  fetchAll: async () => {
    const { data, error } = await supabase.from("client").select("*");
    if (error) throw error;
    return data;
  },
  create: async (payload) => {
    const { data, error } = await supabase.from("client").insert([payload]);
    if (error) throw error;
    return data;
  },
  deleteById: async (id) => {
    const { data, error } = await supabase.from("client").delete().eq("id", id);
    if (error) throw error;
    return data;
  }
};
