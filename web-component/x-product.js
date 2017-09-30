class XProductProto extends HTMLElement {
    createdCallback() {
        // Create a Shadow Root
        // var shadow = this.createShadowRoot();

        // Create a standard img element and set it's attributes.
        var img = document.createElement('img');
        img.alt = this.getAttribute('data-name');
        img.src = this.getAttribute('data-img');
        img.width = '150';
        img.height = '150';
        img.className = 'product-img';

        // Add the image to the Shadow Root.
        this.appendChild(img);

        // Add an event listener to the image.
        img.addEventListener('click', function (e) {
            window.location = this.getAttribute('data-url');
        });

        // Create a link to the product.
        var link = document.createElement('a');
        link.innerText = this.getAttribute('data-name');
        link.href = this.getAttribute('data-url');
        link.className = 'product-name';

        // Add the link to the Shadow Root.
        this.appendChild(link);
    };
}

// Register the new element.
var XProduct = document.registerElement('x-product', {
    prototype: XProductProto.prototype
});