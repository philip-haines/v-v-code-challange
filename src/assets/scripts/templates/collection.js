import "../theme";
import getAllProducts from "../graphql/collection-starter-code";
import "../../styles/templates/collection.scss";
// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here

Shopify.queryParams = {};
if (location.search.length) {
	for (
		let sortByValue,
			i = 0,
			sortByOptionRaw = location.search.substr(1).split("&");
		i < sortByOptionRaw.length;
		i++
	) {
		sortByValue = sortByOptionRaw[i].split("=");
		if (sortByValue.length > 1) {
			Shopify.queryParams[decodeURIComponent(sortByValue[0])] =
				decodeURIComponent(sortByValue[1]);
		}
	}
}

document.querySelector(".sort-by").addEventListener("change", function (e) {
	const value = e.currentTarget.value;
	Shopify.queryParams.sort_by = value;
	location.search = new URLSearchParams(Shopify.queryParams).toString();
});
