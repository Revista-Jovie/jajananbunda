import axios from 'axios'

const API_URL = "https://kblnllmearihyvimywbf.supabase.co/rest/v1/feedback"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibG5sbG1lYXJpaHl2aW15d2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NTUxNTIsImV4cCI6MjA2NTUzMTE1Mn0.diT3R56uOHrrcfEISiwR-bEMj5FxGFSfv9sRAANYTxA"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const feedbackApi = {
    async fetchFeedback() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createFeedback(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteFeedback(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}
