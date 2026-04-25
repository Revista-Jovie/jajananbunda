import { supabase } from "../lib/supabaseClient";

export const feedbackApi = {
  // Ambil semua feedback
  async fetchFeedback() {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Hapus feedback (hanya Admin yang pakai ini)
  async deleteFeedback(id) {
    const { error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  },

  // Fungsi ini nanti dipakai temanmu di aplikasi Customer
  async createFeedback(feedbackData) {
    const { data, error } = await supabase
      .from("feedback")
      .insert([feedbackData]);
    
    if (error) throw error;
    return data;
  }
};