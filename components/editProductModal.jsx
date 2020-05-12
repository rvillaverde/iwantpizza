import React from 'react';

import Button from './button'
import Modal from './modal'
import ProductForm from './productForm'

import utilStyles from '../styles/utils.module.scss'

const EditProductModal = ({ open, handler, confirm, productId, loading }) => (
  <Modal open={ open } handler={ () => handler() } loading={ loading }>
    <div className={utilStyles.modalContent}>
      <ProductForm id="edit-product-form" productId={ productId } onSubmit={ confirm }></ProductForm>
    </div>
    <div className={utilStyles.modalActions}>
      <Button size="medium" type="button" secondary onClick={ () => handler() }>
        Cancel
      </Button>
      <Button size="medium" type="submit" form="edit-product-form">
        Save
      </Button>
    </div>
  </Modal>
)

export default EditProductModal;
