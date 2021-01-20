var imgArray = JSON.parse(localStorage.getItem('allProducts'));
console.log('after get', imgArray);

if (imgArray) {
    renderChart();
}