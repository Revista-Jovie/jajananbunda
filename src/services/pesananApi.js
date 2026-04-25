import { supabase } from "../lib/supabaseClient";

// Ganti nama dari orderApi menjadi pesananApi agar sesuai dengan import di Pesanan.jsx
export const pesananApi = {
  // 1. Mengambil semua data dari tabel pesanan
  async fetchAll() {
    const { data, error } = await supabase
      .from("pesanan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // 2. Mengupdate status saja (Pending, On Going, Selesai, Canceled)
  async updateStatus(id, status) {
    const { error } = await supabase
      .from("pesanan")
      .update({ status })
      .eq("id", id);
    if (error) throw error;
  },

  // 3. Mengupdate detail data pesanan (Nama, Jumlah, Catatan) dari modal edit
  async updatePesanan(id, updateData) {
    const { error } = await supabase
      .from("pesanan")
      .update(updateData)
      .eq("id", id);
    if (error) throw error;
  },

  // 4. Menghapus data pesanan
  async deleteById(id) {
    const { error } = await supabase
      .from("pesanan")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // 5. Fungsi untuk upload bukti transfer (Nanti dipakai oleh temanmu di sisi customer)
  async uploadBuktiTF(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("pembayaran") // Pastikan sudah buat bucket "pembayaran" di Supabase
      .upload(fileName, file);

    if (error) throw error;

    // Ambil URL publik untuk disimpan di tabel pesanan
    const { data: publicData } = supabase.storage
      .from("pembayaran")
      .getPublicUrl(fileName);
      
    return publicData.publicUrl;
  }
};