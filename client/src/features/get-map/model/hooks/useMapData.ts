import { useCallback, useEffect, useState } from "react";
import {ICabana, ICell} from "@/entities/cabana/model/interfaces/cabana.interface.ts";
import { getMapService } from "@/features/get-map/api/getMap.ts";
import {Manager} from "socket.io-client";
import env from "@/config/config.env.ts";

export const useMapData = (initialData: ICabana[] = []) => {
    const [mapData, setMapData] = useState<(ICell | ICabana)[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);

    const manager = new Manager(env.VITE_SERVER_NAME);
    const socket = manager.socket("/");

    useEffect(() => {
        fetchMap()

        socket.on("CABANA_BOOKED", () => {
            fetchMap()
        })
    }, []);

    useEffect(() => {
        localStorage.setItem('map', JSON.stringify(mapData))
    }, [mapData]);

    const fetchMap = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getMapService();
            const data = Array.isArray(response) ? response : response.cells;
            setMapData(data);
        } catch (error) {
            console.error("Failed to fetchMap map:", error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    return {
        isLoading,
        refresh: fetchMap,
        mapData
    };
};