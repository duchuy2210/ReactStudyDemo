import axios from 'axios';

export default function requestGetNews(query = 'react') {
  return axios.request({
    method: 'GET',
    url: `https://hn.algolia.com/api/v1/search`,
    params: {
      query,
    },
  });
}
