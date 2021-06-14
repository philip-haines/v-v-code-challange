import "../theme";
import getAllProducts from "../graphql/collection-starter-code";
import "../../styles/templates/collection.scss";
// getAllProducts('test-collection') => returns a Promise, which resolves to an Array of Product Objects

// Your Code Here

const collectionList = document.querySelector(".collection-list");
getAllProducts("test-collection").then((products) => {
	for (let i = 0; i < products.length; i++) {
		const productItem = document.createElement("li");
		const productCard = document.createElement("div");
		const productImage = document.createElement("img");
		const productInfo = document.createElement("div");
		const productName = document.createElement("p");
		const productPrice = document.createElement("p");
		const productOptions = document.createElement("div");

		productItem.className = "product-item";
		productCard.className = "product-card";
		productImage.className = "product-image";
		productInfo.className = "product-info";
		productPrice.className = "product-text";
		productName.className = "product-text";
		productOptions.className = "product-options";

		productImage.src = products[i].variants[0].image.src;
		productName.innerText = products[i].title;
		productPrice.innerText = `$${products[i].variants[0].price}`;

		productInfo.appendChild(productName);
		productInfo.appendChild(productPrice);
		productInfo.appendChild(productOptions);
		productCard.appendChild(productImage);
		productCard.appendChild(productInfo);
		collectionList.appendChild(productCard);

		renderOptionBubbles(products[i], productOptions, productImage);
	}
});

const getColors = (product) =>
	product.options.filter((option) => option.name == "Color");

function findVariantPicture(selectedColor, product, element) {
	const colors = getColors(product);
	let splitSelected = selectedColor.split(" ");
	let selected;

	if (splitSelected.length > 1) {
		selected = splitSelected.join("-");
	} else {
		selected = selectedColor;
	}
	for (let i = 0; i < product.variants.length; i++) {
		const splitURL = product.variants[i].image.src.split("_");
		for (let j = 0; j < colors[0]?.values?.length; j++) {
			if (splitURL[1] == selected.toLowerCase()) {
				element.src = splitURL.join("_");
			}
		}
	}
}

const setBubbleColor = (color, element) => {
	switch (color) {
		case "Yellow":
			element.style.backgroundColor = "#FEC109";
			break;
		case "Red":
			element.style.backgroundColor = "#EF5350";
			break;
		case "Blue":
			element.style.backgroundColor = "#00BCD3";
			break;
		case "Gold":
			element.style.backgroundColor = "#FEC109";
			break;
		case "Brown":
			element.style.backgroundColor = "#AF806E";
			break;
		case "Medium Grey":
			element.style.backgroundColor = "#CDCDCD";
			break;
		case "medium-grey":
			element.style.backgroundColor = "#CDCDCD";
			break;
		case "Navy":
			element.style.backgroundColor = "#2F3676";
			break;
		case "Light Wash":
			element.style.backgroundColor = "#00BCD3";
			break;
		case "Dark Wash":
			element.style.backgroundColor = "#2F3676";
			break;
		default:
			element.style.backgroundColor = "none";
	}
};

function renderOptionBubbles(product, container, element) {
	const colors = getColors(product);
	colors[0]?.values?.forEach((color) => {
		const optionInput = document.createElement("button");
		optionInput.value = `${color}`;
		optionInput.className = "option-bubble";
		optionInput.style.background = "none";
		optionInput.addEventListener("click", function (e) {
			findVariantPicture(e.target.value, product, element);
		});
		setBubbleColor(color, optionInput);
		container.appendChild(optionInput);
	});
}

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
