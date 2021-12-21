const api = 'https://nutripedia-api.herokuapp.com/';

function createTitle(title) {
    let titleElement = document.createElement('h2');
    titleElement.innerText = title;
    return titleElement;
}

function createImage(title, imageSource) {
    let imageElement = document.createElement('img');
    imageElement.alt = title;
    imageElement.title = title;
    imageElement.src = imageSource;
    return imageElement;
}

function createThumb(id, title, imageSource) {
    let thumbElement = document.createElement('li');
    thumbElement.id = id;
    thumbElement.appendChild(createImage(title, imageSource));
    thumbElement.appendChild(createTitle(title));
    thumbElement.addEventListener('click', function() {
        openModal(id);
    });
    return thumbElement;
}

function createThumbnails() {
    $.get(api, function(thumbs) {
        $.each(thumbs, function(key, value) {
            let thumbElement = createThumb(key, value[0], value[1]);
            $('#cards').append(thumbElement);
        });
    });
}

function fillModal(id) {
    $.get(api + id, function(food) {
        $('#food-name').text(food[0]);
        $('#food-image').html(createImage(food[0], food[1]));
        $('#food-properties').text(food[2]);
        $('#food-benefits').text(food[3]);
        $('#food-composition').text(food[4]);
        $('#food-action').text(food[5]);
        $('#food-nutrients').text(food[6]);
        $('#food-daily-portion').text(food[7]);
    });
}

function clearModal() {
    $('#food-image').html("");
    $('#food-name').text("");
    $('#food-properties').text("");
    $('#food-benefits').text("");
    $('#food-composition').text("");
    $('#food-action').text("");
    $('#food-nutrients').text("");
    $('#food-daily-portion').text("");
}

function openModal(id) {
    fillModal(id);
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    clearModal();
    document.getElementById('modal').style.display = 'none';
}

$(document).ready(function() {
    createThumbnails();
    let closeButton = document.getElementById('closeButton');
    closeButton.onclick = closeModal;
});