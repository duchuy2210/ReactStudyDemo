import Layout from 'Components/layouts/Layout';
import HomeBanner from 'modules/home/HomeBanner';
import HomeFeature from 'modules/home/HomeFeature';
import HomeNewest from 'modules/home/HomeNewest';
import React from 'react';
import styled from 'styled-components';

const HomePageStyles = styled.div``;
const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
