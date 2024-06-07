const apiUrl = `https://torquealto.com/h2actualizado/h2/public/api/herramientas/herramientas-de-torque`;

const getProducts = fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        handleProductSorting(data);
        handleTorqueFilter(data);
        handleWeightFilter(data);
    });

const renderProducts = (products) => {
    const productsContainer = document.querySelector('#productsContainer');

    const productCardTemplate = (product) => `
        <div id="product-card-atornilladores" class="product-card">
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

/**
 * 
 * Se maneja el filtro por medio de un rango de torque que se encuentran en las especificaciones de cada producto
 * La estructura de las especificaciones de cada producto es la siguiente:
 * "especificaciones": "<div class="dt-sc-tabs-frame-content"> <ul> <li><span style="font-weight: bold;">Torque m&aacute;ximo de entrada:</span>&nbsp;208 Nm (154 ft.lb)</li> <li><span style="font-weight: bold;">Torque m&aacute;ximo de salida: </span>2,500 Nm (1,850 ft.lb)</li> <li><span style="font-weight: bold;">Relaci&oacute;n de torque: </span>1:12</li> <li><span style="font-weight: bold;">Tipo de entrada:</span> cuadro hembra de 1/2&rdquo;</li> <li><span style="font-weight: bold;">Tipo de salida:</span> cuadro macho de 1&rdquo;</li> <li><span style="font-weight: bold;">Tipo de mecanismo:</span> engranes planetarios.</li> <li><span style="font-weight: bold;">Peso:</span> 3.5 kg.</li> </ul> </div>",
 * Solo buscaras el valor de torque y que puede ser en un formato de 2,500 Nm o 2500 Nm
 * si no tiene el valor de torque no se mostrara el producto
 * Se filtran los productos que estén en el rango de torque seleccionado del input torqueFrom y torqueTo
 * Si no se ingresan valores en los inputs se mostraran todos los productos
 * si solo se ingresan valores en uno de los inputs se mostraran los productos que cumplan con el rango de pesos
 * si cambia el valor de los inputs se actualiza la lista de productos filtrados
 * Si se cambia el valor del select de ordenar se ordenaran los productos filtrados
 * 
 * Donde el valor máximo será 2500Nm y el mínimo 0.0Nm
 * 
 */
const handleTorqueFilter = (products) => {
    const torqueFrom = document.querySelector('#torqueFrom');
    const torqueTo = document.querySelector('#torqueTo');

    torqueFrom.addEventListener('input', () => {
        const torqueFromValue = torqueFrom.value;
        const torqueToValue = torqueTo.value;

        const productsFiltered = products.filter(product => {
            const torqueValue = product.especificaciones.match(/(\d+,\d+|\d+) Nm/);
            if (!torqueValue) {
                return false;
            }
            return torqueValue[0] >= torqueFromValue && torqueValue[0] <= torqueToValue;
        });

        return renderProducts(productsFiltered);
    });

    torqueTo.addEventListener('input', () => {
        const torqueFromValue = torqueFrom.value;
        const torqueToValue = torqueTo.value;

        const productsFiltered = products.filter(product => {
            const torqueValue = product.especificaciones.match(/(\d+,\d+|\d+) Nm/);
            if (!torqueValue) {
                return false;
            }
            return torqueValue[0] >= torqueFromValue && torqueValue[0] <= torqueToValue;
        });

        return renderProducts(productsFiltered);
    });
};

const handleWeightFilter = (products) => {
    const weightFrom = document.querySelector('#weightFrom');
    const weightTo = document.querySelector('#weightTo');

    weightFrom.addEventListener('input', () => {
        const weightFromValue = weightFrom.value;
        const weightToValue = weightTo.value;

        const productsFilter = products.filter(product => {
            const weight = product.especificaciones.match(/(\d+\.\d+) kg/);
            if (!weight) {
                return false;
            }
            return weight >= weightFromValue && weight <= weightToValue;
        });

        return renderProducts(productsFilter);
    });

    weightTo.addEventListener('input', () => {
        const weightFromValue = weightFrom.value;
        const weightToValue = weightTo.value;

        const productsFilter = products.filter(product => {
            const weight = product.especificaciones.match(/(\d+\.\d+) kg/);
            if (!weight) {
                return false;
            }
            return weight >= weightFromValue && weight <= weightToValue;
        });

        return renderProducts(productsFilter);
    });
}