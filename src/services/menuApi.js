import { supabase } from "../lib/supabaseClient";

export const menuApi = {
  // Mengambil semua data menu dari tabel "menu"
  async fetchMenu() {
    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data;
  },

  // Mengunggah foto ke storage bucket "menu"
  async uploadMenuFoto(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("menu") // Pastikan kamu sudah buat bucket bernama "menu" di Supabase
      .upload(fileName, file);

    if (error) throw error;

    // Mendapatkan URL publik untuk ditampilkan
    const { data: publicData } = supabase.storage
      .from("menu")
      .getPublicUrl(fileName);
      
    return publicData.publicUrl;
  },

  // Menambahkan data menu baru
  async createMenu(menuData) {
  const { data, error } = await supabase
    .from("menu")
    .insert([menuData]);

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw error;
  }

  return data;
},

  // Memperbarui data menu yang sudah ada
  async updateMenu(id, menuData) {
    const { error } = await supabase
      .from("menu")
      .upsert([{ id, ...menuData }]);
      
    if (error) throw error;
  },
  
  // Menghapus data menu berdasarkan ID
  async deleteMenu(id) {
    const { error } = await supabase
      .from("menu")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
  },
};