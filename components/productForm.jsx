import React from 'react'
import styled from 'styled-components';

import { getProduct } from '../lib/products'
import FileUploader from './fileUploader'

import formStyles from '../styles/forms.module.scss'
import utilStyles from '../styles/utils.module.scss'

const defaultState = { photoPreview: "/images/placeholder.svg", product: undefined }

const ImagePreview = styled.div`
  width: 200px;
  background-color: #fafafa;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => props.image});
  border: 1px solid #eeeeee;
  margin: 1rem;
  margin-right: 0;

  &::before {
    content: "";
    width: 100%;
    padding-top: 100%;
    display: block;
  }

  @media (max-width: 460px) {
    width: calc(100% - 2rem);
  }
`;

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState
    this.handlePhotoChange = this.handlePhotoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async fetchProduct() {
    document.getElementById(this.props.id).reset()
    if (this.props.productId) {
      this.props.toggleLoading(true)
      let product = await getProduct(this.props.productId)
      this.setState({
        product: product,
        photoPreview: product.photo_url
      })
      this.props.toggleLoading(false)
    } else {
      this.setState(defaultState)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    formData.append('photo', this.state.photo)
    if (this.props.productId) formData.append('product_id', this.props.productId)
    this.props.onSubmit(formData)
  }

  handlePhotoChange(file) {
    this.setState({
      photo: file,
      photoPreview: URL.createObjectURL(file)
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.fetchProduct()
    }
  }

  render() {
    return (
      <form id={ this.props.id } onSubmit={ this.handleSubmit }>
        <div className={formStyles.formTitle}>
          <h2 className={`${utilStyles.colorPrimary700} ${utilStyles.headingMd}`}>
            { this.props.productId
              ? "Edit Product"
              : "New Product" 
            }
          </h2>
        </div>
        <div className={formStyles.section}>
          <div className={formStyles.subsection}>
            <ImagePreview image={ this.state.photoPreview } />
          </div>
          <div className={formStyles.subsectionLarge}>
            <div className={formStyles.fieldSet}>
              <div className={formStyles.formField}>
                <input type="text" name="name" placeholder="Name" required 
                  defaultValue={this.state.product ? this.state.product.name : ''}
                  className={formStyles.textField} />
              </div>
            </div>
            <div className={formStyles.fieldSet}>
              <div className={formStyles.formField}>
                <input type="text" name="description" placeholder="Description" required 
                  defaultValue={this.state.product ? this.state.product.description : ''}
                  className={formStyles.textField} />
              </div>
            </div>
            <div className={formStyles.fieldSet}>
              <div className={formStyles.formField}>
                <input type="number" name="price" placeholder="Price" required 
                  defaultValue={this.state.product ? this.state.product.price : ''}
                  className={formStyles.textField} />
                <p className={`${utilStyles.lightText} ${utilStyles.caption}`}>(*) in USD.</p>
              </div>
            </div>
          </div>
        </div>
        <FileUploader onChange={ this.handlePhotoChange }/>
      </form>
    );
  }
}

export default ProductForm;
