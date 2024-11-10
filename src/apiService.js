import axios from 'axios';

const API_KEY = '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'

const MODEL_URL = 'https://api-inference.huggingface.co/models/gpt2';

export const fetchHuggingFaceResponse = async (inputText) => {
    try {
        const response = await axios.post(
            MODEL_URL,
            { inputs: inputText },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching response:', error);
        throw error;
    }
};