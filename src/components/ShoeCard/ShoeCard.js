import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const tagText = {
    'new-release': 'Just released!',
    'on-sale': 'Sale',
    default: null,
  }[variant];

  const tagColor =
    {
      'new-release': COLORS.secondary,
      'on-sale': COLORS.primary,
    }[variant] || null;
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {tagText && <Tag style={{ '--color': tagColor }}>{tagText}</Tag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--textDecoration':
                variant === 'on-sale' ? 'line-through' : 'none',
              '--color': variant === 'on-sale' ? COLORS.gray[700] : 'inherit',
            }}
          >
            {formatPrice(price)}
          </Price>
          {variant === 'on-sale' && (
            <SalePrice>
              <VisuallyHidden>Sale price: </VisuallyHidden>
              {formatPrice(salePrice)}
            </SalePrice>
          )}
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Tag = styled.div`
  position: absolute;
  background-color: var(--color);
  color: ${COLORS.white};
  padding: 6px 10px;
  font-size: 0.875rem;
  font-weight: 600;
  right: -8px;
  top: 12px;
  border-radius: 2px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 8px 8px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--textDecoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  position: absolute;
  right: 0;
  top: 1.4rem;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
