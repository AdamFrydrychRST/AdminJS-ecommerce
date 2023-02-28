import { CustomerModel } from '../models/customer.model'
import leafletFeatures from '@adminjs/leaflet'
import { componentLoader, Components } from '../index'
import { geocode } from '../custom_components/geocoding.component'
import pdfGenerator from '../custom_components/pdfgenerator'
import { ResourceOptions, FeatureType } from 'adminjs'

interface CreateResourceResult<T> {
  resource: T
  options: ResourceOptions
  features?: FeatureType[]
}

export const createCustomerResource = (): CreateResourceResult<typeof CustomerModel> => ({
  resource: CustomerModel,
  features: [
    leafletFeatures.leafletSingleMarkerMapFeature({
      componentLoader,
      paths: {
        mapProperty: 'location',
        latitudeProperty: 'latitude',
        longitudeProperty: 'longtitude'
      },
      mapProps: {
        center: [50.04, 10.06],
        zoom: 4
      }
    })
  ],
  options: {
    navigation: {
      name: 'Customers',
      icon: 'Events'
    },
    actions: {
      new: {
        after: [geocode]
      },
      PDFGenerator: {
        actionType: 'record',
        icon: 'GeneratePdf',
        component: Components.PDFGenerator,
        handler: (request, response, context) => {
          const { record, currentAdmin } = context
          return {
            record: record.toJSON(currentAdmin),
            url: pdfGenerator(record.toJSON(currentAdmin))
          }
        }
      }
    },
    properties: {
      longtitude: {
        isVisible: false
      },
      latitude: {
        isVisible: false
      },
      id: {
        isVisible: false
      }
    }
  }
})
