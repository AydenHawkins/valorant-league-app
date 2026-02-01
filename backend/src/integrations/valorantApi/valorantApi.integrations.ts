import axios from "axios";
import dotenv from "dotenv";
import { ValorantApiResponse } from "./valorantApi.types";

dotenv.config();

const API_BASE_URL = "https://api.henrikdev.xyz/valorant/v4";
const API_KEY = process.env.VALORANT_API_KEY;

const valorantApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: API_KEY,
        Accept: "*/*",
    },
});

export async function getMatchById(
    region: string,
    matchId: string,
): Promise<ValorantApiResponse> {
    try {
        const response = await valorantApi.get(`/match/${region}/${matchId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching match by ID:", error);
        throw error;
    }
}
