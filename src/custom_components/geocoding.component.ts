import { After } from 'adminjs'
import axios from 'axios'

interface Address {
  street: string
  buildingNumber: string
  city: string
}

interface Coords {
  longtitude: string
  latitude: string
}

export const geocode: After<any> = async (response, request, context): Promise<any> => {
  const { record, resource } = context
  const address: Address = {
    street: record.params['address.street'].replace(/ /g, '+'),
    buildingNumber: record.params['address.buildingNumber'].replace(/ /g, '+'),
    city: record.params['address.city'].replace(/ /g, '+')
  }

  const getCords = async (address: Address): Promise<Coords> => {
    const axiosResponse = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address.street}+${address.buildingNumber}+${address.city}&format=geocodejson`)
    return {
      longtitude: axiosResponse.data.features[0].geometry.coordinates[0].toString(),
      latitude: axiosResponse.data.features[0].geometry.coordinates[1].toString()
    }
  }
  await resource.update(record.id(), await getCords(address))
  return response
}
