import AdminJS, { ComponentLoader } from 'adminjs'
import express from 'express'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import mongoose from 'mongoose'
import { getLeafletDist } from '@adminjs/leaflet'
import { createCustomerResource } from './resources/customer.resource'
import path from 'path'

const PORT = 3001

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource
})

export const componentLoader = new ComponentLoader()

export const Components = {
  PDFGenerator: componentLoader.add('GeneratePDF', './custom_components/pdfgenerator.component')
}

const start = async (): Promise<void> => {
  const app = express()

  app.use(express.static(getLeafletDist()))
  app.use(express.static(path.join(__dirname, 'pdfs/')))

  // This facilitates the connection to the mongo database
  try {
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017')
    console.log('Successfully connected to the DB')
  } catch (error) {
    console.log(error)
  }

  const admin = new AdminJS({
    resources: [
      createCustomerResource()
    ],
    componentLoader,
    assets: {
      styles: ['/leaflet.css']
    }
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)

  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http:/localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
