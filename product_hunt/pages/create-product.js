import React, { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { Form, Div, Submit, Error } from "../components/ui/Form";
import { css } from "@emotion/react";
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';

// Firebase
import { FirebaseContext } from '../firebase';

// Validations
import useValidation from "../hooks/useValidation";
import validateNewProduct from "../validations/new-product.validationRules";

const CreateProduct = () => {

  const initialState = {
    name: '',
    company: '',
    image: '',
    url: '',
    description: ''
  };

  // ImageStates
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState(false);
  const { values, errors, handleChange, handleSubmit, handleBlur } = useValidation(initialState, validateNewProduct, addProduct);
  const { name, company, image, url, description } = values;

  // Routing hook
  const router = useRouter();
  // Firebase context
  const { user, firebase } = useContext(FirebaseContext);
  // console.log(firebase.storage);

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleProgress = progress => setProgress({ progress });
  const handleUploadError = error => {
    setUploading(false);
    console.error(error);
  };
  const handleUploadSuccess = filename => {
    setProgress(100);
    setUploading(false);
    setImageName(filename);

    console.log(filename);
    // firebase.refStorage
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => setImageUrl(url));
  };

  async function addProduct() {
    if (!user) {
      return router.push('/login');
    }

    const product = {
      name,
      company,
      url,
      description,
      rate: 0,
      comments: [],
      creationDate: Date.now()
    };

    firebase.addProduct(product);
  }

  return (
    <div>
      <Layout>
        <>
          <h1 css={css`
        text-align: center;
        margin-top: 5rem;
        `}>Create Product</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>
                Main Info
              </legend>
              <Div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name..."
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Div>

              {errors.name && <Error>{errors.name}</Error>}

              <Div>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company..."
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Div>

              {errors.company && <Error>{errors.company}</Error>}

              <Div>
                <label htmlFor="image">Image</label>
                <FileUploader
                  accept="image/*"
                  id="image"
                  name="image"
                  value={image}
                  randomizeFilename
                  // storageRef={firebase.refStorage.name}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Div>

              {errors.image && <Error>{errors.image}</Error>}

              <Div>
                <label htmlFor="url">Url</label>
                <input
                  type="url"
                  id="url"
                  placeholder="Url..."
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Div>

              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>About product</legend>
              <Div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Description..."
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Div>

              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>

            <Submit
              type="submit"
              value="Create Product"
            />

            {error && <Error>{error}</Error>}
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default CreateProduct;