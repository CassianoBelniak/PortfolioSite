// Get the modal

window.onload = function(){
    var modal = document.getElementById("modal-container");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("modal-img");
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    var modalFunction = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    }

    var elements = document.getElementsByClassName('modal');

    for (var c = 0; c < elements.length; c++){
        elements[c].onclick = modalFunction;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }
}