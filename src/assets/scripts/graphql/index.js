import axios from "axios";

const accessToken = 'ba2d4b5dcd373c353ed8f689c8330181';
const store = document.firstElementChild.dataset.shop;
const locale = document.firstElementChild.lang;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': accessToken,
  'Accept': 'application/json',
  'Accept-Language': locale,
};

const sendQuery = (query, variables = {}) => {
  const body = JSON.stringify({
    query,
    variables,
  });

  return axios({
    headers,
    method: 'post',
    data: body,
    url: `https://${store}.myshopify.com/api/2020-07/graphql`,
  })
}

export default sendQuery;
