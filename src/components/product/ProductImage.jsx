import { useState } from 'react';
import { ProductSilhouette } from './ProductSilhouette.jsx';
import { getImageSrcSet, getProductImage, getProductImageAlt } from '../../data/images.js';

function ProductImage({ product, index = 0, className = '', sizes, priority = false }) {
  const src = getProductImage(product.id, index);
  const [failedSrc, setFailedSrc] = useState(null);
  const hasPhoto = src && failedSrc !== src;

  return (
    <span className={`product-image__frame${className ? ` ${className}` : ''}`}>
      {hasPhoto ? (
        <img
          className="product-image"
          src={src}
          srcSet={getImageSrcSet(src)}
          alt={getProductImageAlt(src)}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <>
          <ProductSilhouette category={product.category} className="product-image__fallback" />
          <span className="visually-hidden">{product.title}</span>
        </>
      )}
    </span>
  );
}

export default ProductImage;
