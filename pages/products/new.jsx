import React from 'react'
import Router from 'next/router'

import { BasicButton } from '../../components/buttons'
import Layout from '../../components/layout'
import ProductForm from '../../components/productForm'
import { CardLarge } from '../../components/card'

import { createProduct } from '../../lib/products'

import utilStyles from '../../styles/utils.module.scss'

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
          <CardLarge>
            <ProductForm id="new-product-form" onSubmit={ this.newProduct }></ProductForm>
          </CardLarge>
          <div className={utilStyles.formActions}>
            <BasicButton type="submit" form="new-product-form" disabled={this.state.loading}>
              Save
            </BasicButton>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewProduct;
