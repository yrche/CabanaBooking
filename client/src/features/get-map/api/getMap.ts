import {$apiInstance} from "@/shared/api/base.ts";

export async function getMapService() {
    const request = await $apiInstance.get('/map')
    return request.data
}