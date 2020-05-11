import React from 'react'
import Router from 'next/router'
import styled from 'styled-components';

import Button from '../../components/button'
import Layout from '../../components/layout'
import FileUploader from '../../components/fileUploader'

import cardStyles from '../../styles/cards.module.scss'
import formStyles from '../../styles/forms.module.scss'
import utilStyles from '../../styles/utils.module.scss'
import { createProduct } from '../../lib/products'

const ImagePreview = styled.div`
  height: 200px;
  width: 200px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${props => props.image});
  margin: 1rem;
  margin-right: 0;
`;

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photoPreview: "/images/placeholder.svg", loading: false }
    this.newProduct = this.newProduct.bind(this)
    this.handlePhotoChange = this.handlePhotoChange.bind(this)
  }

  async newProduct(e) {
    e.preventDefault()
    this.setState({ loading: true })
    const formData = new FormData(e.target)
    formData.append('photo', this.state.photo)
    await createProduct(formData)
    Router.push(`/products`)
  }

  handlePhotoChange(file) {
    this.setState({
      photo: file,
      photoPreview: URL.createObjectURL(file)
    })
  }

  render() {
    return (
      <Layout>
        <div className={utilStyles.container}>
          <div className={cardStyles.cardLarge}>
            <form id="productForm" onSubmit={this.newProduct}>
              <div className={formStyles.formTitle}>
                <h2 className={`${utilStyles.colorPrimary700} ${utilStyles.headingMd}`}>New Product</h2>
              </div>
              <div className={formStyles.section}>
                <div className={formStyles.subsection}>
                  <ImagePreview image={ this.state.photoPreview } />
                </div>
                <div className={formStyles.subsectionLarge}>
                  <div className={formStyles.fieldSet}>
                    <div className={formStyles.formField}>
                      <input className={formStyles.textField} type="text" name="name" placeholder="Name" required />
                    </div>
                  </div>
                  <div className={formStyles.fieldSet}>
                    <div className={formStyles.formField}>
                      <input className={formStyles.textField} type="text" name="description" placeholder="Description" required />
                    </div>
                  </div>
                  <div className={formStyles.fieldSet}>
                    <div className={formStyles.formField}>
                      <input className={formStyles.textField} type="number" name="price" placeholder="Price" required />
                      <p className={`${utilStyles.lightText} ${utilStyles.caption}`}>(*) in USD.</p>
                    </div>
                  </div>
                </div>
              </div>
              <FileUploader onChange={ this.handlePhotoChange }/>
            </form>
          </div>
          <div className={utilStyles.formActions}>
            <Button type="submit" form="productForm" size="medium" disabled={this.state.loading}>
              Save
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewProduct;
