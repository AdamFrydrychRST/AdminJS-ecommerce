import { model, Schema, Types } from 'mongoose'

export interface Customer {
  id: Types.ObjectId
  name: string
  address: {
    street: string
    buildingNumber: string
    apartamentNumber: string
    city: string
    postCode: string
    country: string
  }
  phone: number
  email: string
  latitude: string
  longtitude: string
}

export const CustomerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  address: new Schema({
    street: { type: String, required: true },
    buildingNumber: { type: String, required: false },
    apartamentNumber: { type: String, required: false },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true }
  }),
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  latitude: { type: String },
  longtitude: { type: String }
})

export const CustomerModel = model<Customer>('Customers', CustomerSchema)
