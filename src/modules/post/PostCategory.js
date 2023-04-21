import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostCategoryStyle = styled.div`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;
  margin-bottom: 10px;
  a{
    display: block;
  }
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* max-width: 100px; */
  ${props =>
    props.type === 'primary' &&
    css`
      background-color: ${props => props.theme.grayF3};
    `}
  ${props =>
    props.type === 'secondary' &&
    css`
      background-color: white;
    `}
`;
const PostCategory = ({ children, type = 'primary', className = '' ,to='/'}) => {
  return (
    <PostCategoryStyle type={type} className={className}>
    <NavLink to={to}>
      {children}
    </NavLink>
    </PostCategoryStyle>
  );
};

export default PostCategory;
