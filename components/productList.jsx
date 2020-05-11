import React from 'react';

import { deleteProduct } from '../lib/products'

import Link from 'next/link'
import Button from './button'
import Price from './price'
import { EditIcon, DeleteIcon } from './icons'

import styles from './cartTable.module.scss'
import utilStyles from '../styles/utils.module.scss'

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  editProduct(productId) {
    console.log('edit product', productId)
  }

  async deleteProduct(productId) {
    await deleteProduct(productId)
    document.querySelector(`tr[data-product-id='${ productId }']`).remove();
  }

  render() {
    return (
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
                <Button size="small" icon onClick={() => this.editProduct(product.product_id) }>
                  <EditIcon />
                </Button>
              </td>
              <td width="1%">
                <Button size="small" icon onClick={() => this.deleteProduct(product.product_id) }>
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ProductList;
