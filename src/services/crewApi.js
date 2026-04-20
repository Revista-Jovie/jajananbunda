import { supabase } from "../lib/supabaseClient";

export const crewApi = {
  async fetchCrew() {
    const { data, error } = await supabase
      .from("crew")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async uploadCrewFoto(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("crew")
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from("crew")
      .getPublicUrl(fileName);
    return publicData.publicUrl;
  },

  async createCrew(crewData) {
    const { data, error } = await supabase.from("crew").insert([crewData]);
    if (error) throw error;
    return data;
  },

  async updateCrew(id, crewData) {
    const { error } = await supabase.from("crew").upsert([{ id, ...crewData }]);
    if (error) throw error;
  },
  
  async deleteCrew(id) {
    const { error } = await supabase.from("crew").delete().eq("id", id);
    if (error) throw error;
  },
};
