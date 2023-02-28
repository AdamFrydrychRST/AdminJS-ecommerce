import React, { useEffect } from 'react'
import { ApiClient, ActionProps } from 'adminjs'
import { Loader } from '@adminjs/design-system'

const GeneratePdf: React.FC<ActionProps> = (props) => {
  const { record, resource } = props
  const api = new ApiClient()

  useEffect(() => {
    api.recordAction({
      recordId: record.id,
      resourceId: resource.id,
      actionName: 'PDFGenerator'
    }).then((response) => {
      window.location.href = response.data.url
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return <Loader />
}

export default GeneratePdf
