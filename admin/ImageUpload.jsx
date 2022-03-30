import React, { useEffect, useState } from 'react';
import { DropZone, Label, Box } from '@admin-bro/design-system'
import HttpPostRequest from './HttpPostRequest';



// import { Label, useNotice } from 'admin-bro'

function ImageUploader(props) {

    const { property, record, onChange } = props

    const [files, setFiles] = useState([]);
    const [msg,setMsg] = useState('Image Uploading.... , Please dont save data until images not uploaded');
    const [isLoading, setIsLoading] = useState(false);
    // const sendNotice = useNotice()


    const onUpload = (files) => {

        const newRecord = { ...record }
        const file = files.length && files[0];


        var formData = new FormData()
        formData.append('image', file);

        setIsLoading(true);
        HttpPostRequest('/uploadimage', formData)
            .then(res => {
                setIsLoading(false);
                setMsg('Image uploaded successfully.')
                onChange({
                    ...newRecord,
                    params: {
                        ...newRecord.params,
                        [property.name]: res,
                    }
                });
            })
            .catch(err => {
                setIsLoading(false);
            })

        event.preventDefault()
    }


    return (
        <Box style={{ marginBottom: 30 }}>
            <Label>{property.label}</Label>
            {isLoading && <Label style={{color: 'blue'}}> {msg} </Label> }
            <DropZone onChange={onUpload} />
        </Box>
    );
}

export default ImageUploader


