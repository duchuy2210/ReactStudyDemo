import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  const NotFoundPageStyle = styled.div`
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo {
      display: inline-block;
      margin-bottom: 40px;
    }
    .heading{
      font-size: 50px;
      letter-spacing: 5px;
    }
  `;
  return (
    <NotFoundPageStyle>
      <NavLink to="/" className={'logo'}>
        <img src="/img/logo.png" alt="NotFound" />
      </NavLink>
      <h1 className="heading">Page Not Found</h1>
    </NotFoundPageStyle>
  );
};

export default NotFoundPage;
