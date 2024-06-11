
/** 
 * Load image from url and return a promise
 * @param url image url
 */
export function loadImage (url: string) { 
  const img = new Image()
  img.src = url
  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (err) => {
      reject(err)
    }
  })
}


