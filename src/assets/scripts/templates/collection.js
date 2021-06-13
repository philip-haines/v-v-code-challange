import "../theme";
import getAllProducts from "../graphql/collection-starter-code";
import "../../styles/templates/collection.scss";
// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here
getAllProducts("test-collection").then((products) => console.log(products));
