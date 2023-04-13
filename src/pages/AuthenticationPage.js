import React from 'react';
import styled from 'styled-components';
const AuthenticationPageStyles = styled.div`
  width: 600px;
  margin: 50px auto;
  min-height: 80vh;
  padding: 40px;
  border: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    107.61deg,
    #00a7b4 15.59%,
    #a4d96c 87.25%
  );
  border-radius: 50px;
  .logo {
    width: 20%;
    margin: 0 auto;
  }
  .title {
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img src="./img/logo.png" alt="abc" className="logo" />
        <h2 className="title">Monkey Blogging</h2>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
