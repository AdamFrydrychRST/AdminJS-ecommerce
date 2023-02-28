import { RecordJSON } from 'adminjs'
import { jsPDF } from 'jspdf'

const pdfGenerator = (record: RecordJSON): string => {
  const { params } = record
  const doc = new jsPDF({
    orientation: 'l',
    format: 'letter'
  })
  const deliveryPadding = 150
  const returnPadding = 10

  doc.text('Delivery address:', deliveryPadding, 90)
  doc.text(params.name, deliveryPadding, 97)
  doc.text(params.email, deliveryPadding, 104)
  doc.text(params.phone.toString(), deliveryPadding, 111)
  doc.text(params['address.street'] + ' ' + params['address.buildingNumber'], deliveryPadding, 118)
  doc.text(params['address.postCode'] + ', ' + params['address.city'] + ', ' + params['address.country'], deliveryPadding, 125)

  doc.text('Return address:', returnPadding, returnPadding)
  doc.text('Super e-commerce company', returnPadding, 17)
  doc.text('info@superecommerce.company', returnPadding, 24)
  doc.text('646444782', returnPadding, 31)
  doc.text('Pariser Platz', returnPadding, 38)
  doc.text('10117 Berlin, Germany', returnPadding, 45)

  doc.text('Stamp here!', 230, 20)

  const filename = `/${params._id}.pdf`
  doc.save(`./src/pdfs${filename}`)

  return filename
}

export default pdfGenerator
