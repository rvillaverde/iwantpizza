import React from 'react';

import { SecondaryButton, BasicButton } from './buttons'
import Modal from './modal'
import ProductForm from './productForm'

import utilStyles from '../styles/utils.module.scss'

const EditProductModal = ({ open, handler, confirm, productId, loading }) => (
  <Modal open={ open } handler={ () => handler() } loading={ loading }>
    <div className={utilStyles.modalContent}>
      <ProductForm id="edit-product-form" productId={ productId } onSubmit={ confirm }></ProductForm>
    </div>
    <div className={utilStyles.modalActions}>
      <SecondaryButton type="button" onClick={ () => handler() }>
        Cancel
      </SecondaryButton>
      <BasicButton type="submit" form="edit-product-form">
        Save
      </BasicButton>
    </div>
  </Modal>
)

export default EditProductModal;
