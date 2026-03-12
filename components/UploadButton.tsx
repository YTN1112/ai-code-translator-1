import React, { useRef, useState, ChangeEvent } from 'react'


const UploadButton = ({ onUpload }: { onUpload: (contents: string) => void }) => {
  const [uploadError, setUploadError] = useState('')
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return
    }
    const file = e.target.files[0]

    if (file) {

      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        onUpload(event?.target?.result as string)
      }

      e.target.value = ''
      fileReader.readAsText(file)
    } else {
      setUploadError('File could not be uploaded. Please try again.')
    }
  }
  return (
    <>
      {/* style this however you like */}
      <button onClick={() => uploadRef.current?.click()}>Upload file</button>

      <input
        type="file"
        ref={uploadRef}
        onChange={handleUpload}
        style={{ display: 'none' }}
      />

      {uploadError ? <p>{uploadError}</p> : null}
    </>
  )
}

export { UploadButton }