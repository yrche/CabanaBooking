import {$apiInstance} from "@/shared/api/base.ts";
import {IGuest} from "@/shared/interfaces/guest.interface.ts";

interface ICabanaPayload extends IGuest{
    id: number,
}

export async function bookCabanaService(payload: ICabanaPayload) {
    console.log({ ...payload })

    const request = await $apiInstance.post(`/book/${payload.id}`, {
        room: payload.room,
        guestName: payload.guestName
    })
    return request.data
}