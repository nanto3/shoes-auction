const productController = ({ get, post, put, patch, destroy }) => {
  
  get( '' )
  ( () => {
    return { result: 'products home' };
  });
};

export default productController;
