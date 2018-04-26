export default (img, fileTypes = []) => {
  return new Promise((resolve, reject) => {
    if (img) {
      if (fileTypes.indexOf(img.type) !== -1) {
        var reader  = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(img)
      } else {
        throw new Error(`Invalid file type. Please choose ${fileTypes.join(',')}, Thank you.`)
      }
    } else {
      resolve('')
    }
  })
}