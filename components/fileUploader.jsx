import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components'
import utilStyles from '../styles/utils.module.scss'

const getBorderColor = (props) => {
  if (props.isDragAccept) {
    return '#729b54';
  }
  if (props.isDragReject) {
    return '#ca2627';
  }
  if (props.isDragActive) {
    return '#729b54';
  }
  return '#eeeeee';
}

const getBackgroundColor = (props) => {
  if (props.isDragActive && props.isDragAccept) {
    return '#eeeeee';
  }
  return '#fafafa';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  border-width: 2px;
  border-radius: 0.2rem;
  border-color: ${props => getBorderColor(props)};
  border-style: dashed;
  background-color:  ${props => getBackgroundColor(props)};
  margin: 1rem;
  outline: none;
  transition: border .24s ease-in-out;
`;

export default function FileUploader({ onChange, name }) {
  const [fileImage, setFileImage] = useState([])

  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) setFileImage(URL.createObjectURL(acceptedFiles[0]))
    if (acceptedFiles.length) onChange(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: handleDrop
  })

  return (
    <div className="container">
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input name={name} {...getInputProps()} />
        <p className={`${utilStyles.lightText} ${utilStyles.body}`}>
          Drag 'n' drop the product image here, or click to select a file.
        </p>
      </Container>
    </div>
  )
}