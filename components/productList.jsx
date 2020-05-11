import React from 'react';

import { deleteProduct } from '../lib/products'

import Link from 'next/link'
import Button from './button'
import Modal from './modal'
import Price from './price'
import { EditIcon, DeleteIcon, ConfirmDeleteIcon } from './icons'

import styles from './cartTable.module.scss'
import utilStyles from '../styles/utils.module.scss'

const DeleteProductModal = ({ open, handler, confirm }) => (
  <Modal open={ open } handler={ handler }>
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
      <Button size="medium" type="button" secondary onClick={ handler }>
        Cancel
      </Button>
      <Button size="medium" type="button" onClick={ confirm }>
        Delete
      </Button>
    </div>
  </Modal>
);

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editModalOpen: false, deleteModalOpen: false }
    this.deleteProduct = this.deleteProduct.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  toggleEditModal(productId) {
    this.setState({ editModalOpen: !this.state.editModalOpen, productId: productId })
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
        <DeleteProductModal open={ this.state.deleteModalOpen } handler={ this.toggleDeleteModal } confirm={ this.deleteProduct }/>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <td colSpan='2'>
                <h2 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Products</h2>
              </td>
              <td className={styles.actionsColumn} colSpan='3'>
                <Button size="medium" href="/products/new">
                  New product
                </Button>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.product_id} data-product-id={product.product_id}>
                <td className={styles.imageColumn} width="10%">
                  <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                    <a className={styles.thumb}>
                      <img className={styles.tumbImage} src={product.photo_url} alt={product.name} />
                    </a>
                  </Link>
                </td>
                <td className={styles.descriptionColumn}>
                  <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                    <a>
                      <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary500}`}>{product.name}</h3>
                    </a>
                  </Link>
                  <p className={`${utilStyles.lightText} ${utilStyles.caption}`}>{product.description}</p>
                </td>
                <td className={styles.numberColumn}>
                  <Price className={utilStyles.lightText} price={product.price} />
                </td>
                <td width="1%">
                  <Button size="small" icon onClick={() => this.toggleEditModal(product.product_id) }>
                    <EditIcon />
                  </Button>
                </td>
                <td width="1%">
                  <Button size="small" icon onClick={() => this.toggleDeleteModal(product.product_id) }>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
