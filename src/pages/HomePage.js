import Header from 'Components/layouts/Header';
import Layout from 'Components/layouts/Layout';
import HomeBanner from 'modules/HomeBanner';
import React from 'react';
import styled from 'styled-components';

const HomePageStyles = styled.div``;
const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
