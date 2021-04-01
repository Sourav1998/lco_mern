import React from 'react'
import { API } from '../../backend'

const ImageHelper = ({product}) => {
    const imageurl = product ? `${API}/product/photo/${product._id}` : `data:image/jpeg;base64,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`
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageurl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
    )
}
export default ImageHelper