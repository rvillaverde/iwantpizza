import React from 'react'
import Router from 'next/router'

import Button from '../../components/button'
import Layout from '../../components/layout'
import ProductForm from '../../components/productForm'

import cardStyles from '../../styles/cards.module.scss'
import utilStyles from '../../styles/utils.module.scss'
import { createProduct } from '../../lib/products'

const defaultState = { photoPreview: "/images/placeholder.svg", loading: false }

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState
    this.newProduct = this.newProduct.bind(this)
  }

  async newProduct(formData) {
    this.setState({ loading: true })
    await createProduct(formData)
    Router.push(`/products`)
  }

  render() {
    return (
      <Layout>
        <div className={utilStyles.container}>
          <div className={cardStyles.cardLarge}>
            <ProductForm id="new-product-form" onSubmit={ this.newProduct }></ProductForm>
          </div>
          <div className={utilStyles.formActions}>
            <Button type="submit" form="new-product-form" size="medium" disabled={this.state.loading}>
              Save
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewProduct;
