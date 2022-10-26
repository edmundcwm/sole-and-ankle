import React from 'react';
import styled from 'styled-components/macro';
import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const variantStyle = {
  'on-sale': {
    styles: {
      '--color': COLORS.gray[700],
      '--text-deco': 'line-through',
      '--bg-color': '#C5295D',
    },
    content: 'Sale',
  },
  default: {
    '--color': COLORS.gray[900],
    '--text-deco': 'none',
  },
  'new-release': {
    styles: {
      '--color': COLORS.gray[900],
      '--text-deco': 'none',
      '--bg-color': '#6868D9',
    },
    content: 'Just Released!',
  },
};

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

  const variantConfig = variantStyle[variant].styles;
  const flagContent = variantStyle[variant].content;
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant !== 'default' && (
            <Flag style={variantConfig}>{flagContent}</Flag>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price style={variantConfig}>{formatPrice(price)}</Price>
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-deco);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const Flag = styled('div')`
  font-size: 14px;
  font-family: 'Raleway';
  font-weight: ${WEIGHTS.bold};
  text-align: center;
  color: ${COLORS.white};
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 10px;
  height: 32px;
  line-height: 32px; // if line-height equals height then the text will be vertically centered
  background-color: var(--bg-color);
  position: absolute;
  top: 12px;
  right: -4px;
`;

export default ShoeCard;
