import { supabase } from "../lib/supabaseClient";

export const faqApi = {
  async fetchFaq() {
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async createFaq(crewData) {
    const { data, error } = await supabase.from("faq").insert([crewData]);
    if (error) throw error;
    return data;
  },

  async updateFaq(id, crewData) {
    const { error } = await supabase.from("faq").upsert([{ id, ...crewData }]);
    if (error) throw error;
  },
  
  async deleteFaq(id) {
    const { error } = await supabase.from("faq").delete().eq("id", id);
    if (error) throw error;
  },
};
