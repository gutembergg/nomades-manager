export const getEcheance = (date_echeance, callback) => {
  const toDay = new Date()
  const toDayCompare = toDay.toLocaleDateString()
  console.log('toDay', toDayCompare)

  const echeance = new Date(date_echeance)
  const echeanceCompare = echeance.toLocaleDateString()
  console.log('anniversaire', echeanceCompare)

  if (toDayCompare === echeanceCompare) {
    return callback()
  } else {
    console.log('Pas gangne')
  }
}
