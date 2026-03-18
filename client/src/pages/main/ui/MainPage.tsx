import { MapGrid } from '@/features/get-map/ui/MapGrid/MapGrid';
import React = require('react');
import {useMapData} from "@/features/get-map/model/hooks/useMapData.ts";
import {Loading} from "@/shared/ui/Loading/Loading.tsx";
import {BookingModal} from "@/features/book-cabana/ui/BookingModal/BookingModal.tsx";
import {useEffect, useState} from "react";
import {ICabana} from "@/entities/cabana/model/interfaces/cabana.interface.ts";
import {Toaster} from "sonner";

export const MainPage = () => {
    const [map, setMap] = useState([])
    const [selectedCabana, setSelectedCabana] = useState<ICabana | null>(null);
    const { isLoading, mapData } = useMapData([])

    function handleUpdate() {
        useEffect(() => {
            if (mapData) {
                setMap(JSON.parse(localStorage.getItem('map')))
            }
        }, [mapData]);
    }

    handleUpdate();

    return (
        <main>
            <Toaster position="top-center" richColors />
            <MapGrid
                mapData={map}
                onCabanaClick={setSelectedCabana}
                selectedId={selectedCabana?.id}
            />

            {selectedCabana && (
                <BookingModal
                    cabana={selectedCabana}
                    onClose={() => setSelectedCabana(null)}
                    onSuccess={() => {
                        handleUpdate()
                        setSelectedCabana(null);
                    }}
                />
            )}
            {isLoading && <Loading />}
        </main>
    );
};