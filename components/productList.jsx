import React from 'react';

import { editProduct, deleteProduct } from '../lib/products'

import Link from 'next/link'
import { BasicButton, SecondaryButton, IconButton } from './buttons'
import LinkButton from './linkButton'
import Modal from './modal'
import Price from './price'
import ProductForm from './productForm'
import { EditIcon, DeleteIcon, ConfirmDeleteIcon } from './icons'
import { Table, THead, TBody, TFoot, Tr, Td, NumberColumn, ActionsColumn, DescriptionColumn, ImageColumn } from './table'

import styles from './cartTable.module.scss'
import utilStyles from '../styles/utils.module.scss'

const DeleteProductModal = ({ open, handler, confirm }) => (
  <Modal open={ open } handler={ () => handler() }>
    <div className={utilStyles.modalContent}>
      <ConfirmDeleteIcon />
      <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Are you sure?</h3>
      <p className={`${utilStyles.lightText} ${utilStyles.body}`}>
        Do you really want to delete this product?
        <br/>
        This action cannot be undone.
      </p>
    </div>
    <div className={utilStyles.modalActions}>
      <SecondaryButton type="button" onClick={ () => handler() }>
        Cancel
      </SecondaryButton>
      <BasicButton type="button" onClick={ confirm }>
        Delete
      </BasicButton>
    </div>
  </Modal>
);

const EditProductModal = ({ open, handler, confirm, productId, loading, toggleLoading }) => (
  <Modal open={ open } handler={ () => handler() } loading={ loading }>
    <div className={utilStyles.modalContent}>
      <ProductForm id="edit-product-form" productId={ productId } onSubmit={ confirm } toggleLoading={ toggleLoading }></ProductForm>
    </div>
    <div className={utilStyles.modalActions}>
      <SecondaryButton type="button" secondary onClick={ () => handler() }>
        Cancel
      </SecondaryButton>
      <BasicButton type="submit" form="edit-product-form">
        Save
      </BasicButton>
    </div>
  </Modal>
)

const defaultState = { editModalOpen: false, deleteModalOpen: false, loading: false }

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading(loading) {
    this.setState({ loading: loading ? loading : !this.state.loading })
  }

  toggleEditModal(productId) {
    this.setState({ editModalOpen: !this.state.editModalOpen, productId: productId })
  }

  async editProduct(formData) {
    this.setState({ loading: true })
    await editProduct(formData)
    window.location.reload(false)
  }

  async deleteProduct() {
    await deleteProduct(this.state.productId)
    document.querySelector(`tr[data-product-id='${ this.state.productId }']`).remove()
    this.toggleDeleteModal()
  }

  toggleDeleteModal(productId) {
    this.setState({ deleteModalOpen: !this.state.deleteModalOpen, productId: productId })
  }

  render() {
    return (
      <div>
        <DeleteProductModal open={ this.state.deleteModalOpen }
          handler={ this.toggleDeleteModal }
          confirm={ this.deleteProduct }/>

        <EditProductModal open={ this.state.editModalOpen }
          handler={ this.toggleEditModal }
          confirm={ this.editProduct }
          productId={ this.state.productId }
          loading={ this.state.loading }
          toggleLoading={ this.toggleLoading } />

        <Table>
          <THead>
            <Tr>
              <Td colSpan='2'>
                <h2 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Products</h2>
              </Td>
              <ActionsColumn colSpan='3'>
                <LinkButton href="/products/new">New product</LinkButton>
              </ActionsColumn>
            </Tr>
          </THead>
          <TBody>
            {this.props.products.map(product => (
              <Tr key={product.product_id} data-product-id={product.product_id}>
                <ImageColumn width="10%">
                  <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                    <a className={styles.thumb}>
                      <img className={styles.tumbImage} src={product.photo_url} alt={product.name} />
                    </a>
                  </Link>
                </ImageColumn>
                <DescriptionColumn>
                  <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                    <a>
                      <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary500}`}>{product.name}</h3>
                    </a>
                  </Link>
                  <p className={`${utilStyles.lightText} ${utilStyles.caption}`}>{product.description}</p>
                </DescriptionColumn>
                <NumberColumn>
                  <Price className={utilStyles.lightText} price={product.price} />
                </NumberColumn>
                <Td width="1%">
                  <IconButton onClick={() => this.toggleEditModal(product.product_id) }>
                    <EditIcon />
                  </IconButton>
                </Td>
                <Td width="1%">
                  <IconButton onClick={() => this.toggleDeleteModal(product.product_id) }>
                    <DeleteIcon />
                  </IconButton>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>
    );
  }
}

export default ProductList;
