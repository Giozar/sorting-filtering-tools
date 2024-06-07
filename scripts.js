const apiUrl = `https://torquealto.com/h2actualizado/h2/public/api/herramientas/atornilladores`;

const getProducts = fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        handleWeightFilter(data);
        handleProductSorting(data);
        handleAdvantagesFilter(data);
        handleCharacteristicsFilter(data);
    });

const renderProducts = (products) => {
    const productsContainer = document.querySelector('#productsContainer');

    const productCardTemplate = (product) => `
        <div id="product-card" class="product-card">
                    <img src="${product.url_image}" alt="${product.nombre}">
                    <h3>${product.nombre}</h3>
                    <p>${product.ventajas}</p>
                </div>
                `;

    const productList = products.map(product => {
        return productCardTemplate(product);
    }).join('');



    productsContainer.innerHTML = productList;

    console.log(productsContainer);
};

const handleProductSorting = (products) => {
    const sortSelect = document.querySelector('#sortBy');

    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;

        if (sortValue === 'name-desc') {
            const productsSort = products.sort((a, b) => {
                return b.nombre.localeCompare(a.nombre);
            });
            return renderProducts(productsSort);
        }

        if (sortValue === 'name-asc') {
            products.sort((a, b) => {
                return a.nombre.localeCompare(b.nombre);
            });
            return renderProducts(products);
        }

    });
}


// Se maneja el filtro por medio de un rango de pesos que se encuentran en las especificaciones de cada producto
// Se filtran los productos que estén en el rango de pesos seleccionado del input weightFrom y weightTo
// Donde el valor máximo será 10kg y el mínimo 0.0kg 
// Si no se ingresan valores en los inputs se mostraran todos los productos
// si solo se ingresan valores en uno de los inputs se mostraran los productos que cumplan con el rango de pesos
// si cambia el valor de los inputs se actualiza la lista de productos filtrados
// Si se cambia el valor del select de ordenar se ordenaran los productos filtrados


const handleWeightFilter = (products) => {
    const weightFrom = document.querySelector('#weightFrom');
    const weightTo = document.querySelector('#weightTo');

    weightFrom.addEventListener('input', () => {
        const weightFromValue = weightFrom.value;
        const weightToValue = weightTo.value;

        const productsFilter = products.filter(product => {
            const weight = parseFloat(product.especificaciones.match(/\d+\.\d+/)[0]);
            return weight >= weightFromValue && weight <= weightToValue;
        });

        return renderProducts(productsFilter);
    });

    weightTo.addEventListener('input', () => {
        const weightFromValue = weightFrom.value;
        const weightToValue = weightTo.value;

        const productsFilter = products.filter(product => {
            const weight = parseFloat(product.especificaciones.match(/\d+\.\d+/)[0]);
            return weight >= weightFromValue && weight <= weightToValue;
        });

        return renderProducts(productsFilter);
    });
}


// Se maneja el filtro por medio de checkboxes
// Uno es light y rugged
// Se filtran los productos que tengan las características seleccionadas
// Si no se selecciona ninguna característica se mostraran todos los productos
// Si se selecciona una característica se mostraran los productos que cumplan con la característica seleccionada
// Si se seleccionan las dos características se mostraran los productos que cumplan con ambas características
// se buscara en la propiedad de ventajas si contiene la palabra ligero o rudo

const handleAdvantagesFilter = (products) => {
    const lightCheckbox = document.querySelector('#light');
    const ruggedCheckbox = document.querySelector('#rugged');

    lightCheckbox.addEventListener('change', () => {
        const lightChecked = lightCheckbox.checked;
        const ruggedChecked = ruggedCheckbox.checked;

        const productsFilter = products.filter(product => {
            if (lightChecked && ruggedChecked) {
                return product.ventajas.toLowerCase().includes('ligero') && product.ventajas.toLowerCase().includes('rudo');
            }

            if (lightChecked) {
                return product.ventajas.toLowerCase().includes('ligero');
            }

            if (ruggedChecked) {
                return product.ventajas.toLowerCase().includes('rudo');
            }

            return products;
        });

        return renderProducts(productsFilter);
    });

    ruggedCheckbox.addEventListener('change', () => {
        const lightChecked = lightCheckbox.checked;
        const ruggedChecked = ruggedCheckbox.checked;

        const productsFilter = products.filter(product => {
            if (lightChecked && ruggedChecked) {
                return product.ventajas.toLowerCase().includes('ligero') && product.ventajas.toLowerCase().includes('rudo');
            }

            if (lightChecked) {
                return product.ventajas.toLowerCase().includes('ligero');
            }

            if (ruggedChecked) {
                return product.ventajas.toLowerCase().includes('rudo');
            }

            return products;
        });

        return renderProducts(productsFilter);
    });

}

// Se maneja el filtro por medio de checkboxes
// Es una característica silencioso silence
// Se filtran los productos que tengan las características seleccionadas
// Si no se selecciona ninguna característica se mostraran todos los productos
// Esta en la propiedad de descripcion si contiene la palabra silencioso
const handleCharacteristicsFilter = (products) => {
    const silenceCheckbox = document.querySelector('#silence');

    silenceCheckbox.addEventListener('change', () => {
        const silenceChecked = silenceCheckbox.checked;

        const productsFilter = products.filter(product => {
            if (silenceChecked) {
                return product.descripcion.toLowerCase().includes('silencioso');
            }

            return products;
        });

        return renderProducts(productsFilter);
    });
};